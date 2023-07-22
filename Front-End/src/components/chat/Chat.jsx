import  { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Paper, InputBase, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: theme.spacing(2),
}));

const MessageList = styled('div')(({ theme }) => ({
  maxHeight: '70vh',
  overflowY: 'auto',
}));

const MessageInputContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(2),
}));

const MessageInput = styled(InputBase)(({ theme }) => ({
  flex: 1,
  marginRight: theme.spacing(2),
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[200],
}));

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, newMessage]);
      setNewMessage('');
    }
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <ChatContainer>
      <MessageList>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </MessageList>
      <MessageInputContainer>
        <MessageInput
          placeholder="Type your message..."
          value={newMessage}
          onChange={handleInputChange}
        />
        <IconButton color="primary" aria-label="send message" onClick={handleSendMessage}>
          <SendIcon />
        </IconButton>
      </MessageInputContainer>
    </ChatContainer>
  );
};

export default Chat;
