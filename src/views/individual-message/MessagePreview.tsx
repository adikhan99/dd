import { TextField } from "@mui/material";

interface MessagePreviewProps {
    value: string;
}
const MessagePreview: React.FC<MessagePreviewProps> = ({ value }) => {
    return <>
        <h2 className="section-heading">Message Preview</h2>
        <TextField multiline minRows={5} value={value} fullWidth InputProps={{ readOnly: true }}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
    </>
};


export default MessagePreview;