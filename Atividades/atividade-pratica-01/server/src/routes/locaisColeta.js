import { Router } from "express";

import { GetAllLocaisColetaController } from "../controller/locaisColeta/GetAllLocaisColetaController.js";
import { CreateLocaisColetaController } from "../controller/locaisColeta/CreateLocaisColetaController.js";

const locaisColetaRouter = Router();

const getAllLocaisColetaController = new GetAllLocaisColetaController();
const createLocaisColetaController = new CreateLocaisColetaController();

locaisColetaRouter.get('/locaisColeta', getAllLocaisColetaController.handle);
locaisColetaRouter.post('/locaisColeta', createLocaisColetaController.handle);

export {locaisColetaRouter}