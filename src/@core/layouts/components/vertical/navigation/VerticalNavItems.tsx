import { NavLink, NavGroup, LayoutProps, NavSectionTitle } from 'src/@core/layouts/types'
import VerticalNavLink from './VerticalNavLink'
import VerticalNavGroup from './VerticalNavGroup'
import VerticalNavSectionTitle from './VerticalNavSectionTitle'
import { hasPermission } from '@utils/auth-utils'
import { PermissionsEnum } from '@utils/constants'

interface Props {
  parent?: NavGroup
  navHover?: boolean
  navVisible?: boolean
  groupActive: string[]
  isSubToSub?: NavGroup
  currentActiveGroup: string[]
  navigationBorderWidth: number
  settings: LayoutProps['settings']
  saveSettings: LayoutProps['saveSettings']
  setGroupActive: (value: string[]) => void
  setCurrentActiveGroup: (item: string[]) => void
  verticalNavItems?: LayoutProps['verticalLayoutProps']['navMenu']['navItems']
}

const resolveNavItemComponent = (item: NavGroup | NavLink | NavSectionTitle) => {
  if ((item as NavSectionTitle).sectionTitle) return VerticalNavSectionTitle
  if ((item as NavGroup).children) return VerticalNavGroup

  return VerticalNavLink
}

const VerticalNavItems = (props: Props) => {
  const { verticalNavItems } = props

  const RenderMenuItems = verticalNavItems?.map((item: NavGroup | NavLink | NavSectionTitle, index: number) => {

    const requiredPermission = !!item.allowedPermission;
    const isAllowed = hasPermission(item.allowedPermission as PermissionsEnum);

    const TagName: any = resolveNavItemComponent(item);

    // checking if module requires permission if it does not ? then return the nav - link 
    if (!requiredPermission) {
      return <TagName {...props} key={index} item={item} />
    }

    // returning nav-link if module requires permission and it has access of the module
    if (requiredPermission && isAllowed) {
      return <TagName {...props} key={index} item={item} />
    }

    return null;
  })

  return <>{RenderMenuItems}</>
}

export default VerticalNavItems
