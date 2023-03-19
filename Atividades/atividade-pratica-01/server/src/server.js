import express from 'express';
import { mainRouter } from './routes/main.js';
import { estadoRouter } from './routes/estado.js';
import { cidadeRouter } from './routes/cidade.js';
import { locaisColetaRouter } from './routes/locaisColeta.js';
import { tipoSanguineoRouter } from './routes/tipoSanguineo.js';
import { pessoasRouter } from './routes/pessoas.js';
import { doacoesRouter } from './routes/doacoes.js';
import cors from "cors";

const PORT = 3333;

const app = express();
app.use(express.json());
app.use(cors());

// Routes:
app.use(mainRouter);
app.use(estadoRouter);
app.use(cidadeRouter);
app.use(locaisColetaRouter);
app.use (tipoSanguineoRouter);
app.use (pessoasRouter);
app.use(doacoesRouter);

// Server - start/listen
app.listen(PORT, () => {

    console.log(`[SERVER] Server is running on port ${PORT}`);

});