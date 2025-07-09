import { ReactNode } from 'react'
import AdminLayout from './admin-layout'

interface AppProps {
  page: ReactNode;
}

const AppLayout = ({ page }: AppProps) => {

  return <AdminLayout>{page}</AdminLayout>

}

export default AppLayout
