import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import { Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import MessagePreview from './MessagePreview';
import CollegeSelectionTable from '@components/broadcast/CollegeSelectionTable';
import CustomButton from '@components/common-components/Button';
import CustomSelect from '@components/common-components/CustomSelect';
import { useBroadcastMutation } from '@data/broadcast-message/send-broadcast-message';
import { useTemplatesCategoriesQuery } from '@data/templates/get-templates-categories-query';
import { ParentsResponse, Templates, TemplatesCategory } from '@ts-types/generated';
import { useTemplatesQuery } from '@data/templates/get-templates-query';
import CustomTextField from 'src/@core/components/mui/text-field';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';
import { useParentDetailsMutation } from '@data/broadcast-message/get-parents-details';
import { useModal } from '@store/apps/modal';
import { ATTENDANCE_CATEGORY, AttendanceType, formats } from '@utils/constants';
import { toTitleCase } from '@utils/helper-functions';
import DocumentUpload from './UploadAttachment';
import { useUploadAttachmentMutation } from '@data/upload/upload-attachment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type CollegeData = {
  id: number;
  college: { label: string, value: string };
  yearLevel: string[] | null;
  classGroup: string[];
}

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(advancedFormat);

const Kewdale_Primary_Year_Levels = ['-1', '0', '1', '2', '3', '4', '5', '6'];
const Kewdale_High_Year_Levels = ['7', '8', '9', '10', '11', '12'];

const BroadcastMessageView: React.FC = () => {
  const [messageCategory, setMessageCategory] = useState<{ value: string, label: string } | null>(null);
  const [messageTemplate, setMessageTemplate] = useState<{ value: string, label: string } | null>(null);
  const [collegeData, setCollegeData] = useState<CollegeData[]>([]);
  const [templateValues, setTemplateValues] = useState<Array<string> | null>(null);
  const [attendanceDate, setAttendanceDate] = useState(dayjs());
  const [broadcastTitle, setBroadcastTitle] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { openModal, closeModal, setLoading } = useModal();

  const { mutate: uploadAttachment, isLoading: uploadingDoc } = useUploadAttachmentMutation();
  const { mutate: sendBroadcast, isLoading: sendingBroadcast } = useBroadcastMutation();
  const { mutate: sendCollegeConfigurations, isLoading: sendingCollegeConfigurations } = useParentDetailsMutation();

  const { data: templatesCategories, isLoading: categoriesLoading } = useTemplatesCategoriesQuery({});
  const { data: templates, isLoading: templatesLoading } = useTemplatesQuery({}, messageCategory?.value);

  const messageDetails = templates?.data?.find((val: Templates) => val.template_name === messageTemplate?.value)?.variables?.filter((val: string) => (val !== 'Student Name' && val !== 'Student Code' && val !== 'College Name'));

  const replacePlaceholders = (template: string, values: string[]) => {
    return template.replace(/{{(\d+)}}/g, (_, index) => {
      const i = parseInt(index, 10) - 1;
      return `{{${values[i]}}}` || '';
    });
  };

  const generatePreviewMessage = (messageTemplate: { label: string, value: string } | null) => {
    const template = templates?.data?.find((val: Templates) => val.template_name === messageTemplate?.value);
    if (template) {
      const message = template.message_sample ?? '';
      return replacePlaceholders(message, template.variables || []);
    }
    return '';
  };

  const showDocUpload = templates?.data?.find((val: Templates) => val.template_name === messageTemplate?.value)?.format === "DOCUMENT";

  const handleSendMessage = async (selectedParentsData: any) => {
    const isStudentName = templates?.data?.find((val: Templates) => val.template_name === messageTemplate?.value)?.variables.includes('Student Name');
    const isStudentCode = templates?.data?.find((val: Templates) => val.template_name === messageTemplate?.value)?.variables.includes('Student Code');

    const populatedColleges = [...new Set(selectedParentsData?.map((parents: any) => { return (parents?.students?.map((student: any) => student?.college_name)) }).flat())];
    const updateCollegeData = collegeData?.filter(val => populatedColleges.includes(val.college.label.replace('Kewdale Primary', 'Kewdale').replace('Kewdale High', 'Kewdale')));

    try {
      const handleSuccess = () => {
        toast.success("Broadcast Initiated Successfully", { duration: 4000 });
        setBroadcastTitle(null);
        setMessageCategory(null);
        setMessageTemplate(null);
        setCollegeData([]);
        setSelectedFile(null);
        closeModal();
        setLoading(false)
      };

      const handleError = (error: any) => {
        toast.error(error?.response?.data?.error || "Broadcast failed");
        setLoading(false)
      };

      const broadcastPayload = (whatsAppAttachmentId: string | null, whatsAppAttachmentFileName: string | null) => ({
        collegeData: updateCollegeData,
        parentsData: JSON.stringify(selectedParentsData),
        messageTemplate: messageTemplate?.value,
        message: generatePreviewMessage(messageTemplate),
        messageCategory: messageCategory?.label,
        templateValues: messageTemplate?.label === 'Parent Teacher Meeting' ? (templateValues ? [...templateValues, ...[collegeData[0]?.college?.label]] : null) : templateValues,
        isStudentName,
        isStudentCode,
        whatsAppAttachmentId,
        whatsAppAttachmentFileName,
        broadcastTitle
      });

      if (showDocUpload) {
        if (selectedFile) {
          uploadAttachment(selectedFile, {
            onSuccess: (res: { data: { whatsAppResponse: { id: string } } }) => {
              const attachmentId = res?.data?.whatsAppResponse?.id;
              if (attachmentId) {
                sendBroadcast(broadcastPayload(attachmentId, selectedFile?.name), {
                  onSuccess: handleSuccess,
                  onError: handleError,
                });
              }
            },
            onError: handleError,
          });
        }
        else {
          toast.error("Select Attachment to upload");
        }
      } else {
        sendBroadcast(broadcastPayload(null, null), {
          onSuccess: handleSuccess,
          onError: handleError,
        });
      }
    }
    catch (error: any) {
      toast.error(error?.message || "An unexpected error occurred during the broadcast process.");
    }
  };

  const handlePreviewData = async () => {

    const updatedPayload = collegeData?.map((data) => {
      const formatYearGroup = (yearGroup: any) => {

        if (yearGroup?.includes('All') && data.college.label === "Kewdale Primary") {
          return Kewdale_Primary_Year_Levels;
        }

        if (yearGroup?.includes('All') && data.college.label === "Kewdale High") {
          return Kewdale_High_Year_Levels;
        }

        if (yearGroup?.includes('All')) return 'All';

        return yearGroup?.map((item: string) => {
          if (item === 'KG') return '-1';
          if (item === 'PP') return '0';
          return item.replace(/^Year\s*/i, '');
        });
      };

      return {
        year_grp: formatYearGroup(data.yearLevel),
        pc_grp: data.classGroup?.includes('All') ? 'All' : data.classGroup,
        cmpy_code: data.college?.value,
        test_mode: Boolean(process.env.NEXT_PUBLIC_TEST_MODE),
        ...(messageCategory?.label === ATTENDANCE_CATEGORY && {
          absent_date: attendanceDate.format('YYYY-MM-DD'),
          absent_type:
            messageTemplate?.value === "attendance_early_departure_alert"
              ? AttendanceType.Early_Departure
              : messageTemplate?.value === "attendance_late_to_school"
                ? AttendanceType.Late
                : AttendanceType.Absence,
        })
      };
    });

    sendCollegeConfigurations({
      collegeConfigurations: updatedPayload
    }, {
      onSuccess: ({ data }: ParentsResponse) => {

        //@ts-ignore
        if (data?.data?.length === 0) {
          toast.error('No data found against given college configurations ')
          return;
        }
        openModal({ view: "PARENT_DETAILS_MODAL", data: { data, handleSendMessage, sendingBroadcast, uploadingDoc } });
      },
      onError: (error) => {
        toast.error(error?.response?.data?.error)
      },
    });
  };

  useEffect(() => {
    if (messageCategory?.label === ATTENDANCE_CATEGORY) {
      setTemplateValues([attendanceDate.format(formats.DATE_FORMAT)])
    }
  }, [messageCategory, attendanceDate, messageTemplate])

  useEffect(() => {
    if (uploadingDoc) {
      setLoading(true)
    }
    if (sendingBroadcast) {
      setLoading(true)
    }
  }, [uploadingDoc, sendingBroadcast])

  return (
    <>
      <Card>
        <CardContent>
          <Grid>
            <Typography variant='h5' fontWeight={500} color={'rgba(47, 43, 61, 0.9)'}>Send Bulk Messages</Typography>
            <Divider sx={{ py: 3 }} />
            <Typography pt={3}>
              Use this form to create and send bulk messages for your college. You can select specific college, year levels, and class groups to send important announcements to the respective parents
            </Typography>
            <Divider sx={{ py: 3 }} />
          </Grid>
          <Grid mt={5}>
            <CustomTextField
              fullWidth
              label='Broadcast Title'
              value={broadcastTitle}
              onChange={(e) => setBroadcastTitle(e.target.value)}
            />
            {!broadcastTitle && <Typography sx={{ color: 'red' }} variant='caption' >Title is required</Typography>}
          </Grid>
          <Grid mt={5}>
            <CustomSelect
              label='Select Category'
              list={templatesCategories?.data?.filter((val: TemplatesCategory) => val.slug !== 'communication')?.map((val: TemplatesCategory) => ({ label: val.name, value: val.slug }))}
              onChange={(selectedOption) => {
                setMessageTemplate(null);
                setTemplateValues(null);
                setCollegeData([]);
                setSelectedFile(null)
                setMessageCategory(selectedOption);
              }}
              isMulti={false}
              errorMsg=""
              value={messageCategory}
              menuPortalTarget={document.body}
              isLoading={categoriesLoading}
            />
          </Grid>
          {messageCategory && (
            <Grid mt={5}>
              <CustomSelect
                label='Select Message Template'
                list={templates?.data?.map((val: Templates) => ({
                  label: toTitleCase(val.template_name.replace(messageCategory?.value || '', '').replaceAll('_', ' ').trim()),
                  value: val.template_name
                }))}
                onChange={(selectedOption) => {
                  setTemplateValues(null);
                  setCollegeData([]);
                  setSelectedFile(null)
                  setMessageTemplate(selectedOption);
                }}
                isMulti={false}
                errorMsg=""
                value={messageTemplate}
                menuPortalTarget={document.body}
                isLoading={templatesLoading}
              />
            </Grid>
          )}

          {messageCategory?.label === ATTENDANCE_CATEGORY && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                value={attendanceDate}
                onChange={(newDate) => setAttendanceDate(newDate ?? dayjs())}
                format="DD-MM-YYYY" // Display format: day-month-year
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: "outlined",
                    sx: { my: 5 }
                  },
                }}
                maxDate={dayjs()}
              />
            </LocalizationProvider>
          )}
          {(messageCategory && messageTemplate) && (
            <>
              {(messageDetails?.length !== 0 && messageCategory?.label !== ATTENDANCE_CATEGORY) && <>
                <Typography my={5} variant='h5' fontWeight={500} color={'rgba(47, 43, 61, 0.9)'}>Message Details</Typography>
                <Grid container spacing={3} mb={5} mt={5}>
                  {messageDetails?.map((val: string, index: number) => (
                    <React.Fragment key={index}>
                      <Grid item xs={12} md={2}>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {val}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <CustomTextField
                          fullWidth
                          type={val.includes('Date') ? 'date' : val.includes('Time') ? 'time' : 'text'}
                          onChange={(e) => {
                            const newValues = [...(templateValues || [])];
                            let formattedValue = e.target.value;

                            if (val.includes('Date')) {
                              formattedValue = dayjs(e.target.value).format('Do MMMM YYYY'); // e.g., 21st December 2025
                            } else if (val.includes('Time')) {
                              formattedValue = dayjs(e.target.value, 'HH:mm').format('hh:mm A'); // e.g., 08:00 AM
                            }

                            newValues[index] = formattedValue;
                            setTemplateValues(newValues);
                          }}
                        />
                        {!templateValues?.[index] && <Typography sx={{ color: 'red' }} variant='caption' >{val} is required</Typography>}
                      </Grid>
                      <Grid item xs={12} md={8}></Grid>
                    </React.Fragment>
                  ))}
                </Grid>
              </>}
              {showDocUpload &&
                <DocumentUpload setSelectedFile={setSelectedFile} />
              }
              <MessagePreview previewMessage={generatePreviewMessage(messageTemplate)} />
            </>
          )}

        </CardContent>
      </Card>
      {(messageCategory && messageTemplate) && (
        <>
          <Card sx={{ mt: 5, zIndex: -1 }}>
            <CardContent>
              <Grid>
                <Typography variant='h5' fontWeight={500} color={'rgba(47, 43, 61, 0.9)'}> College</Typography>
              </Grid>
              <CollegeSelectionTable collegeData={collegeData} setCollegeData={setCollegeData} messageCategory={messageCategory?.label} messageTemplate={messageTemplate?.label} />
            </CardContent>
          </Card>
          <Grid display={'flex'} justifyContent={'flex-end'} gap={5} marginTop={5}>
            {messageTemplate?.label === 'Principals Message' ?
              <CustomButton
                variant="contained"
                onClick={handlePreviewData}
                disabled={
                  collegeData.length === 0 ||
                  messageCategory === null ||
                  broadcastTitle === null ||
                  broadcastTitle === '' ||
                  selectedFile === null
                }
                fullWidth={false}
                loading={sendingCollegeConfigurations}
              >
                Proceed
              </CustomButton>
              :
              <CustomButton
                variant="contained"
                onClick={handlePreviewData}
                disabled={
                  collegeData.length === 0 ||
                  messageCategory === null ||
                  messageTemplate === null ||
                  messageDetails?.length !== templateValues?.length ||
                  broadcastTitle === null
                }
                fullWidth={false}
                loading={sendingCollegeConfigurations}
              >
                Proceed
              </CustomButton>
            }
          </Grid>
        </>
      )}
    </>
  );
};

export default BroadcastMessageView;
