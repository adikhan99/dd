// ** React Imports
import { ElementType } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Imports
import Chip from '@mui/material/Chip'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton'
import { useQueryClient } from "@tanstack/react-query";

// ** Configs Import
import themeConfig from 'src/configs/themeConfig'

// ** Types
import { NavLink, NavGroup } from 'src/@core/layouts/types'
import { Settings } from 'src/@core/context/settingsContext'

// ** Custom Components Imports
import UserIcon from 'src/layouts/components/UserIcon'
import Translations from 'src/layouts/components/Translations'

// ** Util Imports
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { handleURLQueries } from 'src/@core/layouts/utils'
import { getLocalStorageSessionId, removeLocalStorageToken, removeLocalStoragSessionId } from '@utils/auth-utils'
import { useAuthCredentials } from '@store/apps/auth'
import { useLogoutMutation } from '@data/auth/sign-out-mutation'

interface Props {
  parent?: boolean
  item: NavLink
  navHover?: boolean
  settings: Settings
  navVisible?: boolean
  collapsedNavWidth: number
  navigationBorderWidth: number
  toggleNavVisibility: () => void
  isSubToSub?: NavGroup | undefined
}

// ** Styled Components
const MenuNavLink = styled(ListItemButton)<
  ListItemButtonProps & { component?: ElementType; href: string; target?: '_blank' | undefined }
>(({ theme }) => ({
  width: '100%',
  marginLeft: theme.spacing(3.5),
  marginRight: theme.spacing(3.5),
  borderRadius: theme.shape.borderRadius,
  transition: 'padding-left .25s ease-in-out, padding-right .25s ease-in-out',
  '&:hover': {
    color: `${theme.palette.common.white} !important`
  },
  '&.active': {
    '&, &:hover': {
      boxShadow: `0px 2px 6px ${hexToRGBA(theme.palette.primary.main, 0.48)}`,
      background: `linear-gradient(90deg, #02253f 0%,rgb(44, 103, 148) 160.3%)`,
      color: `${theme.palette.common.white} !important`,
      '&.Mui-focusVisible': {
        background: `linear-gradient(72.47deg, ${theme.palette.primary.dark} 22.16%, ${hexToRGBA(
          theme.palette.primary.dark,
          0.7
        )} 76.47%)`,
        color: `${theme.palette.common.white} !important`
      }
    },
    '& .MuiTypography-root, & svg': {
      color: `${theme.palette.common.white} !important`,
      fontSize: '15px'
    }
  }
}))

const MenuItemTextMetaWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  justifyContent: 'space-between',
  transition: 'opacity .25s ease-in-out',
  ...(themeConfig.menuTextTruncate && { overflow: 'hidden' })
}))

const VerticalNavLink = ({
  item,
  parent,
  navHover,
  settings,
  navVisible,
  isSubToSub,
  collapsedNavWidth,
  toggleNavVisibility,
  navigationBorderWidth
}: Props) => {
  // ** Hooks
  const router = useRouter();
  const { removeCredentials } = useAuthCredentials();
  const queryClient = useQueryClient();
  const { mutate: logout } = useLogoutMutation();
  const sessionId = getLocalStorageSessionId()

  // ** Vars
  const { navCollapsed } = settings

  const icon = parent && !item.icon ? themeConfig.navSubItemIcon : item.icon

  const isNavLinkActive = () => {
    if (router.pathname === item.path || handleURLQueries(router, item.path)) {
      return true
    } else {
      return false
    }
  }

  // Check if this is the Logout button
  const isLogoutButton = item.title === 'Logout' && item.path === '/'

  const logOut = () => {
    if (sessionId) {
      logout({ sessionId })
      removeLocalStorageToken();
      removeLocalStoragSessionId();
      removeCredentials();
      queryClient.removeQueries()
      router.push('/');
    }
  }

  return (
    <ListItem
      disablePadding
      className='nav-link'
      disabled={item.disabled || false}
      sx={{
        ...(!isLogoutButton ? {
          mt: 1,
          px: '0 !important'
        } : {
          mb: 2,
          px: '0 !important',
          position: 'absolute',
          bottom: 0
        })
      }}
    >
      <MenuNavLink
        component={Link}
        {...(item.disabled && { tabIndex: -1 })}
        className={`${isNavLinkActive() ? 'active' : ''}`}
        href={item.path === undefined ? '/' : `${item.path}`}
        {...(item.openInNewTab ? { target: '_blank' } : null)}
        onClick={(e: any) => {
          if (item.path === undefined) {
            e.preventDefault()
            e.stopPropagation()
          }
          if (navVisible) {
            toggleNavVisibility()
          }
          isLogoutButton ? logOut() : null
        }}
        sx={{
          py: 2,
          ...(item.disabled ? { pointerEvents: 'none' } : { cursor: 'pointer' }),
          px: navCollapsed && !navHover ? (collapsedNavWidth - navigationBorderWidth - 22 - 28) / 8 : 4,
          '& .MuiTypography-root, & svg': {
            color: 'text.primary',
            fontSize: '15px'
          },
          ...(isLogoutButton ? {
            backgroundColor: '#236734 !important',
            color: 'white !important',
            '&:hover': {
              backgroundColor: '#1a4d27 !important'
            },
            '& .MuiTypography-root, & svg': {
              color: 'white !important'
            }
          } : {})
        }}
      >
        <ListItemIcon
          sx={{
            transition: 'margin .25s ease-in-out',
            ...(navCollapsed && !navHover ? { mr: 0 } : { mr: 2 }),
            ...(parent ? { ml: 1.5, mr: 3.5 } : {}),
            '& svg': {
              fontSize: '0.625rem',
              ...(!parent ? { fontSize: '1.375rem !important' } : {}),
              ...(parent && item.icon ? { fontSize: '1.375rem' } : {}),
              ...(isLogoutButton ? { color: 'white !important' } : {})
            }
          }}
        >
          <UserIcon icon={icon as string} />
        </ListItemIcon>

        <MenuItemTextMetaWrapper
          sx={{
            ...(isSubToSub ? { ml: 2 } : {}),
            ...(navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 })
          }}
        >
          <Typography
            {...((themeConfig.menuTextTruncate || (!themeConfig.menuTextTruncate && navCollapsed && !navHover)) && {
              noWrap: true
            })}
            sx={{
              fontSize: "15px",
              ...(isLogoutButton ? { color: 'white !important' } : {})
            }}
          >
            <Translations text={item.title} />
          </Typography>

          {item.badgeContent ? (
            <Chip
              size='small'
              label={item.badgeContent}
              color={item.badgeColor || 'primary'}
              sx={{ height: 22, minWidth: 22, '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' } }}
            />
          ) : null}
        </MenuItemTextMetaWrapper>
      </MenuNavLink>
    </ListItem>
  )
}

export default VerticalNavLink