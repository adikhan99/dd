// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import axios from 'axios'

// ** Types
import { ProfileHeaderType } from 'src/@fake-db/types'
import { Badge, Grid } from '@mui/material'
import { useAuthCredentials } from '@store/apps/auth'
import { profilePlaceholer } from '@utils/constants'


const ProfilePicture = styled('img')(({ theme }) => ({
    width: 108,
    height: 108,
    borderRadius: theme.shape.borderRadius,
    border: `4px solid ${theme.palette.common.white}`,
    [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(4)
    }
}))

const UserHeader = () => {
    // ** State
    const [data, setData] = useState<ProfileHeaderType | null>(null);
    const { authValues: { user } } = useAuthCredentials();

    useEffect(() => {
        axios.get('/pages/profile-header').then(response => {
            setData(response.data)
        })
    }, [])

    return data !== null ? (
        <Card>
            <Grid sx={{ height: { xs: 150, md: 20 }, background: 'linear-gradient(90deg, #236734 0%, #02253F 100%)' }} />
            <CardContent
                sx={{
                    pt: 0,
                    mt: -2,
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: { xs: 'wrap', md: 'nowrap' },
                    justifyContent: { xs: 'center', md: 'flex-start' }
                }}
            >

                <ProfilePicture src={user?.profileImage ?? profilePlaceholer} alt='profile-picture' />

                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        ml: { xs: 0, md: 6 },
                        alignItems: 'center',
                        flexWrap: ['wrap', 'nowrap'],
                        justifyContent: ['center', 'space-between']
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>



                        {(user?.role._id === 1) ?
                            // @ts-ignore 
                            <Badge
                                badgeContent={"Admin"}
                                color="primary"
                                componentsProps={{
                                    root: {
                                        sx: {
                                            position: 'static', // removes absolute positioning
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        },
                                    },
                                    badge: {
                                        sx: {
                                            position: 'static', // disables badge positioning
                                            transform: 'none',  // removes translate transform
                                        },
                                    },
                                }}
                            >
                                <Typography variant='h5' sx={{ textTransform: 'capitalize' }}  >
                                    {user?.username ?? "-"}
                                </Typography>
                            </Badge> :
                            (

                                <Typography variant='h5' sx={{ textTransform: 'capitalize' }}  >
                                    {user?.username ?? "-"}
                                </Typography>
                            )
                        }

                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: ['center', 'flex-start']
                            }}
                        >
                            <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: 'text.secondary' } }}>
                                <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{user?.positionTitle ?? "No Position Title"}</Typography>
                            </Box>
                        </Box>



                    </Box>
                </Box>
            </CardContent>
        </Card >
    ) : null
}

export default UserHeader
