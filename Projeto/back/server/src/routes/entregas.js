import { Router } from "express";

import { GetAllEntregasController } from "../controller/entregas/GetAllEntregasController.js";
import { CreateEntregasController } from "../controller/entregas/CreateEntregasController.js";
import { UpdateEntregasController } from "../controller/entregas/UpdateEntregasController.js";
import { DeleteEntregasController } from "../controller/entregas/DeleteEntregasController.js";

const entregasRouter = Router();

const getAllEntregasController = new GetAllEntregasController();
const createEntregasController = new CreateEntregasController();
const updateEntregasController = new UpdateEntregasController();
const deleteEntregasController = new DeleteEntregasController();

entregasRouter.get('/entregas', getAllEntregasController.handle);
entregasRouter.post('/entregas', createEntregasController.handle);
entregasRouter.put('/entregas', updateEntregasController.handle);
entregasRouter.delete('/entregas', deleteEntregasController.handle);
export {entregasRouter}