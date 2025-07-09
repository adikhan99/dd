import { store } from '@store/index'
import { AUTH_CREDS, SUPER_ADMIN, STAFF, PermissionsEnum, SESSION_ID } from './constants'

export const superAdmin_and_staff = [SUPER_ADMIN, STAFF]
export const superAdminOnly = [SUPER_ADMIN]
export const staff = [STAFF]

export const setLocalStorageToken = (token: string | null | undefined): void => {
  localStorage.setItem(AUTH_CREDS, JSON.stringify(token));
}

export const getLocalStorageToken = (): string | null | undefined => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem(AUTH_CREDS) as string)
  }
}

export const removeLocalStorageToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_CREDS)
  }
}

export const setLocalStorageSessionId = (token: string | null | undefined): void => {
  localStorage.setItem(SESSION_ID, JSON.stringify(token));
}

export const getLocalStorageSessionId = (): string | null | undefined => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem(SESSION_ID) as string)
  }
}

export const removeLocalStoragSessionId = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_ID)
  }
}

export const hasPermission = (allowedPermissions: PermissionsEnum | PermissionsEnum[]) => {
  const userPermissions = store.getState().auth?.user?.permissions;
  if (!userPermissions) return false;

  // Normalize to array
  const permissionsToCheck = Array.isArray(allowedPermissions) ? allowedPermissions : [allowedPermissions];

  // Check if user has ALL permissions
  if (userPermissions.includes(PermissionsEnum.ALL)) return true;

  // Check if user has at least one of the allowed permissions
  const hasAnyPermission = permissionsToCheck.some(permission => userPermissions.includes(permission));

  return hasAnyPermission;
};


export const hasAccess = (allowedRoles: string[] | undefined | null, userRole: string | undefined | null) => {
  if (userRole) {
    return Boolean(allowedRoles?.includes(userRole))
  }
  return false
}

export function isAuthenticated(token: string | null) {
  return !!token && (typeof token === 'string')
}

export const staffHasPermission = (allowedPermissions: string[] | undefined, staffPermissions: string[] | undefined) => {
  const permissionRoutes: string[] = [];

  staffPermissions?.forEach((item: any) => {
    if (item.actions && typeof item.actions === 'object' && item.actions.GET === true) {
      permissionRoutes.push(item.route);
    }
  });

  if (staffPermissions?.length) {
    return Boolean(
      allowedPermissions?.find((permission) => permissionRoutes?.includes(permission))
    );
  }
  return false;
}
