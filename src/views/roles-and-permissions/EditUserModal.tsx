import { useEffect, useState } from 'react';
import { Box, Grid, DialogActions, DialogContent, Typography, Alert } from '@mui/material';
import CustomButton from '@components/common-components/Button';
import CustomDialog from '@components/common-components/Dialog';
import { AdminToggleComponent } from './AdminToggle';
import { AdminInfoBox } from './AdminInfoBox';
import styles from './Modal.module.css';
import { useModal } from '@store/apps/modal';
import { PermissionsEnum } from '@utils/constants';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useVerify_AIC_UserMutation } from '@data/auth/verify-AIC-user-mutation';
import CustomTextField from 'src/@core/components/mui/text-field';
import { User, VerifiedUserType } from '@ts-types/generated';
import toast from 'react-hot-toast';
import { EditUserFormFields } from './EditUserFormFields';
import EditUserPermissions from './EditPermissions';
import { useEditUserMutation } from '@data/users/edit-user-mutation';
import { useAuthCredentials } from '@store/apps/auth';
import { useRouter } from 'next/router';
import { ROUTES } from '@utils/routes';


const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const EditUserModal = () => {
  const { modalState } = useModal();
  const { email, positionTitle, campus, firstname, lastname, permissions, _id } = modalState.data.user as User;

  const [verifiedUserValues, setVerifiedUserValues] = useState<VerifiedUserType | undefined>({
    email,
    positionTitle,
    role_campus_details: campus?.map((campus) => ({ campus_code: campus.code, campus_name: campus.name, role: campus.name })),
    first_name: firstname,
    surname: lastname
  });
  // const [open, setOpen] = useState(true);
  const [isAdmin, setIsAdmin] = useState(permissions.includes(PermissionsEnum.ALL));
  // const [selectedPermissions, setSelectedPermissions] = useState<PermissionsEnum[]>([]);
  const [campusValues, setCampusValues] = useState<string[]>();
  const { mutate: editUser, isLoading: creatinguser } = useEditUserMutation();
  const { closeModal } = useModal();
  const { mutate: verifyUser, isLoading: VerifyingUser } = useVerify_AIC_UserMutation();
  const { authValues } = useAuthCredentials();
  const router = useRouter();

  const handleCreateUser_WithPermissions = (permissions: PermissionsEnum[]) => {

    if (!verifiedUserValues) return;
    if (!permissions?.length) return toast.error("User must have atleast 1 permission");
    if (!campusValues?.length) return toast.error("User must have atleast 1 campus");

    editUser({
      userId: _id,
      positionTitle: verifiedUserValues.positionTitle,
      campuses: campusValues,
      permissions: permissions,
    }, {
      onSuccess: () => {
        if (_id === authValues.user?._id) router.push(ROUTES.USER_ROLES);
        toast.success("User Updated successfully", { duration: 4000 });
        closeModal();
      }
    });

  }

  const handleCreateUser_WithAdminPermission = () => {

    if (!verifiedUserValues) return;
    if (!campusValues?.length) return toast.error("User must have atleast 1 campus")

    const adminPermission = [PermissionsEnum.ALL]

    editUser({
      userId: _id,
      positionTitle: verifiedUserValues.positionTitle,
      campuses: campusValues,
      permissions: adminPermission,
    }, {
      onSuccess: () => {
        if (_id === authValues.user?._id) router.push(ROUTES.USER_ROLES);
        toast.success("User Updated successfully", { duration: 4000 });
        closeModal();
      }
    });

  }

  const handleAdminToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAdmin(e.target.checked);
  };

  const handleClose = () => {
    closeModal();
  };

  const { handleSubmit, getFieldProps, errors, touched, setFieldValue } = useFormik<{ email: string; }>({
    initialValues: { email: '' },
    validationSchema,
    onSubmit: (values) => {
      verifyUser({ email: values.email }, {
        onSuccess: ({ data: { data } }) => {
          setVerifiedUserValues(data);
        },
        onError: () => {
          setVerifiedUserValues(undefined);
        },
      });
    }
  });

  useEffect(() => {
    setFieldValue("email", email)
  }, [])

  return (
    <>
      <CustomDialog
        title={
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant='h5' className={styles.title}>Edit User</Typography>

          </Box>
        }
        isOpen={true}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        showDivider
      >
        <DialogContent className={styles.dialogContent}>

          <Grid container spacing={4}>

            {/* WARNING  */}
            {(_id === authValues.user?._id) &&
              <Alert
                sx={{ mb: 5 }}
                variant='outlined'
                severity="error"
              >
                <b>Warning:</b> Changing your own permissions may revoke your current access rights and limit your control within the system.
              </Alert>
            }

            {/* GET USER BY EMAIL */}
            <Grid item xs={12}>
              <Typography variant='h5' className={styles.title}>User Details</Typography>
              <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                <CustomTextField
                  fullWidth
                  defaultValue={email ?? ""}
                  // disabled={VerifyingUser || verifiedUserValues}
                  label='Enter email (Press enter)'
                  {...getFieldProps('email')}
                  error={touched.email && Boolean(errors.email)}
                  placeholder='Enter email (Press enter)'
                  InputProps={{
                    readOnly: !!(VerifyingUser || verifiedUserValues),

                  }}
                />
                {touched.email && errors.email && (
                  <Typography variant="body2" color="error" >
                    {errors.email}
                  </Typography>
                )}
              </form>
            </Grid>


            {/* HANDLE USER FIELDS */}
            {verifiedUserValues && <EditUserFormFields verifiedUserValues={verifiedUserValues} setCampusValues={setCampusValues} />}


            {/* HANDLE PERMISSIONS */}
            <Grid item xs={12}>
              <Typography variant='h5' className={styles.title}>Permissions</Typography>
              <AdminToggleComponent isAdmin={isAdmin} onToggle={handleAdminToggle} />
              <Box>
                {isAdmin ?
                  <>
                    <AdminInfoBox />
                    <DialogActions className={styles.dialogActions}>
                      <CustomButton
                        variant='contained'
                        type='button'
                        onClick={() => handleCreateUser_WithAdminPermission()}
                        color='secondary'
                        disabled={creatinguser}
                        fullWidth={false}
                      >
                        {creatinguser ? 'Updating...' : 'Update'}
                      </CustomButton>
                    </DialogActions>
                  </>
                  :
                  <EditUserPermissions onSave={handleCreateUser_WithPermissions} creatinguser={creatinguser} permissions={permissions} setIsAdmin={setIsAdmin} />
                }
              </Box>
            </Grid>

          </Grid>

        </DialogContent>


      </CustomDialog >
    </>
  );
};

export default EditUserModal;