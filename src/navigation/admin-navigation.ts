import { PermissionsEnum } from '@utils/constants'
import { ROUTES } from '@utils/routes'
import { VerticalNavItemsType } from 'src/@core/layouts/types'


const adminNavigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: 'tabler:smart-home',
      path: ROUTES.DASHBOARD,
    },
    {
      title: 'Inbox',
      icon: 'heroicons-outline:chat',
      path: ROUTES.INBOX,
      allowedPermission: [PermissionsEnum.INBOX_READ_ALL_CHATS, PermissionsEnum.INBOX_MODULE],
    },
    {
      title: 'Individual Message',
      icon: 'hugeicons:message-user-02',
      path: ROUTES.INDIVIDUAL_MESSAGE,
      allowedPermission: [PermissionsEnum.INDIVIDUAL_MESSAGE_MODULE, PermissionsEnum.INDIVIDUAL_MESSAGE_SEND_MESSAGE]
    },
    {
      title: 'Broadcast',
      icon: 'tabler:broadcast',
      allowedPermission: [PermissionsEnum.BROADCAST_MESSAGE_MODULE, PermissionsEnum.BROADCAST_MESSAGE_SEND_BROADCAST],
      children: [
        {
          title: 'Send a Broadcast',
          path: ROUTES.BROADCAST_MESSAGE,
        },
        {
          title: 'Management',
          path: ROUTES.BROADCAST_MANAGEMENT,
        }
      ]
    },
    {
      title: 'Roles & Permissions',
      icon: 'tabler:users-group',
      path: ROUTES.USER_ROLES,
      allowedPermission: PermissionsEnum.ROLES_AND_PERMISSIONS_MODULE,
    },
    {
      title: 'Support',
      icon: 'tabler:settings',
      path: ROUTES.SUPPORT,
    },
    {
      title: 'Logout',
      icon: 'tabler:logout',
      path: '/',
      isLogout: true
    }

  ]
}

export default adminNavigation
