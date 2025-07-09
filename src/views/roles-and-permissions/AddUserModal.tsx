import { useState } from 'react';
import { Box, Grid, DialogActions, DialogContent, Typography } from '@mui/material';
import CustomButton from '@components/common-components/Button';
import CustomDialog from '@components/common-components/Dialog';
import { AdminToggleComponent } from './AdminToggle';
import { AdminInfoBox } from './AdminInfoBox';
import { UserFormFields } from './UserFormFields';
import styles from './Modal.module.css';
import { useModal } from '@store/apps/modal';
import AddUserPermissions from './AddPermissions';
import { PermissionsEnum } from '@utils/constants';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useVerify_AIC_UserMutation } from '@data/auth/verify-AIC-user-mutation';
import { CircularProgress, InputAdornment } from "@mui/material";
import CustomTextField from 'src/@core/components/mui/text-field';
import { VerifiedUserType } from '@ts-types/generated';
import toast from 'react-hot-toast';
import { useCreateUserMutation } from '@data/auth/create-user-mutation';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

interface ManualUserData {
  email: string;
  firstName: string;
  lastName: string;
  positionTitle: string;
}

const AddUserModal = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [verifiedUserValues, setVerifiedUserValues] = useState<VerifiedUserType | undefined>();
  const [campusValues, setCampusValues] = useState<string[]>();
  const [showManualForm, setShowManualForm] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [, setSearchedEmail] = useState<string>('');
  const [hasSearched, setHasSearched] = useState(false);
  const [manualUserData, setManualUserData] = useState<ManualUserData>({
    email: '',
    firstName: '',
    lastName: '',
    positionTitle: '',
  });
  const [manualFormErrors, setManualFormErrors] = useState<Partial<ManualUserData>>({});

  const { mutate: createUser, isLoading: creatinguser } = useCreateUserMutation();
  const { closeModal } = useModal();
  const { mutate: verifyUser, isLoading: VerifyingUser } = useVerify_AIC_UserMutation();

  // Handle manual form field changes
  const handleManualFormChange = (field: keyof ManualUserData, value: string) => {
    const updatedData = { ...manualUserData, [field]: value };
    setManualUserData(updatedData);
    
    // Clear error for this field when user starts typing
    if (manualFormErrors[field]) {
      setManualFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCreateUser_WithPermissions = async (permissions: PermissionsEnum[]) => {
    if (!permissions?.length) return toast.error("User must have atleast 1 permission");
    if (!campusValues?.length) return toast.error("User must have atleast 1 campus");

    // // Validate manual form if in manual mode
    // if (showManualForm) {
    //   const isValid = await validateManualForm(manualUserData);
    //   if (!isValid) {
    //     return toast.error("Please fix the form errors");
    //   }
    // }

    const userData = {
      firstname: verifiedUserValues?.first_name ?? manualUserData.firstName,
      lastname: verifiedUserValues?.surname ?? manualUserData.lastName,
      email: verifiedUserValues?.email ?? manualUserData.email,
      positionTitle: verifiedUserValues?.positionTitle ?? manualUserData.positionTitle,
      campuses: campusValues,
      permissions: permissions,
    };

    createUser(userData);
  };

  const handleCreateUser_WithAdminPermission = async () => {
    if (!campusValues?.length) return toast.error("User must have atleast 1 campus");

    // Validate manual form if in manual mode
    // if (showManualForm) {
    //   const isValid = await validateManualForm(manualUserData);
    //   if (!isValid) {
    //     return toast.error("Please fix the form errors");
    //   }
    // }

    const adminPermission = [PermissionsEnum.ALL];
    const userData = {
      firstname: verifiedUserValues?.first_name ?? manualUserData.firstName,
      lastname: verifiedUserValues?.surname ?? manualUserData.lastName,
      email: verifiedUserValues?.email ?? manualUserData.email,
      positionTitle: verifiedUserValues?.positionTitle ?? manualUserData.positionTitle,
      campuses: campusValues,
      permissions: adminPermission,
    };

    createUser(userData);
  };

  const handleAdminToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAdmin(e.target.checked);
  };

  const handleClose = () => {
    closeModal();
  };

  const { handleSubmit, getFieldProps, errors, touched } = useFormik<{ email: string; }>({
    initialValues: { email: '' },
    validationSchema,
    onSubmit: (values) => {
      setVerifiedUserValues(undefined);
      setUserNotFound(false);
      setShowManualForm(false);
      setHasSearched(false);

      verifyUser({ email: values.email }, {
        onSuccess: ({ data: { data } }) => {
          setVerifiedUserValues(data);
          setUserNotFound(false);
          setShowManualForm(false);
          setHasSearched(true);
        },
        onError: () => {
          setVerifiedUserValues(undefined);
          setUserNotFound(true);
          setShowManualForm(true);
          setSearchedEmail(values.email);
          setManualUserData(prev => ({ ...prev, email: values.email }));
          setHasSearched(true);
        },
      });
    }
  });

  const handleKeyUp = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <>
      <CustomDialog 
        title={
          <Typography variant='h5' className={styles.title}>Add a User</Typography>
        }
        isOpen={true}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        showDivider
      >
        <DialogContent className={styles.dialogContent}>
          <Grid item xs={12}>
            <Typography variant='h5' className={styles.title}>User Details</Typography>
          </Grid>

          <Grid container spacing={4}>
            {/* EMAIL SEARCH SECTION */}
            <Grid item xs={12}>
              <form noValidate autoComplete='off' onSubmit={handleSubmit} onKeyUp={handleKeyUp} onKeyDown={handleKeyDown}>
                <CustomTextField
                  fullWidth
                  label='Enter email (Press enter)'
                  {...getFieldProps('email')}
                  error={touched.email && Boolean(errors.email)}
                  placeholder='Enter email (Press enter)'
                  InputProps={{
                    readOnly: VerifyingUser,
                    endAdornment: (
                      <InputAdornment position="end">
                        {VerifyingUser && <><Typography sx={{ mr: 2 }}>Verifying...</Typography> <CircularProgress size={15} /></>}
                      </InputAdornment>
                    ),
                  }}
                />
                {touched.email && errors.email && (
                  <Typography variant="body2" color="error" >
                    {errors.email}
                  </Typography>
                )}
              </form>
            </Grid>

            {hasSearched && (
              <>
                {userNotFound && (
                  <Grid item xs={12}>
                    <Box sx={{ bgcolor: 'error.lighter', borderRadius: 1 }}>
                      <Typography variant="body2" color="error.dark">
                        User not found. Please fill in the details manually.
                      </Typography>
                    </Box>
                  </Grid>
                )}
                
                <UserFormFields 
                  verifiedUserValues={verifiedUserValues} 
                  setCampusValues={setCampusValues}
                  isManualMode={showManualForm}
                  manualUserData={manualUserData}
                  manualFormErrors={manualFormErrors}
                  onManualFormChange={handleManualFormChange}
                />
              </>
            )}

            <Grid item xs={12}>
              <Typography variant='h5' className={styles.title}>Permissions</Typography>
              <AdminToggleComponent isAdmin={isAdmin} onToggle={handleAdminToggle} />
              <Box>
                {isAdmin ? (
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
                        {creatinguser ? 'Creating...' : 'Create'}
                      </CustomButton>
                    </DialogActions>
                  </>
                ) : (
                  <AddUserPermissions onSave={handleCreateUser_WithPermissions} creatinguser={creatinguser} />
                )}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </CustomDialog>
    </>
  );
};

export default AddUserModal;