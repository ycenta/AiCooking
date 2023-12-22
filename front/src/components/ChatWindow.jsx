// ChatWindow.js
import React, { useState } from 'react';
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

  const handleInputChange = (event) => {
    setUserMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (userMessage.trim() !== '') {
      // Ajouter le message de l'utilisateur à l'historique du chat
      setChatHistory((prevHistory) => [...prevHistory, { user: true, message: userMessage }]);
      
      // TODO: Appeler le service du bot pour obtenir la réponse du bot
      // Simulons une réponse statique pour l'instant
      const botResponse = "Bonjour! Comment puis-je vous aider?";
      
      // Ajouter la réponse du bot à l'historique du chat
      setChatHistory((prevHistory) => [...prevHistory, { user: false, message: botResponse }]);

      // vider l'input après l'envoi du message
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
