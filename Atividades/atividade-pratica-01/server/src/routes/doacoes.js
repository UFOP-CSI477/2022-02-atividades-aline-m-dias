import { Router } from "express";

import { GetAllDoacoesController } from "../controller/doacoes/GetAllDoacoesController.js";
import { CreateDoacoesController } from "../controller/doacoes/CreateDoacoesController.js";

const doacoesRouter = Router();

const  createDoacoesController = new CreateDoacoesController();
const  getAllDoacoesController = new GetAllDoacoesController();


doacoesRouter.get('/doacoes', getAllDoacoesController.handle)
doacoesRouter.post('/doacoes', createDoacoesController.handle);



export {doacoesRouter}