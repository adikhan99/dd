// React Imports
import React, { useEffect, useState } from 'react';

// Third-party Imports
import { io, Socket } from 'socket.io-client';
import dayjs from 'dayjs';

// Environment Import
const backendUrl = process.env.NEXT_PUBLIC_SOCKET_URL;

// ** MUI Imports
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// ** Redux & Store Imports
import { useDispatch, useSelector } from 'react-redux';
import { sendMsg, fetchUserProfile, fetchChatsContacts, removeSelectedChat, initializedraftMsgObj } from 'src/components/appChatSlice';
import { RootState, AppDispatch } from 'src/store';

// ** Components Imports
import SidebarLeft from 'src/components/SidebarLeft';
import ChatContent from 'src/components/ChatContent';

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings';

// ** Utils Imports
import { getInitials } from 'src/@core/utils/get-initials';
import { formatDateToMonthShort } from 'src/@core/utils/format';

// ** Socket Initialization
const socket: Socket = io(backendUrl, { transports: ['websocket'], autoConnect: true, path: '/socket/', });
console.log('socket 34', socket);

// ** Endpoint Import
import { useGetAllChatQuery } from '@data/inbox/get-all-chats';
import CustomSpinner from '@components/common-components/CustomSpinner';
import { hasPermission } from '@utils/auth-utils';
import { PermissionsEnum } from '@utils/constants';
import { ChatMessage, LastMessage, Message, MessagesState } from '@ts-types/generated';
import { isChatRead, getStoredUnreadCounts, getReadChats, updateStoredUnreadCounts, markChatAsRead } from '@utils/helper-functions';

const AppChat = () => {
  // ** State
  const [userStatus, setUserStatus] = useState<'online' | 'offline' | 'busy' | 'away'>('online');
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [userProfileLeftOpen, setUserProfileLeftOpen] = useState(false);
  const [userProfileRightOpen, setUserProfileRightOpen] = useState(false);
  const [messages, setMessages] = useState<any>(null); // Messages state  
  const [selectedChat, setSelectedChat] = useState<any | null>(null);
  const [showTempSelectBox, setShowTempSelectBox] = useState(false);
  const [showAddMessageBox, setShowAddMessageBox] = useState(false);

  // ** Hooks
  const theme = useTheme();
  const { settings } = useSettings();
  const dispatch = useDispatch<AppDispatch>();
  const hidden = useMediaQuery(theme.breakpoints.down('lg'));
  const store = useSelector((state: RootState) => state.chat);

  const { skin } = settings;
  const smAbove = useMediaQuery(theme.breakpoints.up('sm'));
  const sidebarWidth = smAbove ? 360 : 300;
  const mdAbove = useMediaQuery(theme.breakpoints.up('md'));
  const statusObj = { busy: 'error', away: 'warning', online: 'success', offline: 'secondary' } as const;

  const { data: chatData, isFetching: fetchingAllChat, error: fetchingAllChatError } = useGetAllChatQuery();

  const AIC_CONTACT_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_HOST_NUMBER;

  const setConversationLock = (messages: any) => {

    if (selectedChat !== null) {
      // All Chat happend
      const allChat = messages?.chat?.chat || [];

      // Filter the message sent by parent
      const messagesByParent = allChat
        .filter((msg: any) => msg.senderId !== AIC_CONTACT_NUMBER)
        .filter((msg: any) => msg.senderId === selectedChat.id);

      // Checking if parent has actually sent the message
      if (messagesByParent.length > 0) {

        // Get the last message sent by parent
        const last = messagesByParent.at(-1);

        // Check if the last message time is valid
        const isValid = last?.time && dayjs(last.time).isValid();

        // Check if the last message is older than 24hr
        const isOlderThan24h = isValid ? dayjs(last.time).isBefore(dayjs().subtract(24, 'hour')) : true;

        if (isOlderThan24h) {

          // If chat is older than 24hr and the last message is sent from the parent then hide the information box and show greeting template box
          setShowAddMessageBox(false);
          setShowTempSelectBox(true);
        }
        else {
          // If chat is not older than 24hr and the last message is sent from the parent then show greeting template box and hide the information box
          setShowAddMessageBox(false);
          setShowTempSelectBox(false);
        }
      }

      // If the message is only sent from the Host
      else if (messagesByParent.length === 0) {

        // Get the last message sent
        const MessagesByHost = allChat
          .filter((msg: any) => msg.senderId === AIC_CONTACT_NUMBER)
          .filter((msg: any) => msg.receiverId === selectedChat.id);

        if (MessagesByHost.length > 0) {
          const lastMessageByHost = MessagesByHost.at(-1);

          // Check if the last message time is valid
          const isValid = lastMessageByHost?.time && dayjs(lastMessageByHost.time).isValid();

          // Check if the last message is older than 24hr
          const isOlderThan24h = isValid ? dayjs(lastMessageByHost.time).isBefore(dayjs().subtract(24, 'hour')) : true;

          if (isOlderThan24h) {
            setShowTempSelectBox(true);
            setShowAddMessageBox(false);
          } else {
            setShowAddMessageBox(true);
            setShowTempSelectBox(false);
          }
        }
      }
    }
  }

  useEffect(() => {
    setConversationLock(messages)
  }, [messages]);


  // Update the initializeChat function to ensure proper message loading
  const initializeChat = async () => {
    console.log('initializeChat 142');
    if (chatData) {
      // Filter to only show verified parents
      const verifiedParents = chatData.filter(parent => parent.parent_code);

      setMessages({
        chat: {
          id: 1,
          userId: 1,
          unseenMsgs: 1,
          chat: chatData.flatMap((parent: any) =>
            parent.messages.map((msg: any) => ({
              file_url: msg.file_url ? msg.file_url : null,
              file_name: msg.file_url ? msg.whatsAppAttachmentFileName : null,
              message: msg.message,
              time: msg.time_stamp,
              senderId: msg.sender_number,
              receiverId: msg.receiver_number,
              feedback: [{ isSent: true, isDelivered: true, isSeen: true }],
              student_code: msg.student_code ? msg.student_code : null,
              isContextual: msg.is_contextual_reply || false,
              contextId: msg.context_message_id || null,
              contextMessage: msg.context_message_text || null,
              contextSender: msg.context_message_sender || null
            }))
          ),
          draft: null,
        },
        contact: {
          about: 'About info',
          avatar: '/images/avatars/2.png',
          id: verifiedParents[0]?.parent_code,
          role: '',
          status: 'online',
          chat: verifiedParents.map((parent: any) => ({
            id: parent.contact_number,
            fullName: `${parent.family_name} - ${parent.contact_number}`,
            unSeenMsgs: isChatRead(parent.contact_number) ? 0 : (getStoredUnreadCounts()[parent.contact_number] || 0),
            parent_code: parent.parent_code,
            lastMessage: parent.messages.slice(-1).map((msg: any) => ({
              message: msg.message,
              senderId: msg.sender_number,
              time: msg.time_stamp,
              feedback: [{ isSent: true, isDelivered: true, isSeen: true }],
            })),
          })),
        },
      });

      const handleSocketMessage = (message: Message, isReceived: boolean) => {
          setMessages((prevMessages: MessagesState | null) => {
            if (!prevMessages) {
              return {
                chat: { id: 1, userId: 1, unseenMsgs: 0, chat: [] },
                contact: { about: '', avatar: '', id: '', role: '', status: 'online', chat: [] }
              };
            }

            const updatedMessages = { ...prevMessages };
            const contactId = isReceived ? message.sender_number : message.receiver_number;
            const isCurrentChat = selectedChat?.id === contactId;

            const formattedName = message.name
              ? message.name
              : message.full_name
                ? `${message.full_name} - ${isReceived ? message.sender_number : message.receiver_number}`
                : `${contactId}`;

            const newMessage: ChatMessage = {
              message: message.message,
              senderId: message.sender_number,
              receiverId: message.receiver_number,
              time: message.time_stamp,
              feedback: [{ isSent: true, isDelivered: true, isSeen: true }],
              parent_code: message.parent_code || null,
              college: message.college || null,
              isTemplate: message.isTemplate || false,
              isContextual: message.is_contextual_reply || false,
              contextId: message.context_message_id || null,
              contextMessage: message.context_message_text || null,
              contextSender: message.context_message_sender || null
            };

            const chatExists = updatedMessages.chat.chat.some(
              (m) => m.message === message.message && m.time === message.time_stamp
            );

            if (!chatExists) {
              updatedMessages.chat.chat.push(newMessage);
            }

            const contactList = updatedMessages.contact.chat;
            const contactIndex = contactList.findIndex((c) => c.id === contactId);
            const lastMsg: LastMessage = {
              message: message.message,
              senderId: message.sender_number,
              time: message.time_stamp,
              feedback: [{ isSent: true, isDelivered: true, isSeen: true }],
            };

             // Reset "read" status if a new message arrives
              if (isReceived) {
                const readChats = getReadChats();
                delete readChats[contactId]; // Remove from "read" list
                localStorage.setItem('readChats', JSON.stringify(readChats));
              }

            const shouldIncrementUnseen = isReceived && !isCurrentChat;

            if (contactIndex === -1 && message.parent_code) {
              contactList.unshift({
                id: contactId,
                fullName: formattedName,
                parent_code: message.parent_code,
                college: message.college,
                lastMessage: [lastMsg],
                unSeenMsgs: shouldIncrementUnseen ? 1 : 0
              });
            } else if (contactIndex !== -1) {
              const contact = contactList[contactIndex];
              contact.lastMessage = [lastMsg];
              contact.unSeenMsgs = shouldIncrementUnseen ? (contact.unSeenMsgs || 0) + 1 : 0;
              updateStoredUnreadCounts(contactId, contact.unSeenMsgs);
              
              if (formattedName && formattedName !== contactId) {
                contact.fullName = formattedName;
              }
            }

            return updatedMessages;
          }
        );
      };

      const handleTemplateMessage = (msg: any) => {

        setMessages((prevMessages: any) => {
          const updatedMessages = prevMessages ? JSON.parse(JSON.stringify(prevMessages)) : {
            chat: { id: 1, userId: 1, unseenMsgs: 0, chat: [] },
            contact: { about: '', avatar: '', id: '', role: '', status: 'online', chat: [] }
          };

          // Add message to chat
          updatedMessages.chat.chat.push({
            message: msg.message,
            senderId: msg.sender_number,
            receiverId: msg.receiver_number,
            time: msg.time_stamp,
            feedback: [{ isSent: true, isDelivered: true, isSeen: true }],
            parent_code: msg.parent_code,
            college: msg.college,
            isTemplate: true
          });

          // Update or add contact
          const contactIndex = updatedMessages.contact.chat.findIndex(
            (c: any) => c.id === msg.receiver_number
          );

          if (contactIndex === -1) {
            updatedMessages.contact.chat.unshift({
              id: msg.receiver_number,
              fullName: `${msg.family_name} - ${msg.receiver_number}`,
              unSeenMsgs: 0,
              parent_code: msg.parent_code,
              lastMessage: [{
                message: msg.message,
                senderId: msg.sender_number,
                time: msg.time_stamp,
                feedback: [{ isSent: true, isDelivered: true, isSeen: true }],
              }],
            });
          } else {
            updatedMessages.contact.chat[contactIndex].lastMessage = [{
              message: msg.message,
              senderId: msg.sender_number,
              time: msg.time_stamp,
              feedback: [{ isSent: true, isDelivered: true, isSeen: true }],
            }];
          }

          return updatedMessages;
        });
      };

      const handleNewParent = (data: any) => {
        setMessages((prevMessages: any) => {
          const updatedMessages = prevMessages ? JSON.parse(JSON.stringify(prevMessages)) : {
            chat: { id: 1, userId: 1, unseenMsgs: 0, chat: [] },
            contact: { about: '', avatar: '', id: '', role: '', status: 'online', chat: [] }
          };

          const formattedName = `${data.parent?.family_name} - ${data.parent?.contact_number}`;

          // Add parent to contacts if not exists
          const parentExists = updatedMessages.contact.chat.some(
            (c: any) => c.id === data.parent?.contact_number
          );

          if (!parentExists) {
            updatedMessages.contact.chat.unshift({
              id: data.parent?.contact_number,
              fullName: formattedName,
              unSeenMsgs: 0,
              parent_code: data.parent?.parent_code,
              college: data.parent?.college,
              lastMessage: data.messages?.length > 0
                ? [{
                  message: data.messages[data.messages.length - 1].message,
                  senderId: data.messages[data.messages.length - 1].sender_number,
                  time: data.messages[data.messages.length - 1].time_stamp,
                  feedback: [{ isSent: true, isDelivered: true, isSeen: true }],
                }]
                : []
            });
          }

          return updatedMessages;
        });
      };

      // Socket listeners
      socket.on('template-message', (msg) => {
        console.log('template-message', msg)
        handleTemplateMessage(msg)
      });
      socket.on('received-message', (msg) => {
        console.log('received-message', msg)
        handleSocketMessage(msg, true)
      });
      socket.on('saved-message', (msg) => {
        console.log('saved-message', msg)
        handleSocketMessage(msg, false)
      });

      socket.on('new-parent', (data) => {
        if (data.isVerified) {
          handleNewParent(data);
        }
      });

      socket.on('verification-message', (msg) => {
        console.log('verification-message', msg);
        if (msg.message.includes('The details you entered do not match') ||
          msg.message.includes('Please try entering them again')) {
          handleSocketMessage(msg, true);
        }
      });
    }
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket connection established');
    });
  }, []);

  useEffect(() => {
    console.log('!fetchingAllChat && !fetchingAllChatError && chatData 386', fetchingAllChat, fetchingAllChatError, chatData);
    // if (!fetchingAllChat && !fetchingAllChatError && chatData) {
    if (chatData) {
      initializeChat();
    }
  }, [chatData]);

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchChatsContacts());
    initializeChat();

    return () => {
      socket.off('template-message');
      socket.off('received-message');
      socket.off('saved-message');
      socket.off('new-parent');
      socket.disconnect();
    };
  }, [dispatch]);

  // ** Handle chat selection
  const handleSelectChat = (chat: any) => {
    if (!chat || !chat.id) {
      console.error("Invalid chat selected.");
      return;
    }

    // Save selected chat ID to localStorage
    //localStorage.setItem("selectedChatId", chat.id);

    setSelectedChat(chat);
    const obj = {
      id: chat.id,
      draftMsg: '',
    }
    dispatch(initializedraftMsgObj(obj))

    // Mark chat as read in localStorage
  markChatAsRead(chat.id);

    // Reset unread message count for the selected chat
    setMessages((prevMessages: any) => {
    if (!prevMessages) return prevMessages;
    
    const updatedMessages = { ...prevMessages };
    const contactList = updatedMessages.contact.chat;
    const contactIndex = contactList.findIndex((c: any) => c.id === chat.id);

    if (contactIndex !== -1) {
      contactList[contactIndex].unSeenMsgs = 0;
      updateStoredUnreadCounts(chat.id, 0); // Also clear unread count in localStorage
    }

    return updatedMessages;
  });
  };

  return (<>
    {hasPermission(PermissionsEnum.INBOX_READ_ALL_CHATS) &&
      fetchingAllChat ? <CustomSpinner /> : <Box
        className="app-chat"
        sx={{
          width: '100%',
          height: '90vh',
          display: 'flex',
          borderRadius: 1,
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: 'background.paper',
          boxShadow: skin === 'bordered' ? 0 : 6,
          ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` }),
        }}
      >

      <SidebarLeft
        store={store}
        hidden={hidden}
        mdAbove={mdAbove}
        messages={messages}
        dispatch={dispatch}
        statusObj={statusObj}
        userStatus={userStatus}
        selectedChat={selectedChat}
        handleSelectChat={handleSelectChat}
        getInitials={getInitials}
        sidebarWidth={sidebarWidth}
        setUserStatus={setUserStatus}
        leftSidebarOpen={leftSidebarOpen}
        removeSelectedChat={removeSelectedChat}
        userProfileLeftOpen={userProfileLeftOpen}
        formatDateToMonthShort={formatDateToMonthShort}
        handleLeftSidebarToggle={() => setLeftSidebarOpen(!leftSidebarOpen)}
        handleUserProfileLeftSidebarToggle={() => setUserProfileLeftOpen(!userProfileLeftOpen)}
      />
      {/* @ts-ignore */}
      <ChatContent
        store={store}
        hidden={hidden}
        sendMsg={sendMsg}
        mdAbove={mdAbove}
        dispatch={dispatch}
        statusObj={statusObj}
        getInitials={getInitials}
        sidebarWidth={sidebarWidth}
        userProfileRightOpen={userProfileRightOpen}
        handleLeftSidebarToggle={() => setLeftSidebarOpen(!leftSidebarOpen)}
        handleUserProfileRightSidebarToggle={() => setUserProfileRightOpen(!userProfileRightOpen)}
        messages={messages}
        selectedChat={selectedChat}
        showTempSelectBox={showTempSelectBox}
        showAddMessageBox={showAddMessageBox}
      />

    </Box>
    }
  </>
  );
};

AppChat.authProps = {
  allowedRoles: [],  // Roles allowed to access this page
  allowedPermission: [PermissionsEnum.INBOX_READ_ALL_CHATS, PermissionsEnum.INBOX_MODULE]// Permissions required
}

AppChat.contentHeightFixed = true;

export default AppChat;