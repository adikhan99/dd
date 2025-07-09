import { Grid } from "@mui/material";
import React from "react";
import AsyncAutocomplete from "src/components/common-components/autocomplete/AsyncAutocomplete";
import { parentDetailFormValues, AsyncOptionType } from "@utils/types/individual-message/types";
import { FormikErrors } from "formik";

interface ParentInfoProps {
    selectedParent: AsyncOptionType | null;
    setInputValue: (value: string) => void;
    inputValue: string;
    listOfParentsLoading: boolean;
    error: Error | null;
    Students?: Array<Record<string, any>>;
    listOfParents: AsyncOptionType[];
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<parentDetailFormValues>>;
    resetForm: any;
    values: any;
}

const ParentInfo: React.FC<ParentInfoProps> = ({
    listOfParentsLoading,
    listOfParents,
    selectedParent,
    setInputValue,
    inputValue,
    setFieldValue,
    resetForm,
    values
}) => {
    const [open, setOpen] = React.useState<boolean>(false);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            setFieldValue('searchParentQuery', inputValue)
        }
    };

    const handleAutocompleteChange = (event: React.SyntheticEvent<Element, Event>, value: AsyncOptionType | null) => {
        if (value) {
            setFieldValue('selectedParent', value);
            resetForm({
                values: {
                    campus: values.campus,
                    searchParentQuery: values.searchParentQuery,
                    messageCategory: values.messageCategory,
                    selectedParent: value,
                    messageTemplate: "",
                    students: [
                        {
                            date_of_birth: "",
                            given_name: "",
                            image: "",
                            pc_tutor_group: "",
                            student_code: "",
                            surname: "",
                            year_group: "",
                        }
                    ],
                    selectedChildren: [],
                }
            })
        }
    };

    return (
        <>
            <h2 className="section-heading">Parent Information</h2>
            {
                <>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12}>
                            <AsyncAutocomplete
                                handleKeyDown={handleKeyDown}
                                label="Search by Parent Name, Parent Code or Family Name (Press Enter to Search)"
                                options={listOfParents}
                                loading={listOfParentsLoading}
                                inputValue={inputValue}
                                setInputValue={setInputValue}
                                open={open}
                                setOpen={setOpen}
                                onChange={handleAutocompleteChange}
                                value={selectedParent}
                                noOptionsText="No Parents!"
                            />
                        </Grid>
                    </Grid>
                </>
            }

        </>
    );
};

export default ParentInfo;