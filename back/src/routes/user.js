// routes/user.js

import { Router } from 'express'; 
const router = Router();

router.get('/', (req, res) => {
  res.send('Liste des utilisateurs');
});

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Détails de l'utilisateur avec l'ID ${userId}`);
});

export default router;
