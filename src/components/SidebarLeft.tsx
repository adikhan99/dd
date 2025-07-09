import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import CustomAvatar from 'src/@core/components/mui/avatar';
import { ChatSidebarLeftType } from 'src/types/apps/chatTypes'
import { formatDateToMonthShort } from 'src/@core/utils/format';
import CustomTextField from 'src/@core/components/mui/text-field';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';

// Custom Type
interface DraftMsg {
  id: string;
  draftMsg: string;
}

const SidebarLeft = (props: ChatSidebarLeftType) => {
  const {
    mdAbove,
    sidebarWidth,
    leftSidebarOpen,
    handleLeftSidebarToggle,
    messages,
    handleSelectChat,
    selectedChat
  } = props;

  // Redux Variables Store
  const store = useSelector((state: RootState) => state.chat);

  // Sort chats by last message timestamp
  const [sortedChats, setSortedChats] = useState([]);
  const [searchText, setSearchText] = useState('');

  // Combine sorting and filtering logic
  const getFilteredChats = (searchString: string): any => {
    if (!messages?.contact?.chat) return [];

    const chats = [...messages.contact.chat].sort((a: any, b: any) => {
      const timeA = new Date(a.lastMessage?.[0]?.time || 0).getTime();
      const timeB = new Date(b.lastMessage?.[0]?.time || 0).getTime();
      return timeB - timeA;
    });

    const trimmed = searchString.trim().toLowerCase();

    return chats.filter(chat => {
      if (!trimmed) return true;

      const nameMatch = chat.name?.toLowerCase().includes(trimmed);
      const fullnameMatch = chat.fullName?.toLowerCase().includes(trimmed);
      const parentCodeMatch = chat.parent_code?.toString().includes(trimmed);

      return nameMatch || fullnameMatch || parentCodeMatch;
    });
  };

  // Update chats when messages or searchText changes
  useEffect(() => {
    const filtered = getFilteredChats(searchText);
    setSortedChats(filtered);
  }, [messages, searchText]);


  useEffect(() => {
    if (messages) {
      const sortedChats = messages?.contact?.chat
        ?.slice()
        .sort((a: any, b: any) => {
          const timeA = new Date(a.lastMessage[0]?.time || 0).getTime();
          const timeB = new Date(b.lastMessage[0]?.time || 0).getTime();
          return timeB - timeA; // Sort in descending order
        });

      setSortedChats(sortedChats)
    }

  }, [messages]);

  const renderChats = () => {
    return sortedChats?.map((chat: any) => {
      const lastMessage = chat.lastMessage[0]?.message || 'No message available';
      const unreadCount = chat.unSeenMsgs || 0; // Number of unread messages
      const isSelected = selectedChat && selectedChat.id === chat.id;

      const arrayObj = store.draftMsgArrayObj.find((msg: DraftMsg) => msg.id === chat.id);

      if (chat.lastMessage.length > 0) {
        return (
          <ListItem
            key={chat.id}
            onClick={() => handleSelectChat(chat)}
            sx={{ cursor: 'pointer', background: (selectedChat && selectedChat.id === chat.id) ? "#f0f2f5" : "#fff" }} >
            <ListItemAvatar>
              <Badge
                color="secondary"
                badgeContent={unreadCount}
                invisible={unreadCount === 0 || isSelected}// Hide badge if no unread messages or if chat is selected
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              >
                <CustomAvatar
                  skin="light"
                  sx={{ width: 38, height: 38, fontSize: (theme: any) => theme.typography.body1.fontSize }}
                >
                </CustomAvatar>
              </Badge>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="body1" sx={{ fontWeight: unreadCount > 0 && !isSelected ? 'bold' : 'normal' }}>
                    {chat.fullName}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {formatDateToMonthShort(chat.lastMessage[0]?.time)}
                  </Typography>
                </Box>
              }
              secondary={
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: unreadCount > 0 && !isSelected ? 'bold' : 'normal',
                  }}
                >
                  {(arrayObj && arrayObj.draftMsg !== "" && selectedChat.id !== chat.id) ? <><span style={{ color: 'green' }}>Draft: </span>{arrayObj.draftMsg}</> : lastMessage}
                </Typography>
              }
            />
          </ListItem>
        );
      }
    });
  };

  return (
    <Drawer
      open={leftSidebarOpen}
      onClose={handleLeftSidebarToggle}
      variant={mdAbove ? 'permanent' : 'temporary'}
      ModalProps={{
        disablePortal: true,
        keepMounted: true,
      }}
      sx={{
        zIndex: 7,
        height: '100%',
        display: 'block',
        position: mdAbove ? 'static' : 'absolute',
        '& .MuiDrawer-paper': {
          boxShadow: 'none',
          width: sidebarWidth,
          position: mdAbove ? 'static' : 'absolute',
          borderTopLeftRadius: (theme) => theme.shape.borderRadius,
          borderBottomLeftRadius: (theme) => theme.shape.borderRadius,
        },
        '& > .MuiBackdrop-root': {
          borderRadius: 1,
          position: 'absolute',
          zIndex: (theme) => theme.zIndex.drawer - 1,
        },
      }}
    >
      <Box sx={{ height: `calc(100% - 4.0625rem)` }}>
        <Box sx={{ p: (theme) => theme.spacing(5, 3, 3) }}>
          <Typography variant="h5" sx={{ ml: 3, mb: 3.5, color: 'primary.main' }}>
            Chats
          </Typography>

          <CustomTextField
            sx={{
              width: '100%',
              padding: '0px 10px 10px 10px',
              '& > .MuiInputBase-root': {
                width: '100%',
              },
            }}
            value={searchText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchText(e.target.value)
            }
            placeholder="Filter chat by Parent Name or Parent Code"
          />

          {sortedChats?.length > 0 ? (
            <List sx={{ mb: 5, p: 0 }}>{renderChats()}</List>
          ) : (
            <Typography variant="body2" sx={{ ml: 3, color: 'text.secondary' }}>
              No chats available
            </Typography>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default SidebarLeft;