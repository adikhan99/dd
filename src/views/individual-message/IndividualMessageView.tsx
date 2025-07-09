// React Imports
import React, { useEffect, useState } from 'react';

// MUI Imports
import { Avatar, Box, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';

// Type Imports
import { parentDetailFormValues, ParentDetails, AsyncOptionType, Student } from '@utils/types/individual-message/types';

// Custom Types
type OptionType = { label: string; value: string; flag?: string };

// Component Imports
import Button from '@components/common-components/Button';
import toast from 'react-hot-toast'

// React-Query Imports
import { useFetchListOfParents } from '@data/individual-message/fetchListOfParents'
import { useSendMessageMutation } from '@data/individual-message/sendMessageMutation'
import { useFetchParentData } from '@data/individual-message/fetchStudents'

// Util Imports
import { getParentInfo } from '@utils/parentInfo';

// Component Imports
import ParentInfo from './ParentInfo';
import SuccessDialog from './SuccessDialog';
import StudentPhotoSkeleton from '@components/skeleton/StudentPhotoSkeleton';

import { useFormik } from 'formik';

import classes from './IndividualMessageView.module.css'
import CustomSelect from '@components/common-components/CustomSelect';
import { getInitials, toTitleCase } from '@utils/helper-functions';
import { useTemplatesCategoriesQuery } from '@data/templates/get-templates-categories-query';
import { useTemplatesQuery } from '@data/templates/get-templates-query';
import { Templates, TemplatesCategory } from '@ts-types/generated';
import CustomTextField from 'src/@core/components/mui/text-field';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';
import { formats } from '@utils/constants';
import { useAuthCredentials } from '@store/apps/auth';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(advancedFormat);

const IndividualMessageForm: React.FC = () => {

    const { authValues } = useAuthCredentials();

    // useState Variables    
    const [isSuccess, setIsSuccess] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [inputValue, setInputValue] = React.useState<string>('');
    const [listOfParents, setListOfParents] = React.useState<AsyncOptionType[]>([]);
    const [manualInputs, setManualInputs] = useState<Record<string, string>>({});
    const [CollegeOptions, setCollegeOptions] = useState<{ label: string; value: string; }[]>([{ label: "", value: "" }]);

    const initialValues: parentDetailFormValues = {
        campus: "",
        searchParentQuery: "",
        messageCategory: { label: '', value: '' },
        messageTemplate: { label: '', value: '' },
        selectedParent: {
            title: "",
            value: "",
        },
        students: [
            {
                date_of_birth: "",
                given_name: "",
                imageUrl: "",
                pc_tutor_group: "",
                student_code: "",
                surname: "",
                year_group: "",
            }
        ],
        selectedChildren: [
            {
                student_code: "",
                surname: "",
                given_name: "",
                year_group: "",
                pc_tutor_group: "",
                date_of_birth: "",
                imageUrl: "",
            }
        ],
    }

    const { values, setFieldValue, resetForm, handleSubmit } = useFormik({
        initialValues: initialValues,
        onSubmit: values => { handleSendMessage(values) },
    });

    const shouldFetchListOfParents = Boolean(values.searchParentQuery && values.campus);
    const campusName = CollegeOptions.find(campus => campus.value === values.campus)?.label;
    const parentId = values.selectedParent.value;

    // Query Hooks
    const {
        isFetching,
        data: listOfParentsOptions,
        isLoading,
        error: listOfParentsError,
    } = useFetchListOfParents({ searchParentQuery: values.searchParentQuery, campus: (values.campus === "Kewdale Primary" || values.campus === "Kewdale High") ? "01" : values.campus });

    const listOfParentsLoading = shouldFetchListOfParents ? isLoading : false;
    const listOfParentsDataFetching = shouldFetchListOfParents ? isFetching : false;

    const { isFetching: parentDataFetching, data: parentDetails, } = useFetchParentData(values.selectedParent?.value, (values.campus === "Kewdale Primary" || values.campus === "Kewdale High") ? "01" : values.campus);

    const { mobileNumbers, students, familyName } = getParentInfo(parentDetails);

    const { data: templatesCategories, isLoading: categoriesLoading } = useTemplatesCategoriesQuery({});
    const { data: templates, isLoading: templatesLoading } = useTemplatesQuery({}, values?.messageCategory?.value);


    const replacePlaceholders = (template: string, values: any[][] | null, children: Student[]) => {
        return children.map((child, index) => {
            const childValues = values?.[index]; // get the corresponding values for the child
            return template.replace(/{{(\d+)}}/g, (_, matchIndex) => {
                const i = parseInt(matchIndex, 10) - 1; // matchIndex from {{1}} => index 0
                return childValues?.[i] || '';
            });
        });
    };

    const generatePreviewMessage = (
        messageTemplate: { label: string; value: string } | null,
        children: Student[],
        templateValues: any[][] | null
    ): string[] | null => {

        // Assuming templates?.data is available in your context
        const template = templates?.data?.find((val: Templates) => val.template_name === messageTemplate?.value);

        if (template) {
            const message = template.message_sample ?? '';
            const templateMsg = replacePlaceholders(message, templateValues, children);
            return templateMsg;
        }
        return null;
    };

    useEffect(() => {
        if (students.length > 0) {
            setFieldValue("students", students)
        }
    }, [students]);

    const { mutate: sendMessage, isLoading: sendMessagePending } = useSendMessageMutation();

    const templateVariables = templates?.data?.find((val: Templates) => val.template_name === values?.messageTemplate?.value)?.variables;
    const manualTemplateVariables = templateVariables?.filter((val: string) => {
        const value = val.toLowerCase().replace(/ /g, '_');
        return value !== 'student_name' && value !== 'full_name' && value !== 'student_code' && value !== 'date' && !value.includes("date")
    });

    // UseEffect Hooks
    useEffect(() => {
        if (values?.messageCategory?.value === 'Select Category') {
            setFieldValue("messageTemplate", "")
        };
    }, [values?.messageCategory?.value]);

    useEffect(() => {

        if (mobileNumbers.length === 0 && values.selectedParent.value && campusName && !parentDataFetching) {
            toast.error(`No valid mobile numbers found for Parent Code ${parentId} in ${campusName} campus.`, {
                duration: 4000
            })
        }
    }, [parentDataFetching]);

    useEffect(() => {
        setFieldValue('messageTemplate', "");
        setFieldValue('selectedChildren', []);
        setFieldValue('messageCategory', "");
    }, [listOfParentsDataFetching]);

    useEffect(() => {
        if (listOfParentsOptions && Array.isArray(listOfParentsOptions)) {

            const arr = listOfParentsOptions.map((parent: ParentDetails) => ({
                title: `${parent.parent_code} - ${parent.father_name || ''} (${parent.family_name})`,
                value: parent.parent_code,
                family_name: parent.family_name
            }));

            setListOfParents(arr);

        }
        if (listOfParentsError !== null) {
            setListOfParents([]);
            setInputValue('')
            setFieldValue("selectedParent", {
                title: "",
                value: "",

            })
        }
    }, [listOfParentsOptions, listOfParentsError]);

    useEffect(() => {
        const updatedCollege = authValues?.user?.campus?.map((val: { code: string, name: string }) => ({
            label: val.name,
            value: val.code === "01" ? val.name : val.code
        }));
        if (updatedCollege) setCollegeOptions(updatedCollege);
    }, [authValues]);

    // Handle Functions
    const handleCampusChange = (selectedCampus: OptionType) => {

        const campus = selectedCampus.value

        setFieldValue('campus', campus)
        setListOfParents([])
        resetForm({
            values: {
                campus: selectedCampus.value,
                searchParentQuery: "",
                messageCategory: { label: '', value: '' },
                messageTemplate: { label: '', value: '' },
                selectedParent: {
                    title: "",
                    value: "",
                },
                students: [
                    {
                        date_of_birth: "",
                        given_name: "",
                        imageUrl: "",
                        pc_tutor_group: "",
                        student_code: "",
                        surname: "",
                        year_group: "",
                    }
                ],
                selectedChildren: [],
            }
        })
    };

    const handleCategoryChange = (selectedCategory: OptionType) => {

        setFieldValue('messageCategory', selectedCategory);
        resetForm({
            values: {
                campus: values.campus,
                searchParentQuery: values.searchParentQuery,
                selectedParent: values.selectedParent,
                students: values.students,
                selectedChildren: values.selectedChildren,
                messageCategory: selectedCategory,
                messageTemplate: { label: '', value: '' },
            }
        })
        setManualInputs({})
    };

    const handleTemplateChange = (selectedTemplate: OptionType) => {

        setFieldValue('messageTemplate', selectedTemplate)
        resetForm({
            values: {
                campus: values.campus,
                searchParentQuery: values.searchParentQuery,
                selectedParent: values.selectedParent,
                students: values.students,
                messageCategory: values.messageCategory,
                messageTemplate: selectedTemplate,
                selectedChildren: values.selectedChildren,
            }
        })
        setManualInputs({})
    };

    const getTemplateValues = (): any[][] | null => {
        if (values?.messageTemplate?.value) {
            const templateValues = values.selectedChildren.map((student, studentIndex) => {
                const templateObj = templates?.data?.find(
                    (val: Templates) => val.template_name === values?.messageTemplate?.value
                );
                return templateObj?.variables.map((variable, varIndex) => {
                    const resolved = mapVariableToValue(variable, student);
                    if (resolved) return resolved;
                    return manualInputs[`${studentIndex}_${varIndex}`] || "";
                }) ?? []; // ensure fallback to empty array
            });

            return templateValues; // Flatten into string[]
        }
        return null;
    };

    const handleSendMessage = async (values: parentDetailFormValues) => {
        if (isSendButtonEnabled) {
            const templateValuesArr = getTemplateValues();
            const previewMessage = generatePreviewMessage(values.messageTemplate, values.selectedChildren, templateValuesArr)

            const requestBody = mobileNumbers.map((mobile) => ({
                parent_code: parentId,
                contact_number: mobile.number,
                profile_picture_url: '',
                updated_at: new Date().toISOString(),
                messages: previewMessage,
                family_name: familyName,
                students: values.selectedChildren,
                allStudents: students.map(student => ({
                    student_code: student.student_code,
                    full_name: `${student.given_name} ${student.surname}`,
                    year_group: student.year_group,
                    pc_tutor_group: student.pc_tutor_group,
                    date_of_birth: student.date_of_birth
                })),
                template: values?.messageTemplate?.value,
                templateValues: templateValuesArr,
                campusName: campusName,
            }));

            sendMessage(requestBody, {
                onSuccess() {
                    setIsSuccess(true);
                    setPopupMessage('Message sent successfully');
                    setIsPopupOpen(true);
                },
                onError() {
                    setIsSuccess(false);
                    setPopupMessage('Message failed to send');
                    setIsPopupOpen(true);
                },
            });
        }
    };

    const handlePopupClose = (action: 'sendMore' | 'checkInbox' | 'sendAgain') => {
        setIsPopupOpen(false);
        if (action === 'sendMore' || action === 'sendAgain') {
            resetForm({
                values: {
                    campus: CollegeOptions[0].value,
                    searchParentQuery: "",
                    messageCategory: { label: '', value: '' },
                    messageTemplate: { label: '', value: '' },
                    selectedParent: {
                        title: "",
                        value: "",
                    },
                    students: [
                        {
                            date_of_birth: "",
                            given_name: "",
                            imageUrl: "",
                            pc_tutor_group: "",
                            student_code: "",
                            surname: "",
                            year_group: "",
                        }
                    ],
                    selectedChildren: [],
                }
            })
        } else if (action === 'checkInbox') {
            window.open('/inbox', '_blank');
        }
    };

    const mapVariableToValue = (variable: string, student: Student) => {
        const lower = variable.toLowerCase().replace(/ /g, '_');

        if (lower.includes("student_name") || lower.includes("full_name")) {
            return `${student.given_name ?? ""} ${student.surname ?? ""}`.trim();
        }
        if (lower.includes("code")) {
            return student.student_code ?? "";
        }
        if (lower.includes("date")) {
            return dayjs().format(formats.DATE_FORMAT)
        }

        // Try to directly match by key name
        const match = Object.keys(student).find((key) =>
            variable.toLowerCase().includes(key.toLowerCase())
        );
        return match ? (student as any)[match] : "";

    };

    const handleInputChange = (studentIndex: number, varIndex: number, value: string) => {
        setManualInputs((prev) => ({
            ...prev,
            [`${studentIndex}_${varIndex}`]: value,
        }));
    };

    const getResolvedVariables = (students: Student[], template: any) => {
        return (
            <Box
                sx={{
                    display: 'grid',
                    background: '#fff',
                    padding: '10px 20px 0px 20px',
                    gap: 2,
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: '1fr 1fr',
                        md: '1fr 1fr 1fr 1fr'
                    }
                }}
            >
                {students.map((student: Student, studentIndex: number) => {
                    const templateObj = templates?.data?.find(
                        (val: Templates) => val.template_name === template?.value
                    );
                    return templateObj?.variables.map((variable, varIndex) => {
                        const resolved = mapVariableToValue(variable, student);
                        if (!resolved) {
                            const key = `${studentIndex}_${varIndex}`;
                            const variableTypeLower = variable.toLowerCase();

                            const variableType =
                                variableTypeLower === "date" || variableTypeLower.includes("date")
                                    ? "date"
                                    : variableTypeLower === "time" || variableTypeLower.includes("time")
                                        ? "time"
                                        : "text";

                            const rawInput = manualInputs[key];

                            const value =
                                variableType === "time"
                                    ? rawInput
                                        ? dayjs(rawInput, "HH:mm").format("HH:mm")
                                        : ""
                                    : variableType === "date"
                                        ? rawInput
                                            ? dayjs(rawInput).format("YYYY-MM-DD")
                                            : ""
                                        : rawInput || "";

                            const isReasonField = variable === "Reason" || variable === "Reason or Concern";

                            return (
                                <Box
                                    key={`${student.student_code}_${varIndex}`}
                                    sx={{
                                        marginBottom: '15px',
                                        ...(isReasonField && {
                                            gridColumn: '1 / -1',
                                        })
                                    }}
                                >
                                    <Typography variant='body1' fontWeight={100}>
                                        {variable} for {student.given_name}
                                    </Typography>
                                    <CustomTextField
                                        placeholder={variable}
                                        type={variableType !== "text" ? variableType : "text"}
                                        value={value}
                                        multiline={isReasonField}
                                        minRows={isReasonField ? 3 : undefined}
                                        onChange={(e) => {
                                            const { value } = e.target;
                                            const formattedValue =
                                                variableType === "date"
                                                    ? dayjs(value).format(formats.DATE_FORMAT)
                                                    : variableType === "time"
                                                        ? dayjs(value, "HH:mm").format(formats.TIME_FORMAT)
                                                        : value;

                                            handleInputChange(studentIndex, varIndex, formattedValue);
                                        }}
                                        sx={{
                                            margin: "5px",
                                            width: "100%",
                                            '& .MuiInputBase-root': { width: '100%' },
                                        }}
                                    />
                                </Box>
                            );
                        }
                        return null;
                    });

                })}
            </Box>
        );
    };

    const templateObj = templates?.data?.find(
        (val: Templates) => val.template_name === values?.messageTemplate?.value
    );

    const isSendButtonEnabled = values.selectedChildren.length !== 0 && getTemplateValues()?.flat(2).filter(Boolean).length === values.selectedChildren.length * (templateObj?.variables?.length ?? 0);

    const previewMessage = generatePreviewMessage(values?.messageTemplate, values?.selectedChildren, getTemplateValues());

    return (
        <div className="form-container">
            <Grid container className="top-section" style={{ backgroundColor: '#273b4a', padding: '20px', color: 'white', borderRadius: '5px', alignItems: 'center', justifyContent: 'space-between' }}>
                <Grid item xs={12} md={8} style={{ marginBottom: '0px', textAlign: 'left' }}>
                    <h1 className="form-heading" style={{ margin: '0', fontSize: '1.5rem' }}>
                        Send an Individual Message {campusName && `- ${campusName}`}
                    </h1>
                </Grid>
            </Grid>

            <Box>
                <h2 className="section-heading">College</h2>
                <CustomSelect
                    value={CollegeOptions.find(campus => campus.value === values.campus)}
                    onChange={handleCampusChange}
                    list={CollegeOptions}
                    menuPortalTarget={document.body}
                />
            </Box>

            {values?.campus && <ParentInfo
                setFieldValue={setFieldValue}
                resetForm={resetForm}
                values={values}
                listOfParentsLoading={listOfParentsLoading}
                selectedParent={values.selectedParent}
                listOfParents={listOfParents}
                setInputValue={setInputValue}
                inputValue={inputValue}
                error={listOfParentsError}
            />}

            {parentDataFetching ? <StudentPhotoSkeleton /> :
                (
                    <>
                        {listOfParentsError === null && students?.length > 0 && (
                            <>
                                <h2 className="section-heading">
                                    Select Students <span style={{ color: 'red' }}>*</span>
                                </h2>
                                <Box
                                    className={classes.studentSelector}
                                >
                                    {students?.length > 0 ? (
                                        students.map((student, index) => {
                                            const imgSrc = student.imageUrl;

                                            return <div
                                                key={index}
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <label
                                                    htmlFor={`checkbox-${index}`}
                                                    style={{
                                                        cursor: 'pointer',
                                                        width: '120px',  // fixed width for each image
                                                        aspectRatio: '1 / 1',
                                                        overflow: 'hidden',
                                                        borderRadius: '50%',
                                                    }}
                                                >
                                                    {imgSrc !== "" ?
                                                        <img
                                                            alt="student"
                                                            className="stud-img"
                                                            src={imgSrc}
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'cover',
                                                            }}
                                                        /> :
                                                        <Avatar
                                                            sx={{
                                                                width: '100px',
                                                                height: '100px',
                                                                objectFit: 'cover',
                                                            }}
                                                        >
                                                            {getInitials(`${student.given_name} ${student.surname}`)}
                                                        </Avatar>
                                                    }
                                                </label>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            id={`checkbox-${index}`}
                                                            checked={values.selectedChildren.some(child => child.student_code === student.student_code)}
                                                            onChange={(event) => {

                                                                const newSelectedChildren = event.target.checked
                                                                    ? [...values.selectedChildren, student]
                                                                    : values.selectedChildren.filter(child => child.student_code !== student.student_code);

                                                                setFieldValue('selectedChildren', newSelectedChildren);
                                                            }}
                                                        />
                                                    }
                                                    label={`${student.given_name} ${student.surname} (${student.pc_tutor_group})`}
                                                />
                                            </div>
                                        }
                                        )
                                    ) : (
                                        <Typography>No students found for this Parent Code.</Typography>
                                    )}
                                </Box>
                            </>
                        )}

                        {!parentDataFetching && values.students.length > 0 && listOfParentsError === null && students?.length > 0 && (
                            <>
                                <h2 className="section-heading">Message Category</h2>
                                <CustomSelect
                                    label="Select Category"
                                    value={
                                        templatesCategories?.data?.filter(category => category.slug === values?.messageCategory?.value)
                                            .map((val: TemplatesCategory) => ({ label: val.name, value: val.slug }))
                                    }
                                    onChange={handleCategoryChange}
                                    // list={templatesCategories?.data?.map(data => ({ label: data.name, value: data.slug }))}
                                    list={templatesCategories?.data?.filter(temp => temp.slug === "attendance" || temp.slug === "fee" || temp.slug === "communication").map(data => ({ label: data.name, value: data.slug }))}
                                    menuPortalTarget={document.body}
                                    isLoading={categoriesLoading}
                                />
                            </>
                        )}

                        {values.students.length > 0 && values?.messageCategory?.value && (
                            <>
                                <h2 className="section-heading">Message Template <span style={{ color: 'red' }}>*</span></h2>
                                <CustomSelect
                                    label='Select Message Template'
                                    list={templates?.data?.map((val: Templates) => ({
                                        label: toTitleCase(val.template_name.replace(values?.messageCategory?.value || '', '').replaceAll('_', ' ').trim()),
                                        value: val.template_name
                                    }))}
                                    onChange={handleTemplateChange}
                                    isMulti={false}
                                    errorMsg=""
                                    value={
                                        templates?.data?.filter((val: Templates) => (val.template_name === values?.messageTemplate?.value))
                                            .map((val: Templates) => ({
                                                label: toTitleCase(val.template_name.replace(values?.messageCategory?.value, '').replaceAll('_', ' ').trim()),
                                                value: val.template_name
                                            }))
                                    }
                                    menuPortalTarget={document.body}
                                    isLoading={templatesLoading}
                                />

                            </>
                        )}

                        {values?.messageCategory?.value && values?.messageTemplate?.value !== '' && (
                            <>
                                {manualTemplateVariables?.length !== 0 && values.selectedChildren.length !== 0 && <>
                                    <Typography my={5} variant='h5' fontWeight={500} color={'rgba(47, 43, 61, 0.9)'}>Message Details</Typography>

                                    {getResolvedVariables(values.selectedChildren, values?.messageTemplate)}

                                </>}
                            </>
                        )}

                        {values?.campus && (previewMessage && previewMessage.length > 0) && (
                            <>
                                <h2 className="section-heading">Message Preview</h2>
                                <Box sx={{ background: '#fff', padding: '10px 20px' }}>
                                    {generatePreviewMessage(values.messageTemplate, values.selectedChildren, getTemplateValues())?.map((message, index) => {

                                        return <div
                                            key={index}
                                            style={{
                                                backgroundColor: '#dcf8c6',
                                                padding: '15px 20px',
                                                borderRadius: '10px',
                                                margin: '14px 0',
                                                width: 'fit-content',
                                                alignSelf: 'flex-end',
                                                boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
                                                wordBreak: 'break-word',
                                                fontFamily: 'Arial, sans-serif',
                                                fontSize: '14px',
                                                color: '#000'
                                            }}
                                        >
                                            {message.split('\n').map((line, i) => (
                                                <span key={i}>
                                                    {line}
                                                    <br />
                                                </span>
                                            ))}
                                        </div>

                                    })}
                                </Box>
                            </>
                        )}


                    </>
                )}

            <Grid container justifyContent="flex-end" style={{ marginTop: '20px' }}>
                <Button
                    onClick={handleSubmit}
                    disabled={!isSendButtonEnabled || sendMessagePending}
                    sx={{
                        backgroundColor: isSendButtonEnabled ? '#02253f' : '#cccccc',
                        color: isSendButtonEnabled ? '#ffffff' : '#777777',
                        padding: '10px 20px',
                        width: '100%',
                        maxWidth: '100px',
                        fontSize: '16px',
                    }}
                >
                    Send
                </Button>
            </Grid>

            <SuccessDialog
                isPopupOpen={isPopupOpen}
                setIsPopupOpen={setIsPopupOpen}
                handlePopupClose={handlePopupClose}
                isSuccess={isSuccess}
                popupMessage={popupMessage}
            />
        </div>
    );
};


export default IndividualMessageForm;
