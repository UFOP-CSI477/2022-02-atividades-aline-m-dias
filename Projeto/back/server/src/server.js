import express from 'express';
import { mainRouter } from './routes/main.js';
import { alunoRouter } from './routes/alunos.js';
import {professorRouter} from './routes/professores.js'
import { disciplinasRouter } from './routes/diciplinas.js';
import { entregasRouter } from './routes/entregas.js';
import { turmaRouter } from './routes/turmas.js';
import { tarefaRouter } from './routes/tarefas.js';
import cors from "cors";

const PORT = 4444;

const app = express();
app.use(express.json());
app.use(cors());

// Routes:
app.use(mainRouter);
app.use(alunoRouter);
app.use(professorRouter);
app.use(disciplinasRouter);
app.use (entregasRouter);
app.use (turmaRouter);
app.use (tarefaRouter);
// Server - start/listen
app.listen(PORT, () => {

    console.log(`[SERVER] Server is running on port ${PORT}`);

});