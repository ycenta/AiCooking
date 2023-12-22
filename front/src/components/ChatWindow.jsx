// ChatWindow.js
import { useState, useContext, useEffect } from 'react';
import { OpenAiContext } from '../contexts/api/OpenAiContext';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const ChatWindow = ({ open, onClose }) => {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const { postQuestion, chatBotResponse } = useContext(OpenAiContext);


  useEffect(() => {
    if (chatBotResponse && chatBotResponse.message && chatBotResponse.message.content) {
      const botResponse = chatBotResponse.message.content;
      setChatHistory((prevHistory) => [...prevHistory, { user: false, message: botResponse }]);
    }
  }, [chatBotResponse]);

  const handleInputChange = (event) => {
    setUserMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    if (userMessage.trim() !== '') {
      // Ajouter le message de l'utilisateur à l'historique du chat
      setChatHistory((prevHistory) => [...prevHistory, { user: true, message: userMessage }]);
      
      // Appeler la méthode postQuestion du contexte pour obtenir la réponse du bot
      const response = await postQuestion({
        "message": userMessage
      });
  
      // Vider l'input après l'envoi du message
      setUserMessage('');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Chat avec le bot</DialogTitle>
      <DialogContent dividers>
        <div style={{ maxHeight: 300, overflowY: 'auto' }}>
          {chatHistory.map((entry, index) => (
            <DialogContentText key={index} style={{ color: entry.user ? 'blue' : 'green' }}>
              {entry.message}
            </DialogContentText>
          ))}
        </div>
        <TextField
          autoFocus
          margin="dense"
          id="userMessage"
          label="Votre message"
          type="text"
          fullWidth
          value={userMessage}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fermer
        </Button>
        <Button onClick={handleSendMessage} color="primary">
          Envoyer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChatWindow;
