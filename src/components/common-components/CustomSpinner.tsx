// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const CustomSpinner = ({ sx }: { sx?: BoxProps['sx'] }) => {

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
                ...sx
            }}
        >
            <CircularProgress disableShrink sx={{ mt: 6 }} />
        </Box>
    )
}

export default CustomSpinner
