import { Router } from 'express'; 
import User from '../../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
const router = Router();

router.get('/', (req, res) => {
  res.send('Liste des utilisateurs');
});

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Détails de l'utilisateur avec l'ID ${userId}`);
});

router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    
    const emailRegex = /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send('Format d\'email invalide');
    }
    
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send('Cet email est déjà utilisé');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ firstName, lastName, email, password: hashedPassword });
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la création de l\'utilisateur');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send('Utilisateur non trouvé');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Mot de passe incorrect');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1800s' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la connexion');
  }
});

export default router;
