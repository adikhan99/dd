// ** MUI Imports
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'

type PropTypes = {
    errorMsg: string | undefined,
    sx?: any
};

const CustomError = ({ errorMsg, sx }: PropTypes) => {
    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'start',
                ...sx
            }}
        >
            <Alert severity='error'>
                <AlertTitle>Error</AlertTitle>
                {errorMsg}
            </Alert>
        </Box>

    )
}

export default CustomError;
