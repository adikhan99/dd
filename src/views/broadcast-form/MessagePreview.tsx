import CustomTextArea from '@components/common-components/TextArea';
import { Typography } from '@mui/material';

interface MessagePreviewProps {
  previewMessage: string;
}

const MessagePreview: React.FC<MessagePreviewProps> = ({ previewMessage }) => {
  return (
    <>
      <Typography my={5} variant='h5' fontWeight={500} color={'rgba(47, 43, 61, 0.9)'}>Message Template</Typography>
      <CustomTextArea
        value={previewMessage}
        minRows={5}
        disabled={true}
        onChange={(e) => console.log(e)} />
    </>
  );
};

export default MessagePreview;
