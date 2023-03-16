import { Router } from "express";

import { CreateTipoSanguineoController } from "../controller/tipoSanguineo/CreateTipoSanguineoController.js";
import { GetAllTipoSanguineoController } from "../controller/tipoSanguineo/GetAllTipoSanguineoController.js";
import { UpdateTipoSanguineoController } from "../controller/tipoSanguineo/UpdateTipoSanguineoController.js";
import { DeleteTipoSanguineoController } from "../controller/tipoSanguineo/DeleteTipoSanguineoController.js";

const tipoSanguineoRouter = Router();

const  createTipoSanguineoController = new CreateTipoSanguineoController();
const  getAllTipoSanguineoController = new GetAllTipoSanguineoController();
const  updateTipoSanguineoController = new UpdateTipoSanguineoController();
const deleteTipoSanguineoController = new DeleteTipoSanguineoController();

tipoSanguineoRouter.get('/tipoSanguineo', getAllTipoSanguineoController.handle);
tipoSanguineoRouter.post('/tipoSanguineo', createTipoSanguineoController.handle);
tipoSanguineoRouter.put('/tipoSanguineo', updateTipoSanguineoController.handle);
tipoSanguineoRouter.delete('/tipoSanguineo', deleteTipoSanguineoController.handle);

export {tipoSanguineoRouter}