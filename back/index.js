import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());

import userRoutes from './src/routes/user.js';
import openaiRoutes from './src/routes/openai.js';

app.use('/user', userRoutes);
app.use('/openai', openaiRoutes);

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
