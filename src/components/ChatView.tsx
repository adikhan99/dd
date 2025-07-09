//@ts-nocheck
import React, { useEffect, useState } from 'react';
import fetchChatData from 'src/pages/inbox/index';

export interface Message {
  sender_number: string;
  receiver_number: string;
  message: string;
  time_stamp: string;
}

interface ChatViewProps {
  senderId: string;
  receiverId: string;
}

const ChatView: React.FC<ChatViewProps> = ({ senderId, receiverId }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const loadMessages = async () => {
      const chatData = await fetchChatData();
      setMessages(chatData);
    };

    loadMessages();
  }, [senderId, receiverId]);

  const styles = {
    chatContainer: {
      maxWidth: '600px',
      margin: '20px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '10px',
    },
    chatMessage: {
      padding: '10px',
      borderRadius: '5px',
      maxWidth: '70%',
      wordWrap: 'break-word' as const,
    },
    sentMessageContainer: {
      display: 'flex',
      justifyContent: 'flex-end' as const, // Align sent messages to the right
    },
    receivedMessageContainer: {
      display: 'flex',
      justifyContent: 'flex-start' as const, // Align received messages to the left
    },
    sentMessage: {
      backgroundColor: '#d1f0ff',
    },
    receivedMessage: {
      backgroundColor: '#f1f1f1',
    },
    timestamp: {
      fontSize: '0.8em',
      color: '#777',
      marginTop: '5px',
      textAlign: 'right',
    },
  };

  return (
    <div style={styles.chatContainer}>
      {messages.map((msg, index) => (
        <div
          key={index}
          style={
            msg.sender_number === senderId
              ? styles.sentMessageContainer
              : styles.receivedMessageContainer
          }
        >
          <div
            style={{
              ...styles.chatMessage,
              ...(msg.sender_number === senderId ? styles.sentMessage : styles.receivedMessage),
            }}
          >
            <p>{msg.message}</p>
            <span style={styles.timestamp}>
              {new Date(msg.time_stamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatView;
