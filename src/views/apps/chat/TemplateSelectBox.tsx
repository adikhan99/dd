// React Imports
import React from 'react';

// MUI Imports
import { InfoOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

// React-Query Imports
import { useGreetingTemplateMutation } from '@data/inbox/send-greeting-template';
import { useTemplatesQuery } from '@data/templates/get-templates-query';

// Component Imports
import CustomButton from '@components/common-components/Button';
import { TEMPLATE_NAMES } from '@utils/constants';

// Custom Types
interface TemplateSelectBoxPropType {
    selectedChat: {
        id: string
        fullName: string
        lastMessage: object[]
        unSeenMsgs: number
    }
}
const TemplateSelectBox: React.FC<TemplateSelectBoxPropType> = ({ selectedChat }) => {
    const { data: templates, isLoading: templatesLoading, error: templatesError } = useTemplatesQuery({}, TEMPLATE_NAMES.GREETING_TEMPLATE);
    const { mutate: sendGreetingTemplate, isLoading: sendingGreetingTemplate } = useGreetingTemplateMutation();

    const handleSendGreetingTemplate = () => {
        if (!templatesError && templates) {
            sendGreetingTemplate({
                receiver_number: selectedChat.id,
                sender_number: process.env.NEXT_PUBLIC_WHATSAPP_HOST_NUMBER,
                message: templates.data[0].message_sample
            });
        }
    }

    return (
        <Box sx={{ 
            width: '100%', 
            position: 'absolute', 
            bottom: '0px', 
            zIndex: 10, 
            backgroundColor: 'background.paper',
            boxShadow: '0 0 21px 0 #19191940',
            borderTop: '1px solid',
            borderColor: 'divider'
        }}>
            <Box
                sx={{
                    bgcolor: "#dce8dc",
                    p: 3, 
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: '100%',
                }}
            >
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: '15px' }}>
                    <Box>
                        <InfoOutlined sx={{
                            color: "#fff",
                            width: 30,
                            height: 30,
                            background: "#27652b",
                            padding: '3px',
                            borderRadius: '5px',
                        }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ color: "#27652b", fontWeight: 500 }}>
                            24 hours limit
                        </Typography>
                        <Typography sx={{ color: "#27652b", lineHeight: 1.6 }}>
                            WhatsApp does not allow sending messages to a user 24 hours after they last messaged you. You can send a template message to re-start the conversation.
                        </Typography>
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}>
                            <CustomButton
                                onClick={handleSendGreetingTemplate}
                                loading={sendingGreetingTemplate || templatesLoading}
                                sx={{
                                    bgcolor: "#27652b",
                                    color: "white",
                                    width: 'max-content',
                                    "&:hover": {
                                        bgcolor: "#1e4c20",
                                    },
                                }}
                            >
                                Send Greeting Message
                            </CustomButton>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default TemplateSelectBox;
