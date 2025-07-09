import React from 'react'
import Box from '@mui/material/Box'
import CustomButton from '@components/common-components/Button'
import { Icon } from '@iconify/react';
import { useModal } from '@store/apps/modal';

const TableHeader = () => {
  const { openModal } = useModal();

  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'
      }}
    >
      <Box>
        <CustomButton
          onClick={() => openModal({ view: "ADD_USER_MODAL", data: null })}
          startIcon={<Icon icon='tabler:plus' />}
          variant='contained'>
          Add New User
        </CustomButton>
      </Box>
    </Box>
  )
}

export default TableHeader