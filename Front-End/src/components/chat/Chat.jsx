import  { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Paper, InputBase, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';

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

const MessageItem = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

const MessageText = styled('div')(({ theme }) => ({
  marginRight: theme.spacing(2),
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[200],
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

  const handleDeleteMessage = (index) => {
    const updatedMessages = [...messages];
    updatedMessages.splice(index, 1);
    setMessages(updatedMessages);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <ChatContainer>
      <MessageList>
        {messages.map((message, index) => (
          <MessageItem key={index}>
            <MessageText>{message}</MessageText>
            <IconButton
              color="secondary"
              aria-label="delete message"
              onClick={() => handleDeleteMessage(index)}
            >
              <DeleteIcon fontSize='small' />
            </IconButton>
          </MessageItem>
        ))}
      </MessageList>
      <MessageInputContainer>
        <MessageInput
          placeholder="Comment on a task..."
          value={newMessage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress} // Add event listener for "Enter" key press
        />
        <IconButton color="primary" aria-label="send message" onClick={handleSendMessage}>
          <SendIcon />
        </IconButton>
      </MessageInputContainer>
    </ChatContainer>
  );
};

export default Chat;
