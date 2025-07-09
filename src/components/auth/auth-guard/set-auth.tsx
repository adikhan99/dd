import FallbackSpinner from '@components/access/spinner';
import { useMeQuery } from '@data/auth/me-query'
import { useAuthCredentials } from '@store/apps/auth';
import { User } from '@ts-types/generated';
import { getLocalStorageToken, removeLocalStorageToken } from '@utils/auth-utils';
import { ReactNode, useState } from 'react'

const SetAuth = ({ children }: { children: ReactNode }) => {
  const { setCredentials, removeCredentials } = useAuthCredentials();
  const [isSet, setIsSet] = useState<boolean>(false)


  useMeQuery({
    onSuccess: ({ user }: { user: { user: User } }) => {
      setCredentials({ token: getLocalStorageToken(), user: user.user })
      setIsSet(true);
    },
    onError: (error: any) => {
      setIsSet(true);
      if (error.response) {
        removeLocalStorageToken();
        removeCredentials();
      }
      if (!error.response) {
        // setNetworkError(true)
        console.log("NETWORK ERROR")
      }
    },

  });


  if (isSet) return <>{children}</>
  return <FallbackSpinner />
}

export default SetAuth
