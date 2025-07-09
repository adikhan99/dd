import { Grid, Typography } from '@mui/material';
import styles from './Modal.module.css';
import { VerifiedUserType } from '@ts-types/generated';
import CustomTextField from 'src/@core/components/mui/text-field';
import CustomSelect from '@components/common-components/CustomSelect';
import { CampusEnum, campusList } from '@utils/constants';
import { useEffect, useState } from 'react';

interface UserFormFieldsProps {
  verifiedUserValues?: VerifiedUserType;
  setCampusValues: (val?: string[]) => void
}


export const EditUserFormFields = ({ verifiedUserValues, setCampusValues }: UserFormFieldsProps) => {


  const userCampuses = verifiedUserValues?.role_campus_details
    ?.map((campus) => ({ label: campus.campus_name, value: campus.campus_name }))
    ?.filter(campus => campus.label !== "Kewdale");

  verifiedUserValues?.role_campus_details?.find((campus) => campus.campus_name === "Kewdale") && userCampuses?.push(
    { label: CampusEnum.KEWDALE_HIGH, value: CampusEnum.KEWDALE_HIGH },
    { label: CampusEnum.KEWDALE_PRIMARY, value: CampusEnum.KEWDALE_PRIMARY }
  );


  const [error, setError] = useState<string>("")

  useEffect(() => {
    setCampusValues(userCampuses?.map((campus) => (campus.value)))
  }, []);

  return (<>
    <Grid item xs={12} md={6}>
      <CustomTextField
        fullWidth
        label='First Name'
        name='firstName'
        value={verifiedUserValues?.first_name ?? ""}
        InputProps={{
          readOnly: true,
        }}
      />
    </Grid>

    <Grid item xs={12} md={6}>
      <CustomTextField
        fullWidth
        label='Last Name'
        name='lastName'
        value={verifiedUserValues?.surname ?? ""}
        InputProps={{
          readOnly: true,
        }}
      />
    </Grid>

    <Grid item xs={12}>
      <Typography variant='h5' className={styles.title}>Position & Campus</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <CustomTextField
            fullWidth
            label='Position Title'
            name='positionTitle'
            value={verifiedUserValues?.positionTitle ?? ""}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomSelect
            name="campus"
            list={campusList.map((campus) => ({ label: campus.name, value: campus.name })) ?? []}
            defaultValue={userCampuses}
            onChange={(val, { action }) => {
              if (action === "clear") {
                setCampusValues([])
              }
              if (val.length < 1) {
                setError("Must select atleast 1 campus")
              } else {
                setError("")
              }
              console.log(val);
              setCampusValues(val?.map((campus: any) => (campus.value)))
            }}
            isMulti={true}
            label={"Campuses"}
            errorMsg={error}
            placeholder='Select one or more ampuses'
          />
        </Grid>
      </Grid>
    </Grid>

  </>)
};