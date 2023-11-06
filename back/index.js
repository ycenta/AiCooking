import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

import userRoutes from './src/routes/user.js';
import openaiRoutes from './src/routes/openai.js';

app.use('/user', userRoutes);
app.use('/openai', openaiRoutes);

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
