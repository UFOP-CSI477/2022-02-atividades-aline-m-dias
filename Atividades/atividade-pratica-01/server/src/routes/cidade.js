import { Router } from "express";

import { GetAllCidadeController } from "../controller/cidades/GetAllCidadeController.js";

const cidadeRouter = Router();
const GetAllCidadeController = new GetAllCidadeController();


// Get All 
estadoRouter.get('/cidades', getAllCidadeController.handle);
