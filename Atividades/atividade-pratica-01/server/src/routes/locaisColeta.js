import { Router } from "express";

import { GetAllLocaisColetaController } from "../controller/locaisColeta/GetAllLocaisColetaController.js";
import { CreateLocaisColetaController } from "../controller/locaisColeta/CreateLocaisColetaController.js";
import { UpdateLocaisColetaController } from "../controller/locaisColeta/UpdateLocaisColetaController.js";
import { DeleteLocaisColetaController } from "../controller/locaisColeta/DeleteLocaisColetaController.js";

const locaisColetaRouter = Router();

const getAllLocaisColetaController = new GetAllLocaisColetaController();
const createLocaisColetaController = new CreateLocaisColetaController();
const updateLocaisColetaController = new UpdateLocaisColetaController();
const deleteLocaisColetaController = new DeleteLocaisColetaController();

locaisColetaRouter.get('/locaisColeta', getAllLocaisColetaController.handle);
locaisColetaRouter.post('/locaisColeta', createLocaisColetaController.handle);
locaisColetaRouter.put('/locaisColeta', updateLocaisColetaController.handle);
locaisColetaRouter.delete('/locaisColeta', deleteLocaisColetaController.handle);

export {locaisColetaRouter}