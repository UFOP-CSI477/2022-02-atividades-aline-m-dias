import express from 'express';
import { mainRouter } from './routes/main.js';
import { alunoRouter } from './routes/alunos.js';

const PORT = 4444;

const app = express();
app.use(express.json());

// Routes:
app.use(mainRouter);
app.use(alunoRouter);

// Server - start/listen
app.listen(PORT, () => {

    console.log(`[SERVER] Server is running on port ${PORT}`);

});