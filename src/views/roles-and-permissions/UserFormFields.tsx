import { Grid, Typography } from '@mui/material';
import styles from './Modal.module.css';
import { VerifiedUserType } from '@ts-types/generated';
import CustomTextField from 'src/@core/components/mui/text-field';
import CustomSelect from '@components/common-components/CustomSelect';
import { CampusEnum, campusList } from '@utils/constants';
import { useEffect, useState } from 'react';

interface ManualUserData {
  email: string;
  firstName: string;
  lastName: string;
  positionTitle: string;
}

interface UserFormFieldsProps {
  verifiedUserValues?: VerifiedUserType;
  setCampusValues: (val?: string[]) => void;
  isManualMode?: boolean;
  manualUserData?: ManualUserData;
  manualFormErrors?: Partial<ManualUserData>;
  onManualFormChange?: (field: keyof ManualUserData, value: string) => void;
}

export const UserFormFields = ({ 
  verifiedUserValues, 
  setCampusValues, 
  isManualMode = false, 
  manualUserData,
  manualFormErrors = {},
  onManualFormChange
}: UserFormFieldsProps) => {

  const userCampuses = verifiedUserValues?.role_campus_details
    ?.map((campus) => ({ label: campus.campus_name, value: campus.campus_name }))
    ?.filter(campus => campus.label !== "Kewdale");

  verifiedUserValues?.role_campus_details?.find((campus) => campus.campus_name === "Kewdale") && userCampuses?.push(
    { label: CampusEnum.KEWDALE_HIGH, value: CampusEnum.KEWDALE_HIGH },
    { label: CampusEnum.KEWDALE_PRIMARY, value: CampusEnum.KEWDALE_PRIMARY }
  );

  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!isManualMode) {
      setCampusValues(userCampuses?.map((campus) => (campus.value)));
    }
  }, [isManualMode]);

  const handleFieldChange = (field: keyof ManualUserData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onManualFormChange) {
      onManualFormChange(field, event.target.value);
    }
  };

  return (
    <>
      <Grid item xs={12} md={6}>
        <CustomTextField
          fullWidth
          label='First Name'
          name='firstName'
          value={isManualMode ? (manualUserData?.firstName || '') : (verifiedUserValues?.first_name ?? "")}
          onChange={isManualMode ? handleFieldChange('firstName') : undefined}
          error={isManualMode ? Boolean(manualFormErrors.firstName) : false}
          helperText={isManualMode ? manualFormErrors.firstName : undefined}
          InputProps={{
            readOnly: !isManualMode,
          }}
          placeholder={isManualMode ? 'Enter first name' : undefined}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <CustomTextField
          fullWidth
          label='Last Name'
          name='lastName'
          value={isManualMode ? (manualUserData?.lastName || '') : (verifiedUserValues?.surname ?? "")}
          onChange={isManualMode ? handleFieldChange('lastName') : undefined}
          error={isManualMode ? Boolean(manualFormErrors.lastName) : false}
          helperText={isManualMode ? manualFormErrors.lastName : undefined}
          InputProps={{
            readOnly: !isManualMode,
          }}
          placeholder={isManualMode ? 'Enter last name' : undefined}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant='h5' className={styles.title}>Position & College</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <CustomTextField
              fullWidth
              label='Position Title'
              name='positionTitle'
              value={isManualMode ? (manualUserData?.positionTitle || '') : (verifiedUserValues?.positionTitle ?? "")}
              onChange={isManualMode ? handleFieldChange('positionTitle') : undefined}
              error={isManualMode ? Boolean(manualFormErrors.positionTitle) : false}
              helperText={isManualMode ? manualFormErrors.positionTitle : undefined}
              InputProps={{
                readOnly: !isManualMode,
              }}
              placeholder={isManualMode ? 'Enter position title' : undefined}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomSelect
              name="campus"
              list={campusList.map((campus) => ({ label: campus.name, value: campus.name })) ?? []}
              defaultValue={!isManualMode ? userCampuses : undefined}
              onChange={(val, { action }) => {
                if (action === "clear") {
                  setCampusValues([]);
                }
                if (val.length < 1) {
                  setError("Must select atleast 1 campus");
                } else {
                  setError("");
                }
                setCampusValues(val?.map((campus: any) => (campus.value)));
              }}
              isMulti={true}
              label={"College"}
              errorMsg={error}
              placeholder='Select one or more campuses'
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
