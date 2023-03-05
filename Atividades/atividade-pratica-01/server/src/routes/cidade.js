import { Router } from "express";

import { GetAllCidadeController } from "../controller/cidades/GetAllCidadeController.js";
import { CreateCidadeController } from "../controller/cidades/CreateCidadeController.js";
import { UpdateCidadeController } from "../controller/cidades/UpdateCidadeController.js";

const cidadeRouter = Router();

const getAllCidadeController = new GetAllCidadeController();
const createCidadeController = new CreateCidadeController();
const updateCidadeController = new UpdateCidadeController();

cidadeRouter.get('/cidades', getAllCidadeController.handle);
cidadeRouter.post('/cidades',createCidadeController.handle);
cidadeRouter.put('/cidades',updateCidadeController.handle);

export {cidadeRouter}