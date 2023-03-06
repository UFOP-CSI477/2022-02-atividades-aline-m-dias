import { Router } from "express";

import { CreateTipoSanguineoController } from "../controller/tipoSanguineo/CreateTipoSanguineoController.js";
import { GetAllTipoSanguineoController } from "../controller/tipoSanguineo/GetAllTipoSanguineoController.js";

const tipoSanguineoRouter = Router();

const  createTipoSanguineoController = new CreateTipoSanguineoController();
const getAllTipoSanguineoController = new GetAllTipoSanguineoController();

tipoSanguineoRouter.get('/tipoSanguineo', getAllTipoSanguineoController.handle)
tipoSanguineoRouter.post('/tipoSanguineo', createTipoSanguineoController.handle);


export {tipoSanguineoRouter}