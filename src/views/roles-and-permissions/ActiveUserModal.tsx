
// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import { useModal } from '@store/apps/modal'
import CustomButton from '@components/common-components/Button'
import { useActive_InavtiveMutation } from '@data/users/active-inactive-users-mutation'

const ActiveUserModalView = () => {
    const { closeModal, modalState } = useModal();
    const { mutate, isLoading } = useActive_InavtiveMutation()
    const [open, setOpen] = useState<boolean>(true)

    const handleClose = () => {
        setOpen(false)
        closeModal()
    }

    const handleAccept = () => {
        mutate({
            active: true,
            userId: modalState.data.userId
        }, {
            onSettled: () => {
                setOpen(false);
                closeModal();
            }
        })
    }

    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle align='center' typography={"h5"} id='alert-dialog-title'>Active User</DialogTitle>
                <DialogContent>
                    <DialogContentText align='center' id='alert-dialog-description'>
                        Are you sure you want to active this user?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <CustomButton type="button" variant='contained' onClick={handleAccept} loading={isLoading} disabled={isLoading}>Active</CustomButton>
                    <CustomButton type="button" variant='outlined' onClick={handleClose}>Cancel</CustomButton>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default ActiveUserModalView;
