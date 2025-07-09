// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import Table from 'src/views/roles-and-permissions/Table'
import RoleCards from 'src/views/roles-and-permissions/RoleCards'
import { PermissionsEnum } from '@utils/constants'
import { hasPermission } from '@utils/auth-utils'
import { useUsersQuery } from '@data/users/users-query'
import { useState } from 'react'
import FallbackSpinner from '@components/access/spinner'

const RolesComponent = () => {

  const [page, setPage] = useState<number>(1)
  const { data: users, isLoading: loadingUsers, error: usersError } = useUsersQuery({ limit: Number(process.env.NEXT_PUBLIC_DATA_TABLES_LIMIT), page: page });

  const onPageChange = (event: any, value: number) => {
    setPage(value);
  };


  if (loadingUsers) return <FallbackSpinner />;
  if (usersError) return <h1>Error featching users {usersError.message}</h1>;
  return (
    <Grid container spacing={6}>

      {false &&
        <>
          <PageHeader
            title={
              <Typography variant='h4' sx={{ mb: 6 }}>
                Roles List
              </Typography>
            }
            subtitle={
              <Typography sx={{ color: 'text.secondary' }}>
                A role provided access to predefined menus and features so that depending on <br /> assigned role an
                administrator can have access to what he need
              </Typography>
            }
          />
          <Grid item xs={12}>
            <RoleCards />
          </Grid>
        </>
      }

      {/* USERS LIST  */}
      {hasPermission(PermissionsEnum.ROLES_AND_PERMISSIONS_VIEW_USERS) &&
        <>
          <PageHeader
            title={
              <Typography variant='h4' sx={{ mb: 6 }}>
                Total users with their roles
              </Typography>
            }
            subtitle={
              <Typography sx={{ color: 'text.secondary' }}>
                Assign roles and manage permission level below
              </Typography>
            }
          />
          <Grid item xs={12}>
            <Table
              onPaginationChange={onPageChange}
              paginatorInfo={users?.users.paginatorInfo}
              users={users?.users.data?.map((user) => ({ id: user._id, ...user }))}
            />
          </Grid>
        </>
      }
    </Grid>
  )
}

RolesComponent.authProps = {
  allowedRoles: [],  // Roles allowed to access this page
  allowedPermission: PermissionsEnum.ROLES_AND_PERMISSIONS_MODULE // Permissions required
}

export default RolesComponent
