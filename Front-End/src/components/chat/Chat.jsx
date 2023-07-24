import  { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Paper, InputBase, IconButton, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';
import { motion } from 'framer-motion';

const ChatContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: theme.spacing(2),
  backgroundColor: '#f5f5f5',
}));

const MessageList = styled('div')(({ theme }) => ({
  maxHeight: '40vh',
  overflowY: 'auto',
  padding: theme.spacing(1),
}));

const MessageItem = styled(motion.div)(({ theme, isCurrentUser, isHighlighted }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
  flexDirection: isCurrentUser ? 'row-reverse' : 'row',
  backgroundColor: isCurrentUser ? '#e3f2fd' : isHighlighted ? '#f2f2f2' : '#fff',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
}));

const MessageText = styled('div')(({ theme, isHighlighted, isReply }) => ({
  flex: 1,
  maxWidth: 'calc(100% - 40px)', // Adjust the maximum width here
  wordWrap: 'break-word', // Use word-wrap instead of word-break
  marginRight: theme.spacing(2),
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: isHighlighted ? '#e3f2fd' : '#f2f2f2',
  color: isHighlighted ? '#1e88e5' : theme.palette.text.primary,
  fontSize: isReply ? '0.8rem' : '1rem',
  opacity: isReply ? 0.6 : 1,
}));

const MessageDetails = styled(Typography)(({ theme }) => ({
  fontSize: '0.8rem',
  color: theme.palette.text.secondary,
}));

const MessageInputContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(2),
  backgroundColor: '#fff',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  padding: theme.spacing(1),
}));

const MessageInput = styled(InputBase)(({ theme }) => ({
  flex: 1,
  marginRight: theme.spacing(2),
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
  fontSize: '1rem',
  '&::placeholder': {
    color: theme.palette.text.secondary,
  },
}));

const SendButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const ReplyIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginLeft: theme.spacing(1),
}));

const Chat = () => {
  const user = useSelector((state) => state.user.user);
  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    return storedMessages ? JSON.parse(storedMessages) : [];
  });
  const [newMessage, setNewMessage] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [highlightedMessageId, setHighlightedMessageId] = useState(null);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const isMessageFromCurrentUser = (message) => {
    return user && message.sender === user.username;
  };

  const getFormattedDate = (timestamp) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return messageDate.toLocaleDateString();
    }
  };

  // Function to get unique dates from messages
  const getUniqueDates = () => {
    const uniqueDates = new Set(messages.map((message) => getFormattedDate(message.timestamp)));
    return Array.from(uniqueDates);
  };

  const uniqueDates = getUniqueDates();

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newComment = {
        id: Date.now(),
        text: newMessage,
        timestamp: new Date().toISOString(),
        sender: user.username,
        repliedMessage: replyingTo,
      };

      if (replyingTo) {
        newComment.replyTo = replyingTo.id;
        setHighlightedMessageId(replyingTo.id);
        setReplyingTo(null);
      }

      setMessages([...messages, newComment]);
      setNewMessage('');
    }
  };

  const handleDeleteMessage = (id) => {
    const updatedMessages = messages.filter((message) => message.id !== id);
    setMessages(updatedMessages);
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <ChatContainer>
      {uniqueDates.map((date) => (
        <div key={date}>
          <Typography variant="subtitle1" color="textSecondary">
            {date}
          </Typography>
          <MessageList>
            {messages.map((message) => {
              const messageDate = getFormattedDate(message.timestamp);
              if (messageDate === date) {
                return (
                  <MessageItem
                    key={message.id}
                    isCurrentUser={isMessageFromCurrentUser(message)}
                    isHighlighted={highlightedMessageId === message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div>
                      <div>
                        {message.repliedMessage && (
                          <MessageText isHighlighted={highlightedMessageId === message.repliedMessage.id} isReply>
                            {`Replying to ${message.repliedMessage.sender}: ${message.repliedMessage.text}`}
                          </MessageText>
                        )}
                        <MessageText isHighlighted={highlightedMessageId === message.id}>
                          {message.text}
                        </MessageText>
                      </div>
                      <MessageDetails>
                        {message.sender} - {new Date(message.timestamp).toLocaleTimeString()}
                      </MessageDetails>
                    </div>
                    {!isMessageFromCurrentUser(message) && (
                      <ReplyIconButton
                        color="primary"
                        aria-label="reply to message"
                        onClick={() => setReplyingTo(message)}
                      >
                        <ReplyIcon fontSize="small" />
                      </ReplyIconButton>
                    )}
                    {isMessageFromCurrentUser(message) && (
                      <IconButton
                        color="secondary"
                        aria-label="delete message"
                        onClick={() => handleDeleteMessage(message.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </MessageItem>
                );
              }
              return null;
            })}
          </MessageList>
        </div>
      ))}
      <MessageInputContainer>
        <MessageInput
          placeholder={replyingTo ? `Replying to ${replyingTo.sender}...` : "Comment on a task..."}
          value={newMessage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <SendButton aria-label="send message" onClick={handleSendMessage}>
          <SendIcon />
        </SendButton>
      </MessageInputContainer>
    </ChatContainer>
  );
};

export default Chat;
