import { Router } from "express";

import { GetAllDoacoesController } from "../controller/doacoes/GetAllDoacoesController.js";
import { CreateDoacoesController } from "../controller/doacoes/CreateDoacoesController.js";
import { DeleteDoacoesController } from "../controller/doacoes/DeleteDoacoesController.js";
import { UpdateDoacoesController } from "../controller/doacoes/UpdateDoacoesController.js";

const doacoesRouter = Router();

const  createDoacoesController = new CreateDoacoesController();
const  getAllDoacoesController = new GetAllDoacoesController();
const deleteDoacoesController = new DeleteDoacoesController();
const updateDoacoesController = new UpdateDoacoesController();


doacoesRouter.get('/doacoes', getAllDoacoesController.handle);
doacoesRouter.post('/doacoes', createDoacoesController.handle);
doacoesRouter.delete('/doacoes', deleteDoacoesController.handle);
doacoesRouter.put('/doacoes', updateDoacoesController.handle);


export {doacoesRouter}