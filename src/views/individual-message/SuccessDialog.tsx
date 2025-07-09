import React from 'react';
import Dialog from '@components/common-components/Dialog';

interface SuccessDialogProps {
    isPopupOpen: boolean;
    setIsPopupOpen: (value: boolean) => void
    isSuccess: boolean;
    popupMessage: string;
    handlePopupClose: (action: "sendMore" | "checkInbox" | "sendAgain") => void;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({ setIsPopupOpen, isPopupOpen, isSuccess, popupMessage, handlePopupClose }) => (
    <Dialog
        title={isSuccess ? 'Success' : 'Error'}
        message={popupMessage}
        isOpen={isPopupOpen}
        onClose={() => {
            setIsPopupOpen(false)
        }}
        actions={isSuccess ? [
            {
                label: 'Send More',
                onClick: () => handlePopupClose('sendMore'),
            },
            {
                label: 'Check Inbox',
                onClick: () => handlePopupClose('checkInbox'),
            },
        ] : [
            {
                label: 'Send Again',
                onClick: () => handlePopupClose('sendAgain'),
            },
        ]}
        sx={{
            '& .MuiDialogActions-root': {
                width: '390px',

                '@media (max-width: 425px)': {
                    width: '320px',
                },

                '@media (max-width: 360px)': {
                    width: '100%',

                    '& .MuiButtonBase-root': {
                        fontSize: '12px', // Ensure camelCase for consistency
                    },
                },
            },
        }}

    />
);

export default SuccessDialog;
