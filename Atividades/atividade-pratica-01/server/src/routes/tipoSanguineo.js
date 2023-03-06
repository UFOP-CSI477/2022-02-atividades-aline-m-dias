import { Router } from "express";

import { CreateTipoSanguineoController } from "../controller/tipoSanguineo/CreateTipoSanguineoController.js";
import { GetAllTipoSanguineoController } from "../controller/tipoSanguineo/GetAllTipoSanguineoController.js";
import { UpdateTipoSanguineoController } from "../controller/tipoSanguineo/UpdateTipoSanguineoController.js";

const tipoSanguineoRouter = Router();

const  createTipoSanguineoController = new CreateTipoSanguineoController();
const  getAllTipoSanguineoController = new GetAllTipoSanguineoController();
const  updateTipoSanguineoController = new UpdateTipoSanguineoController();

tipoSanguineoRouter.get('/tipoSanguineo', getAllTipoSanguineoController.handle)
tipoSanguineoRouter.post('/tipoSanguineo', createTipoSanguineoController.handle);
tipoSanguineoRouter.put('/tipoSanguineo', updateTipoSanguineoController.handle);


export {tipoSanguineoRouter}