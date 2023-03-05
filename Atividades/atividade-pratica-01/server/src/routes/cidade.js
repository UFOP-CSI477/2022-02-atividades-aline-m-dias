import { Router } from "express";

import { GetAllCidadeController } from "../controller/cidades/GetAllCidadeController.js";
import { CreateCidadeController } from "../controller/cidades/CreateCidadeController.js";

const cidadeRouter = Router();

const getAllCidadeController = new GetAllCidadeController();
const createCidadeController = new CreateCidadeController();


// Get All 
cidadeRouter.get('/cidades', getAllCidadeController.handle);
// Create - Post
cidadeRouter.post('/cidades',createCidadeController.handle);

export {cidadeRouter}