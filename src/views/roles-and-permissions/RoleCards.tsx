// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
// import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Tooltip from '@mui/material/Tooltip'
import Checkbox from '@mui/material/Checkbox'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
// import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import DialogTitle from '@mui/material/DialogTitle'
import AvatarGroup from '@mui/material/AvatarGroup'
import CardContent from '@mui/material/CardContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import TableContainer from '@mui/material/TableContainer'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

interface CardDataType {
  title: string
  avatars: string[]
  totalUsers: number
}

const cardData: CardDataType[] = [
  { totalUsers: 4, title: 'Administrator', avatars: ['1.png', '2.png', '3.png', '4.png'] },
  { totalUsers: 7, title: 'Teacher', avatars: ['5.png', '6.png', '7.png', '8.png', '1.png', '2.png', '3.png'] },
  { totalUsers: 5, title: 'Principal', avatars: ['4.png', '5.png', '6.png', '7.png', '8.png'] },
  { totalUsers: 3, title: 'Executive Principal', avatars: ['1.png', '2.png', '3.png'] },
  { totalUsers: 10, title: 'Health Professional', avatars: ['4.png', '5.png'] },
  { totalUsers: 10, title: 'Accountant', avatars: ['1.png', '2.png', '3.png', '4.png', '5.png'] }
]

const rolesArr: string[] = [
  'User Management',
  'Content Management',
  'Disputes Management',
  'Database Management',
  'Financial Management',
  'Reporting',
  'API Control',
  'Repository Management',
  'Payroll'
]

const RolesCards = () => {
  // ** States
  const [open, setOpen] = useState<boolean>(false)
  const [dialogTitle, setDialogTitle] = useState<'Add' | 'Edit'>('Add')
  const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>([])
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState<boolean>(false)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
    setSelectedCheckbox([])
    setIsIndeterminateCheckbox(false)
  }

  const togglePermission = (id: string) => {
    const arr = selectedCheckbox
    if (selectedCheckbox.includes(id)) {
      arr.splice(arr.indexOf(id), 1)
      setSelectedCheckbox([...arr])
    } else {
      arr.push(id)
      setSelectedCheckbox([...arr])
    }
  }

  const handleSelectAllCheckbox = () => {
    if (isIndeterminateCheckbox) {
      setSelectedCheckbox([])
    } else {
      rolesArr.forEach(row => {
        const id = row.toLowerCase().split(' ').join('-')
        togglePermission(`${id}-read`)
        togglePermission(`${id}-write`)
        togglePermission(`${id}-create`)
      })
    }
  }

  useEffect(() => {
    if (selectedCheckbox.length > 0 && selectedCheckbox.length < rolesArr.length * 3) {
      setIsIndeterminateCheckbox(true)
    } else {
      setIsIndeterminateCheckbox(false)
    }
  }, [selectedCheckbox])

  const renderCards = () =>
    cardData.map((item, index: number) => (
      <Grid item xs={12} sm={6} lg={4} key={index}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ color: 'text.secondary' }}>{`Total ${item.totalUsers} users`}</Typography>
              <AvatarGroup
                max={4}
                className='pull-up'
                sx={{
                  '& .MuiAvatar-root': { width: 32, height: 32, fontSize: theme => theme.typography.body2.fontSize }
                }}
              >
                {item.avatars.map((img, index: number) => (
                  <Avatar key={index} alt={item.title} src={`/images/avatars/${img}`} />
                ))}
              </AvatarGroup>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography variant='h4' sx={{ mb: 1 }}>
                  {item.title}
                </Typography>
                {/* <Typography
                  href='/'
                  component={Link}
                  sx={{ color: 'primary.main', textDecoration: 'none' }}
                  onClick={e => {
                    e.preventDefault()
                    handleClickOpen()
                    setDialogTitle('Edit')
                  }}
                >
                  Edit Role
                </Typography> */}
              </Box>
              {/* <IconButton size='small' sx={{ color: 'text.disabled' }}>
                <Icon icon='tabler:copy' />
              </IconButton> */}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))

  return (
    <Grid container spacing={6} className='match-height'>
      {renderCards()}
      <Grid item xs={12} sm={6} lg={4}>
        <Card
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            handleClickOpen()
            setDialogTitle('Add')
          }}
        >
          {/* <Grid container sx={{ height: '100%' }}>
            <Grid item xs={5}>
              <Box
                sx={{
                  height: '100%',
                  minHeight: 140,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center'
                }}
              >
                <img height={122} alt='add-role' src='/images/pages/add-new-role-illustration.png' />
              </Box>
            </Grid>
            <Grid item xs={7}>
              <CardContent sx={{ pl: 0, height: '100%' }}>
                <Box sx={{ textAlign: 'right' }}>
                  <Button
                    variant='contained'
                    sx={{ mb: 3, whiteSpace: 'nowrap' }}
                    onClick={() => {
                      handleClickOpen()
                      setDialogTitle('Add')
                    }}
                  >
                    Add New Role
                  </Button>
                  <Typography sx={{ color: 'text.secondary' }}>Add role, if it doesn't exist.</Typography>
                </Box>
              </CardContent>
            </Grid>
          </Grid> */}
        </Card>
      </Grid>
      <Dialog fullWidth maxWidth='md' scroll='body' onClose={handleClose} open={open}>
        <DialogTitle
          component='div'
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Typography variant='h3'>{`${dialogTitle} Role`}</Typography>
          <Typography color='text.secondary'>Set Role Permissions</Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(5)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
          }}
        >
          <Box sx={{ my: 4 }}>
            <FormControl fullWidth>
              <CustomTextField fullWidth label='Role Name' placeholder='Enter Role Name' />
            </FormControl>
          </Box>
          <Typography variant='h4'>Role Permissions</Typography>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ pl: '0 !important' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        whiteSpace: 'nowrap',
                        alignItems: 'center',
                        textTransform: 'capitalize',
                        '& svg': { ml: 1, cursor: 'pointer' },
                        color: theme => theme.palette.text.secondary,
                        fontSize: theme => theme.typography.h6.fontSize
                      }}
                    >
                      Administrator Access
                      <Tooltip placement='top' title='Allows a full access to the system'>
                        <Box sx={{ display: 'flex' }}>
                          <Icon icon='tabler:info-circle' fontSize='1.25rem' />
                        </Box>
                      </Tooltip>
                    </Box>
                  </TableCell>
                  <TableCell colSpan={3}>
                    <FormControlLabel
                      label='Select All'
                      sx={{ '& .MuiTypography-root': { textTransform: 'capitalize', color: 'text.secondary' } }}
                      control={
                        <Checkbox
                          size='small'
                          onChange={handleSelectAllCheckbox}
                          indeterminate={isIndeterminateCheckbox}
                          checked={selectedCheckbox.length === rolesArr.length * 3}
                        />
                      }
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rolesArr.map((i: string, index: number) => {
                  const id = i.toLowerCase().split(' ').join('-')

                  return (
                    <TableRow key={index} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                          fontSize: theme => theme.typography.h6.fontSize
                        }}
                      >
                        {i}
                      </TableCell>
                      <TableCell>
                        <FormControlLabel
                          label='Read'
                          sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                          control={
                            <Checkbox
                              size='small'
                              id={`${id}-read`}
                              onChange={() => togglePermission(`${id}-read`)}
                              checked={selectedCheckbox.includes(`${id}-read`)}
                            />
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <FormControlLabel
                          label='Write'
                          sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                          control={
                            <Checkbox
                              size='small'
                              id={`${id}-write`}
                              onChange={() => togglePermission(`${id}-write`)}
                              checked={selectedCheckbox.includes(`${id}-write`)}
                            />
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <FormControlLabel
                          label='Create'
                          sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                          control={
                            <Checkbox
                              size='small'
                              id={`${id}-create`}
                              onChange={() => togglePermission(`${id}-create`)}
                              checked={selectedCheckbox.includes(`${id}-create`)}
                            />
                          }
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Box className='demo-space-x'>
            <Button type='submit' variant='contained' onClick={handleClose}>
              Submit
            </Button>
            <Button color='secondary' variant='tonal' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default RolesCards
