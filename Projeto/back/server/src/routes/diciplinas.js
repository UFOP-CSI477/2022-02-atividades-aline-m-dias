import { Router } from "express";

import { GetAllDisciplinasController } from "../controller/diciplinas/GetAllDisciplinasController.js";
import { CreateDisciplinasController } from "../controller/diciplinas/CreateDisciplinasController.js";
import { GetByIdDisciplinasController } from "../controller/diciplinas/GetByIdDisciplinasController.js";
import { UpdateDisciplinasController } from "../controller/diciplinas/UpdateDiscipnasController.js";
import { DeleteDisciplinasController } from "../controller/diciplinas/DeleteDisciplinasController.js";

const disciplinasRouter = Router();


const getAllDisciplinasController = new GetAllDisciplinasController();
const createDisciplinasController = new CreateDisciplinasController();
const getByIdDisciplinasController = new GetByIdDisciplinasController();
const updateDisciplinasController = new UpdateDisciplinasController();
const deleteDisciplinasController = new DeleteDisciplinasController();

disciplinasRouter.get('/disciplinas', getAllDisciplinasController.handle);
disciplinasRouter.post('/disciplinas', createDisciplinasController.handle); 
disciplinasRouter.get('/disciplinas/:id', getByIdDisciplinasController.handle);
disciplinasRouter.put('/disciplinas', updateDisciplinasController.handle);
disciplinasRouter.delete('/disciplinas', deleteDisciplinasController.handle);

export{disciplinasRouter}