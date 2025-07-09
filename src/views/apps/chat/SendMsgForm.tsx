import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { SendMsgParamsType } from 'src/types/apps/chatTypes';

// ** Endpoint Import
import { INBOX_API_ENDPOINTS } from '@utils/api/inbox/endpoints';
import { getLocalStorageToken } from '@utils/auth-utils';

import { setMsgDraft } from '@components/appChatSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';

interface DraftMsg {
  id: string;
  draftMsg: string;
}

const SendMsgForm: React.FC<SendMsgParamsType> = ({ dispatch, selectedChat }) => {
  const store = useSelector((state: RootState) => state.chat);
  const arrayObj = store.draftMsgArrayObj.find((msg: DraftMsg) => msg.id === selectedChat.id);

  // ** Send Message Handler **
  const handleSendMessage = async () => {
    if (arrayObj.draftMsg.trim() === '') {
      return; // Prevent sending empty messages
    }

    try {
      const response = await fetch(INBOX_API_ENDPOINTS.SEND_MESSAGE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getLocalStorageToken()}`
        },
        body: JSON.stringify({
          sender_number: process.env.NEXT_PUBLIC_WHATSAPP_HOST_NUMBER,
          receiver_number: selectedChat?.id,
          message: arrayObj.draftMsg,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error sending message: ${response.statusText}`);
      }

      dispatch(setMsgDraft({
        id: selectedChat.id,
        draftMsg: '',
      }))
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      {/* Input Field and Button */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          value={arrayObj.draftMsg}
          onChange={(e) => {
            dispatch(setMsgDraft({
              id: selectedChat.id,
              draftMsg: e.target.value,
            }))
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Type your message here..."
        />
        <Button
          variant="contained"
          onClick={handleSendMessage}
          sx={{
            backgroundColor: '#02253f',
            color: 'white',
            '&:hover': {
              backgroundColor: '#011c2f',
            },
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default SendMsgForm;
