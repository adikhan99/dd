import { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import LoginView from 'src/views/login/LoginView'

const Login = () => {

  return (
    <LoginView />
  )
}

Login.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Login