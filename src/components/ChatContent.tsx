// MUI Imports
import Badge from '@mui/material/Badge';
import MuiAvatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box, { BoxProps } from '@mui/material/Box';

import Icon from 'src/@core/components/icon';
import ChatLog from '../views/apps/chat/ChatLog';
import SendMsgForm from 'src/views/apps/chat/SendMsgForm';
import CustomAvatar from 'src/@core/components/mui/avatar';
import UserProfileRight from 'src/views/apps/chat/UserProfileRight';

// Type Imports
import { ChatContentType } from 'src/types/apps/chatTypes';
import TemplateSelectBox from 'src/views/apps/chat/TemplateSelectBox';
import AdditionalMessageBox from 'src/views/apps/chat/AdditionalMessageBox';

import { hasPermission } from '@utils/auth-utils';
import { PermissionsEnum } from '@utils/constants';

const ChatWrapperStartChat = styled(Box)<BoxProps>(({ theme }) => ({
  flexGrow: 1,
  height: '100%',
  display: 'flex',
  borderRadius: 1,
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: theme.palette.action.hover,
}));

const ChatContent = (props: ChatContentType) => {
  const {
    store,
    hidden,
    mdAbove,
    messages,
    dispatch,
    statusObj,
    getInitials,
    sidebarWidth,
    selectedChat,
    showTempSelectBox,
    showAddMessageBox,
    userProfileRightOpen,
    handleLeftSidebarToggle,
    handleUserProfileRightSidebarToggle,
  } = props;

  // ** Filter messages based on selected chat
  const filteredMessages = selectedChat
    ? messages?.chat?.chat.filter((msg: { receiverId: any; senderId: any; }) => msg.receiverId === selectedChat.id || msg.senderId === selectedChat.id)
    : [];

  const handleStartConversation = () => {
    if (!mdAbove) {
      handleLeftSidebarToggle();
    }
  };

  const renderContent = () => {
    if (!store) {
      return null;
    }

    if (!selectedChat) {
      return (
        <ChatWrapperStartChat
          sx={{
            ...(mdAbove ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {}),
          }}
        >
          <MuiAvatar
            sx={{
              mb: 6,
              pt: 8,
              pb: 7,
              px: 7.5,
              width: 110,
              height: 110,
              boxShadow: 3,
              backgroundColor: 'background.paper',
            }}
          >
            <Icon icon="tabler:message" fontSize="3.125rem" />
          </MuiAvatar>
          <Box
            onClick={handleStartConversation}
            sx={{
              py: 2,
              px: 6,
              boxShadow: 3,
              borderRadius: 5,
              backgroundColor: 'background.paper',
              cursor: mdAbove ? 'default' : 'pointer',
            }}
          >
            <Typography sx={{ fontWeight: 500, fontSize: '1.125rem', lineHeight: 'normal' }}>
              Start Conversation
            </Typography>
          </Box>
        </ChatWrapperStartChat>
      );
    }

    return (
      <Box
        sx={{
          width: 0,
          flexGrow: 1,
          height: '100%',
          backgroundColor: 'action.hover',
          position: 'relative'
        }}
      >
        <Box
          sx={{
            px: 5,
            py: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'background.paper',
            borderBottom: (theme: any) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {mdAbove ? null : (
              <IconButton onClick={handleLeftSidebarToggle} sx={{ mr: 2 }}>
                <Icon icon="tabler:menu-2" />
              </IconButton>
            )}
            <Box
              onClick={handleUserProfileRightSidebarToggle}
              sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            >
              <Badge
                overlap="circular"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                sx={{ mr: 3 }}
                badgeContent={
                  <Box
                    component="span"
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      boxShadow: (theme: any) => `0 0 0 2px ${theme.palette.background.paper}`,
                    }}
                  />
                }
              >
                {selectedChat.avatar ? (
                  <MuiAvatar
                    sx={{ width: 38, height: 38 }}
                    src={selectedChat.avatar}
                    alt={selectedChat.fullName}
                  />
                ) : (
                  <CustomAvatar
                    skin="light"
                    sx={{ width: 38, height: 38, fontSize: (theme: any) => theme.typography.body1.fontSize }}
                  >

                  </CustomAvatar>
                )}
              </Badge>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6">{selectedChat.fullName}</Typography>
                <Typography sx={{ color: 'text.disabled' }}>{selectedChat.role}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {selectedChat && store.userProfile ? (
          <ChatLog hidden={hidden} data={{ ...messages, chat: { chat: filteredMessages }, userContact: store.userProfile }} />
        ) : null}

        {/* CHECKINF IF USER HAS PERMISSION FOR SENDING MESSAGE  */}
        {hasPermission(PermissionsEnum.INBOX_SEND_MESSAGE) &&
          showTempSelectBox && !showAddMessageBox ? <TemplateSelectBox selectedChat={selectedChat} /> :
          !showTempSelectBox && showAddMessageBox ? <AdditionalMessageBox /> : <SendMsgForm dispatch={dispatch} selectedChat={selectedChat} />
        }

        {false && <UserProfileRight //Added false to prevent from rendering, if needed in future uncomment it
          store={store}
          hidden={hidden}
          statusObj={statusObj}
          getInitials={getInitials}
          sidebarWidth={sidebarWidth}
          userProfileRightOpen={userProfileRightOpen}
          handleUserProfileRightSidebarToggle={handleUserProfileRightSidebarToggle}
        />}
      </Box>
    );
  };

  return renderContent();
};

export default ChatContent;