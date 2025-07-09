// ** React Imports
import { useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import TableHeader from './TableHeader'

// ** Styles Import
import styles from './Table.module.css'
import { hasPermission } from '@utils/auth-utils'
import { PermissionsEnum } from '@utils/constants'
import { Pagination, Stack } from '@mui/material'
import { IPaginatorInfo, User } from '@ts-types/generated'

// day Js imports 
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useModal } from '@store/apps/modal'
import toast from 'react-hot-toast'
import { toTitleCase } from '@utils/helper-functions'


dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

interface UserStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: User
}


const userStatusObj: UserStatusType = {
  Active: 'success',
  Pending: 'warning',
  Inactive: 'secondary'
}

// ** renders client column
const renderClient = (row: User) => {

  return (
    <CustomAvatar
      skin='light'
      className={styles.avatar}
    >
      {getInitials(row.username ?? 'Username')}
    </CustomAvatar>
  )

}

type PropTypes = {
  users: User[];
  paginatorInfo: IPaginatorInfo;
  onPaginationChange: (val1: any, val2: number) => void
}

const UserList = ({ paginatorInfo, users, onPaginationChange }: PropTypes) => {
  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const { openModal } = useModal();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: User) => {
    setAnchorEl(event.currentTarget)
    setSelectedUser(user)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleManagePermissions = () => {

    openModal({ view: "EDIT_USER_MODAL", data: { user: selectedUser } });
    handleMenuClose();
  }


  const handleStatusToggle = () => {
    if (selectedUser?.active === false) openModal({ view: "ACTIVE_USER_MODAL", data: { userId: selectedUser._id } });
    if (selectedUser?.active === true) openModal({ view: "INACTIVE_USER_MODAL", data: { userId: selectedUser._id } });
    if (!selectedUser) toast.error("Can not update user");

    handleMenuClose();
  }

  const columns: GridColDef[] = [
    {
      flex: 0.25,
      sortable: false,
      minWidth: 280,
      field: 'email',
      headerName: 'User',
      renderCell: ({ row }: CellType) => {
        return (
          <Box className={styles.userCell}>
            {renderClient(row)}
            <Box className={styles.userInfo}>
              <Typography
                noWrap
                component={Link}
                href=''
                className={styles.userName}
              >
                {row.username}
              </Typography>
              <Typography noWrap variant='body2' className={styles.userEmail}>
                {row.email}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      sortable: false,
      field: 'role',
      minWidth: 120,
      headerName: 'Role',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap className={styles.roleText}>
            {toTitleCase(row.role.name) ?? "-"}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      sortable: false,
      field: 'position-title',
      minWidth: 180,
      headerName: 'Position Title',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap className={styles.roleText}>
            {row.positionTitle ?? "-"}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      sortable: false,
      minWidth: 300,
      headerName: 'Campus',
      field: 'campus',
      headerAlign: "left",
      align: "left",
      renderCell: ({ row }: CellType) => {
        return (
          <Box>
            {row?.campus?.map((campus) => <CustomChip key={campus?._id} label={campus?.name} color="primary" sx={{ m: 0.5, }} />)}
          </Box >
        );
      }
    },
    {
      flex: 0.15,
      sortable: false,
      minWidth: 200,
      field: 'createdBy',
      headerName: 'Created By',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap className={styles.createdByText}>
            {row?.createdBy?.email ?? "-"}
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
      sortable: false,
      minWidth: 200,
      field: 'updatedBy',
      headerName: 'Updated By',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap className={styles.updatedByText}>
            {row.updatedBy?.email ?? "-"}
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
      sortable: false,
      minWidth: 200,
      field: 'lastLoggedIn',
      headerName: 'Last Login',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap className={styles.lastLoginText}>
            {row?.lastLoggedIn ? dayjs(row?.lastLoggedIn).format('h:mm A D-MMM-YYYY') : "-"}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      sortable: false,
      minWidth: 100,
      field: 'active',
      headerName: 'Status',
      renderCell: ({ row }: CellType) => {
        return (
          <CustomChip
            rounded
            skin='light'
            size='small'
            label={row.active ? "Active" : "Inactive"}
            color={userStatusObj[row.active ? "Active" : "Inactive"]}
            className={styles.statusChip}
          />
        )
      }
    },

  ]


  if (hasPermission(PermissionsEnum.ROLES_AND_PERMISSIONS_ACTIVE_INACTIVE_USER) || hasPermission(PermissionsEnum.ROLES_AND_PERMISSIONS_EDIT_USER)) {
    columns.push(
      {
        flex: 0.1,
        minWidth: 120,
        sortable: false,
        field: 'actions',
        headerName: 'Actions',
        renderCell: ({ row }: CellType) => (
          <Box className={styles.actionsCell}>
            <IconButton onClick={(e) => handleMenuOpen(e, row)} className={styles.menuButton}>
              <Icon icon='tabler:dots-vertical' />
            </IconButton>
          </Box>
        )
      }
    )
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>

        {/* PERMISSION REQUIRED TO ADD USER  */}
        {hasPermission(PermissionsEnum.ROLES_AND_PERMISSIONS_CREATE_USER) &&
          <TableHeader />
        }

        <Card >

          <DataGrid
            sx={{
              "& .css-q360zr-MuiDataGrid-columnHeaders": { backgroundColor: "transparent" }, height: "80vh",
              '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '4px' },
              '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '8px' },
              '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': { py: '11px' },
            }}
            getRowHeight={() => 'auto'}
            disableColumnMenu
            // rowHeight={54}
            rows={users ?? []}
            columns={columns}
            hideFooterPagination={true}
            disableRowSelectionOnClick
          />

          <Stack
            sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', paddingY: 5 }}
          >
            <Pagination
              color="primary"
              count={paginatorInfo?.totalPages}
              page={paginatorInfo?.page}
              onChange={onPaginationChange}
            />
          </Stack>
        </Card>
      </Grid>

      <Menu
        className={styles.actionMenu}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {hasPermission(PermissionsEnum.ROLES_AND_PERMISSIONS_EDIT_USER) &&
          <MenuItem onClick={handleManagePermissions} className={styles.menuItem}>
            <ListItemIcon className={styles.menuIcon}>
              <Icon icon='tabler:settings' fontSize={20} />
            </ListItemIcon>
            Manage Permissions
          </MenuItem>
        }
        {(hasPermission(PermissionsEnum.ROLES_AND_PERMISSIONS_ACTIVE_INACTIVE_USER) && !selectedUser?.isLastActiveAdmin) &&
          <MenuItem onClick={handleStatusToggle} className={styles.menuItem}>
            <ListItemIcon className={styles.menuIcon}>
              <Icon
                icon={selectedUser?.active ? 'tabler:user-off' : 'tabler:user-check'}
                fontSize={20}
              />
            </ListItemIcon>
            {selectedUser?.active ? 'Set Inactive' : 'Set Active'}
          </MenuItem>
        }
      </Menu>

      {/* Edit User Modal */}
      {/* {selectedUser && (
        <EditUserModal
          open={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedUser(null);
          }}
          user={{
            ...selectedUser,
            email: selectedUser.email || '',
            campus: selectedUser.campus === 'Assign' ? [] : [selectedUser.campus]
          }}
        />
      )} */}
    </Grid>
  );
}

export default UserList