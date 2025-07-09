// ** MUI Imports
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Box, Rating } from '@mui/material'

const CardImgTop = () => {
  return (
    <Card>
      <CardMedia sx={{ height: '14.5625rem' }} image='/images/cards/glass-house.png' />
      <CardContent>
            <Typography variant='h5' sx={{ mb: 2 }}>
              Stumptown Roasters
            </Typography>
            <Box sx={{ mb: 4.75, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <Rating readOnly value={2} name='read-only' sx={{ mr: 2 }} />
              <Typography sx={{ color: 'text.secondary' }}>5 Star | 98 reviews</Typography>
            </Box>
            <Typography sx={{ mb: 4, color: 'text.secondary' }}>
              Before there was a United States of America, there were coffee houses, because how are you supposed to
              build.
            </Typography>
            <Typography sx={{ fontWeight: 500, mb: 3 }}>
              Price:{' '}
              <Box component='span' sx={{ fontWeight: 'bold' }}>
                $899
              </Box>
            </Typography>
          </CardContent>
          
    </Card>
  )
}

export default CardImgTop
