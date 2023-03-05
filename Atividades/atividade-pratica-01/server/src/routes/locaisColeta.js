import { Router } from "express";

import { GetAllLocaisColetaController } from "../controller/locaisColeta/GetAllLocaisColetaController.js";
import { CreateLocaisColetaController } from "../controller/locaisColeta/CreateLocaisColetaController.js";
import { UpdateLocaisColetaController } from "../controller/locaisColeta/UpdateLocaisColetaController.js";

const locaisColetaRouter = Router();

const getAllLocaisColetaController = new GetAllLocaisColetaController();
const createLocaisColetaController = new CreateLocaisColetaController();
const updateLocaisColetaController = new UpdateLocaisColetaController();

locaisColetaRouter.get('/locaisColeta', getAllLocaisColetaController.handle);
locaisColetaRouter.post('/locaisColeta', createLocaisColetaController.handle);
locaisColetaRouter.put('/locaisColeta', updateLocaisColetaController.handle);

export {locaisColetaRouter}