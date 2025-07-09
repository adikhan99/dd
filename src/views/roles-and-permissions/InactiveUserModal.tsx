
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
import Alert from '@mui/material/Alert';
import { useAuthCredentials } from '@store/apps/auth'


const InactiveUserModalView = () => {
    const { closeModal, modalState } = useModal();
    const { mutate, isLoading } = useActive_InavtiveMutation()
    const [open, setOpen] = useState<boolean>(true)
    const { authValues } = useAuthCredentials();

    const handleClose = () => {
        setOpen(false)
        closeModal()
    }

    const handleAccept = () => {
        mutate({
            active: false,
            userId: modalState.data.userId
        }, {
            onSettled: () => {
                setOpen(false);
                closeModal();
            }
        });
    }


    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle align='center' typography={"h5"} id='alert-dialog-title'>Inactive User</DialogTitle>
                <DialogContent>

                    <DialogContentText align='center' id='alert-dialog-description' fontSize={16}>
                        Are you sure you want to inactive this user?
                    </DialogContentText>

                    {(modalState.data.userId === authValues.user?._id) &&
                        <Alert
                            sx={{ mt: 5 }}
                            variant='outlined'
                            severity="error"
                        >
                            <b>Warning:</b> Changing your own permissions may revoke your current access rights and limit your control within the system.
                        </Alert>
                    }

                </DialogContent>
                <DialogActions>
                    <CustomButton type="button" variant='contained' onClick={handleAccept} loading={isLoading} disabled={isLoading}>Inactive</CustomButton>
                    <CustomButton sx={{ '&:hover': { color: '#fff', } }} type="button" variant='outlined' onClick={handleClose}>Cancel</CustomButton>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default InactiveUserModalView;
