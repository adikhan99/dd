// ** React Imports
import { Fragment, ReactNode } from 'react'

// ** MUI Imports

// import { styled } from '@mui/material/styles'
// import Typography, { TypographyProps } from '@mui/material/Typography'

// ** Third Party Components
// import PerfectScrollbarComponent from 'react-perfect-scrollbar'

// ** Type Imports
import { ThemeColor } from 'src/@core/layouts/types'
// import { Settings } from 'src/@core/context/settingsContext'
// import { CustomAvatarProps } from 'src/@core/components/mui/avatar/types'

// ** Custom Components Imports
// import CustomAvatar from 'src/@core/components/mui/avatar'

export type NotificationsType = {
  meta: string
  title: string
  subtitle: string
} & (
  | { avatarAlt: string; avatarImg: string; avatarText?: never; avatarColor?: never; avatarIcon?: never }
  | {
      avatarAlt?: never
      avatarImg?: never
      avatarText: string
      avatarIcon?: never
      avatarColor?: ThemeColor
    }
  | {
      avatarAlt?: never
      avatarImg?: never
      avatarText?: never
      avatarIcon: ReactNode
      avatarColor?: ThemeColor
    }
)
// interface Props {
//   settings: Settings
//   notifications: NotificationsType[]
// }

// ** Styled Menu component
// const Menu = styled(MuiMenu)<MenuProps>(({ theme }) => ({
//   '& .MuiMenu-paper': {
//     width: 380,
//     overflow: 'hidden',
//     marginTop: theme.spacing(4.25),
//     [theme.breakpoints.down('sm')]: {
//       width: '100%'
//     }
//   },
//   '& .MuiMenu-list': {
//     padding: 0,
//     '& .MuiMenuItem-root': {
//       margin: 0,
//       borderRadius: 0,
//       padding: theme.spacing(4, 6),
//       '&:hover': {
//         backgroundColor: theme.palette.action.hover
//       }
//     }
//   }
// }))

// ** Styled MenuItem component
// const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
//   paddingTop: theme.spacing(3),
//   paddingBottom: theme.spacing(3),
//   '&:not(:last-of-type)': {
//     borderBottom: `1px solid ${theme.palette.divider}`
//   }
// }))

// ** Styled PerfectScrollbar component

// const PerfectScrollbar = styled(PerfectScrollbarComponent)({
//   maxHeight: 349
// })

// // ** Styled Avatar component
// const Avatar = styled(CustomAvatar)<CustomAvatarProps>({
//   width: 38,
//   height: 38,
//   fontSize: '1.125rem'
// })

// // ** Styled component for the title in MenuItems
// const MenuItemTitle = styled(Typography)<TypographyProps>({
//   fontWeight: 500,
//   flex: '1 1 100%',
//   overflow: 'hidden',
//   whiteSpace: 'nowrap',
//   textOverflow: 'ellipsis'
// })

// ** Styled component for the subtitle in MenuItems
// const MenuItemSubtitle = styled(Typography)<TypographyProps>({
//   flex: '1 1 100%',
//   overflow: 'hidden',
//   whiteSpace: 'nowrap',
//   textOverflow: 'ellipsis'
// })

// const ScrollWrapper = ({ children, hidden }: { children: ReactNode; hidden: boolean }) => {
//   if (hidden) {
//     return <Box sx={{ maxHeight: 349, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
//   } else {
//     return <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
//   }
// }

const NotificationDropdown = () => {
  // ** Props
  // const { settings } = props

  // ** States
  // const [setAnchorEl] = useState<(EventTarget & Element) | null>(null)

  // ** Hook
  // const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  // ** Vars
  // const { direction } = settings

  // const handleDropdownOpen = (event: SyntheticEvent) => {
  //   setAnchorEl(event.currentTarget)
  // }

  // const handleDropdownClose = () => {
  //   setAnchorEl(null)
  // }

  // const RenderAvatar = ({ notification }: { notification: NotificationsType }) => {
  //   const { avatarAlt, avatarImg, avatarIcon, avatarText, avatarColor } = notification

  //   if (avatarImg) {
  //     return <Avatar alt={avatarAlt} src={avatarImg} />
  //   } else if (avatarIcon) {
  //     return (
  //       <Avatar skin='light' color={avatarColor}>
  //         {avatarIcon}
  //       </Avatar>
  //     )
  //   } else {
  //     return (
  //       <Avatar skin='light' color={avatarColor}>
  //         {getInitials(avatarText as string)}
  //       </Avatar>
  //     )
  //   }
  // }

  return (
    <Fragment>
      {/* <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
        <Badge
          color='error'
          variant='dot'
          invisible={!notifications.length}
          sx={{
            '& .MuiBadge-badge': { top: 4, right: 4, boxShadow: theme => `0 0 0 2px ${theme.palette.background.paper}` }
          }}
        >
          <Icon fontSize='1.625rem' icon='tabler:bell' />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{ cursor: 'default', userSelect: 'auto', backgroundColor: 'transparent !important' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography variant='h5' sx={{ cursor: 'text' }}>
              Notifications
            </Typography>
            <CustomChip skin='light' size='small' color='primary' label={`${notifications.length} New`} />
          </Box>
        </MenuItem>
        <ScrollWrapper hidden={hidden}>
          {notifications.map((notification: NotificationsType, index: number) => (
            <MenuItem key={index} disableRipple disableTouchRipple onClick={handleDropdownClose}>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <RenderAvatar notification={notification} />
                <Box sx={{ mr: 4, ml: 2.5, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                  <MenuItemTitle>{notification.title}</MenuItemTitle>
                  <MenuItemSubtitle variant='body2'>{notification.subtitle}</MenuItemSubtitle>
                </Box>
                <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                  {notification.meta}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </ScrollWrapper>
        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{
            borderBottom: 0,
            cursor: 'default',
            userSelect: 'auto',
            backgroundColor: 'transparent !important',
            borderTop: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          <Button fullWidth variant='contained' onClick={handleDropdownClose}>
            Read All Notifications
          </Button>
        </MenuItem>
      </Menu> */}
    </Fragment>
  )
}

export default NotificationDropdown
