// ** React Imports
import { useRef, useEffect } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar';

// ** Types Imports
import {
  ChatLogType,
  MessageType,
  MsgFeedbackType,
  ChatLogChatType,
  MessageGroupType,
  FormattedChatsType,
} from 'src/types/apps/chatTypes';

// ** Styled Scroll Wrapper
const ScrollWrapper = styled(Box)(({ theme }: { theme: any }) => ({
  height: '100%',
  overflowY: 'auto',
  overflowX: 'hidden',
  scrollbarWidth: 'thin',
  scrollbarColor: `${theme.palette.secondary.main} ${theme.palette.background.default}`,
  '&::-webkit-scrollbar': {
    width: '8px',
    height: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.background.default,
  },
}));

const renderMsgFeedback = (isSender: boolean, feedback: MsgFeedbackType = { isSent: true, isDelivered: true, isSeen: true }) => {
  if (isSender) {
    if (feedback.isSent && !feedback.isDelivered) {
      return (
        <Box component="span" sx={{ display: 'flex', '& svg': { mr: 1.5, color: 'text.secondary' } }}>
          <Icon icon="tabler:check" fontSize="1.125rem" />
        </Box>
      );
    } else if (feedback.isSent && feedback.isDelivered) {
      return (
        <Box
          component="span"
          sx={{
            display: 'flex',
            '& svg': { mr: 1.5, color: feedback.isSeen ? 'success.main' : 'text.secondary' },
          }}
        >
          <Icon icon="tabler:checks" fontSize="1.125rem" />
        </Box>
      );
    }
  }
  return null;
};

const ChatLog = (props: ChatLogType) => {
  // ** Props
  const { data, hidden } = props;

  // ** Ref
  const chatArea = useRef<HTMLDivElement | null>(null);

  // ** Scroll to chat bottom
  const scrollToBottom = () => {
    if (chatArea.current) {
      chatArea.current.scrollTop = chatArea.current.scrollHeight;
    }
  };

  // ** Formats chat data based on sender
  const formattedChatData = () => {
    const chatLog: MessageType[] = Object.values(data.chat?.chat || {});
    const formattedChatLog: FormattedChatsType[] = [];
    let chatMessageSenderId = chatLog[0]?.senderId;
    let msgGroup: MessageGroupType = {
      senderId: chatMessageSenderId,
      messages: [],
    };

    chatLog.forEach((msg: MessageType, index: number) => {

      const senderId = msg.senderId;
      const feedback = msg.feedback || {};
      const message = msg.message || '';

      if (chatMessageSenderId === senderId) {
        msgGroup.messages.push({
          time: msg.time,
          msg: message,
          file_url: msg.file_url,
          file_name: msg.file_name,
          feedback,
          isTemplate: msg.isTemplate || false,
          isContextual: msg.isContextual || false,
          contextId: msg.contextId || null,
          contextMessage: msg.contextMessage || null,
          contextSender: msg.contextSender || null
        });
      } else {
        chatMessageSenderId = senderId;
        formattedChatLog.push(msgGroup);
        msgGroup = {
          senderId,
          messages: [
            {
              time: msg.time,
              msg: message,
              file_url: msg.file_url,
              file_name: msg.file_name,
              feedback,
              isTemplate: msg.isTemplate || false,
              isContextual: msg.isContextual || false,
              contextId: msg.contextId || null,
              contextMessage: msg.contextMessage || null,
              contextSender: msg.contextSender || null
            },
          ],
        };
      }

      if (index === chatLog.length - 1) formattedChatLog.push(msgGroup);
    });

    return formattedChatLog;
  };

  useEffect(() => {
    if (data && data.chat && Object.keys(data.chat.chat || {}).length) {
      scrollToBottom();
    }
  }, [data]);

  // ** Renders user chat
  const renderChats = () => {
    const chats = formattedChatData();
    const specificSenderId = process.env.NEXT_PUBLIC_WHATSAPP_HOST_NUMBER;

    return chats.map((item: FormattedChatsType, index: number) => {
      const isSender = item.senderId === specificSenderId;

      return (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: isSender ? 'row-reverse' : 'row',
            mb: index !== chats.length - 1 ? 4 : undefined,
          }}
        >
          <CustomAvatar
            skin="light"
            sx={{
              width: 38,
              height: 38,
              fontSize: (theme: any) => theme.typography.body1.fontSize,
              ml: isSender ? 3 : undefined,
              mr: !isSender ? 3 : undefined,
            }}
          />

          <Box className="chat-body" sx={{ maxWidth: ['calc(100% - 5.75rem)', '75%', '65%'] }}>
            {item.messages.map((chat: ChatLogChatType, i: number) => {
              const time = new Date(chat.time);
              const isContextual = chat.isContextual;
              const isContextualFromMe = chat.contextSender === specificSenderId;
              
              return (
                <Box key={i} sx={{ '&:not(:last-of-type)': { mb: 3 } }}>
                 {/* Contextual reply indicator */}
                {isContextual && chat.contextMessage && (
                  <Box
                    sx={{
                      mb: 1,
                      p: 1.5,
                      borderRadius: 1,
                      backgroundColor: 'action.hover',
                      borderLeft: '3px solid',
                      borderColor: isContextualFromMe ? 'primary.main' : 'secondary.main',
                      maxWidth: '80%',
                      marginLeft: isSender ? 'auto' : 0,
                      textAlign: isSender ? 'right' : 'left',
                    }}
                  >
                    <Typography variant="body2" sx={{ 
                      fontWeight: 500, 
                      color: 'text.secondary',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      justifyContent: isSender ? 'flex-end' : 'flex-start'
                    }}>
                      <Icon icon="tabler:corner-up-left" fontSize="1rem" />
                      You
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        color: 'text.disabled',
                        fontStyle: 'italic'
                      }}
                    >
                      {chat.contextMessage}
                    </Typography>
                  </Box>
                )}
                  
                  <Typography
                    sx={{
                      boxShadow: 1,
                      borderRadius: 1,
                      maxWidth: '100%',
                      width: 'fit-content',
                      wordWrap: 'break-word',
                      p: (theme: any) => theme.spacing(2.25, 4),
                      ml: isSender ? 'auto' : undefined,
                      borderTopLeftRadius: !isSender ? 0 : undefined,
                      borderTopRightRadius: isSender ? 0 : undefined,
                      color: isSender ? 'common.white' : 'text.primary',
                      backgroundColor: isSender ? 'primary.main' : 'background.paper',
                      whiteSpace: 'pre-wrap'
                    }}
                  >
                    {chat.msg}<br /><br />{chat.file_url && <a target='_blank' href={chat.file_url} style={{ color: "#fff", textDecoration: 'underline' }}>{chat.file_name}</a>}
                  </Typography>

                  {i + 1 === item.messages.length && (
                    <Box
                      sx={{
                        mt: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isSender ? 'flex-end' : 'flex-start',
                      }}
                    >
                      {renderMsgFeedback(isSender, chat.feedback)}
                      <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                        {time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                      </Typography>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      );
    });
  };

  return (
    <Box sx={{ height: hidden ? 'calc(100% - 8.875rem)' : 'calc(100% - 9.875rem)' }}>
      <ScrollWrapper ref={chatArea}>{renderChats()}</ScrollWrapper>
    </Box>
  );
};

export default ChatLog;