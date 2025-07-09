import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { Container, Grid } from '@mui/material'
import { useMsal } from '@azure/msal-react'
import { loginRequest } from 'src/configuration/config'
import router from 'next/router'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Footer from '@components/Footer'
import { useLoginMutation } from '@data/auth/sign-in-mutation'
import { getLocalStorageToken, isAuthenticated, setLocalStorageSessionId, setLocalStorageToken } from '@utils/auth-utils'
import { useAuthCredentials } from '@store/apps/auth'
import CustomButton from '@components/common-components/Button'
import DisclaimerModal from './DisclaimerModal'
import { v4 as uuidv4 } from 'uuid';

const Login = () => {
    const { instance } = useMsal()
    const [loading, setLoading] = useState(false)
    const { mutate } = useLoginMutation();
    const { setCredentials } = useAuthCredentials();
    const theme = useTheme()
    const hidden = useMediaQuery(theme.breakpoints.down('md'));
    const [isHovered, setIsHovered] = useState(false);
    const [modalOpen, setModalOpen] = useState(true);
    const [termsAccepted, setTermsAccepted] = useState(false);

    const randomGeneratedSessionId = uuidv4();

    useEffect(() => {
        const token = getLocalStorageToken();
        if (token && isAuthenticated(token)) {
            router.push("/dashboard")
        }
    }, []);

    const handleLoginRedirect = async () => {
        setLoading(true);
        try {
            const response = await instance.loginPopup(loginRequest);
            // const response = { accessToken: "dfghjkrtyudfghj", account: { username: "abdullah@aic.wa.edu.au", name: "M48a1225!" } }

            if (response && response.accessToken) {
                const username = response.account.name ?? "";
                const email = response.account.username ?? "";
                const accessToken = response.accessToken ?? "";

                mutate({ email, username, accessToken, sessionId: randomGeneratedSessionId }, {
                    onSuccess: ({ data }) => {
                        setLocalStorageSessionId(randomGeneratedSessionId)
                        setLocalStorageToken(data?.data?.token);
                        setCredentials({ token: data?.data?.token, user: data?.data?.user });
                        router.push('/dashboard');
                    },
                });
            } else {
                console.error('Login failed: No accessToken in response')
            }
        } catch (error) {
            console.error('Login error:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleModalClose = () => {
        setModalOpen(false);
        setTermsAccepted(true);
    };

    return (
        <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
            <DisclaimerModal open={modalOpen} onClose={handleModalClose} />

            <Box className="logo-container">
                <img
                    src="/images/Dialogue.png"
                    alt="Dialogue Logo"
                    className="dialogue-logo"
                />
            </Box>

            {!hidden ? (
                <Box
                    className="illustration-container"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <img
                        alt='login-illustration'
                        src={isHovered ? "/images/hover-aic.svg" : "/images/low-capacity-aic.svg"}
                        className="login-illustration"
                    />
                    <FooterIllustrationsV2 />
                </Box>
            ) : null}
            <Grid item xs={9} container justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={8} md={6} lg={4} xl={3} textAlign="center">
                    <Box className="aic-logo-container">
                        <Container maxWidth="xl">
                            <img
                                src="/images/aic-logo.svg"
                                alt="AIC Logo"
                                className="aic-logo"
                            />
                        </Container>
                    </Box>
                    <Box className="welcome-container">
                        <Box mb={2}>
                            <Typography variant="h3" className="welcome-text">
                                Welcome to
                            </Typography>
                        </Box>
                        <Box mb={5}>
                            <img
                                src="/images/Dialogue.png"
                                alt="Dialogue Logo"
                                className="dialogue-logo-large"
                            />
                        </Box>
                        <CustomButton
                            variant="outlined"
                            loading={loading}
                            disabled={!termsAccepted}
                            onClick={handleLoginRedirect}
                            endIcon={<ArrowForwardIcon />}
                            className='sign-in-button'
                        >
                            Sign In
                        </CustomButton>
                    </Box>
                </Grid>
            </Grid>
            <Footer />
        </Box>
    )
}

export default Login