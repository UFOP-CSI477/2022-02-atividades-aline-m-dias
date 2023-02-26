import express from 'express';
import {mainRouter} from './routes/main.js'
// import { GetAllEstadosController } from './controller/estados/GetAllEstadosController.js';

const PORT= 7000;
const app = express();

app.use(express.json ());

app.use(mainRouter);

app.listen(PORT, ( ) => {

    console.log(`[SERVER] Server is running on port ${PORT}`);
});
