// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'

// ** Styled Components
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const AccessDenied = () => {
  return (
    <Box className='content-center'>
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <BoxWrapper>
          <Typography variant='h2' sx={{ mb: 1.5 }}>
            You are not authorized!
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            You do not have permission to view this page using the credentials that you have provided while login.
          </Typography>
          <Typography sx={{ mb: 6, color: 'text.secondary' }}>Please contact your site administrator.</Typography>
          <Button href='/' component={Link} variant='contained'>
            Back to Home
          </Button>
        </BoxWrapper>
      </Box>
    </Box>
  )
}

export default AccessDenied
