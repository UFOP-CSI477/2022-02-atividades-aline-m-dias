import { Router } from "express";

import { GetAllCidadeController } from "../controller/cidades/GetAllCidadeController.js";
import { CreateCidadeController } from "../controller/cidades/CreateCidadeController.js";
import { UpdateCidadeController } from "../controller/cidades/UpdateCidadeController.js";
import { GetByIdCidadeController } from "../controller/cidades/GetByIdCidadeController.js";

const cidadeRouter = Router();

const getAllCidadeController = new GetAllCidadeController();
const createCidadeController = new CreateCidadeController();
const updateCidadeController = new UpdateCidadeController();
const getByIdCidadeController = new GetByIdCidadeController();

cidadeRouter.get('/cidades', getAllCidadeController.handle);
cidadeRouter.post('/cidades',createCidadeController.handle);
cidadeRouter.put('/cidades',updateCidadeController.handle);
cidadeRouter.get('/cidades/:id', getByIdCidadeController.handle);

export {cidadeRouter}