import { ReactNode, useEffect, useState } from 'react'
import { hasPermission, removeLocalStorageToken } from '@utils/auth-utils'
import { useRouter } from 'next/router'
import { useAuthCredentials } from '@store/apps/auth'
import FallbackSpinner from '@components/access/spinner'
import { AuthProps } from '@ts-types/generated'
import { PermissionsEnum } from '@utils/constants'

type PropTypes = {
  children: ReactNode
  authProps: AuthProps
}

const AuthGuard = ({ children, authProps }: PropTypes) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const { authValues, removeCredentials } = useAuthCredentials();
  const router = useRouter()

  const requirePermission = !!authProps.allowedPermission;

  const isPermitted: boolean = (hasPermission(authProps.allowedPermission as PermissionsEnum) && requirePermission);
  // getting user values from AUTH redux 
  const isUser: boolean = (!!authValues.token && !!authValues.user);

  useEffect(() => {

    // if redux has user AUTH values 
    if (isUser) {
      setIsAuthenticated(true);
    }

    // if redux has not user AUTH values then removing all credentials 
    if (!isUser) {
      setIsAuthenticated(false)
      removeCredentials();
      removeLocalStorageToken();
      router.push("/");
    }

  }, [authValues]);


  if (isAuthenticated && isPermitted) {
    return <>{children}</>
  }

  if (isAuthenticated && !requirePermission) {
    return <>{children}</>
  }

  if (isAuthenticated && !isPermitted) {
    // redirecting to dashboard if user is authenticated and has no permission for the module 
    router.push("/");
  }

  return (
    <FallbackSpinner />
  )
}

export default AuthGuard
