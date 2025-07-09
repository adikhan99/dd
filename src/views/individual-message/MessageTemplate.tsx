import Dropdown from '@components/common-components/Dropdown';

interface MessageTemplateProps {
    messageTemplate: string;
    handleTemplateChange: (value: string) => void;
    templateOptions: any[];
    messageCategory: string;
}

const MessageTemplate: React.FC<MessageTemplateProps> = ({ messageCategory, messageTemplate, handleTemplateChange, templateOptions }) => {
    if (messageCategory !== "Attendance") return null;

    return (
        <>
            <h2 className="section-heading">Message Template <span style={{ color: 'red' }}>*</span></h2>
            <Dropdown
                label="Choose a Template"
                value={messageTemplate}
                options={templateOptions}
                onChange={handleTemplateChange}
            />
        </>
    );
};


export default MessageTemplate;