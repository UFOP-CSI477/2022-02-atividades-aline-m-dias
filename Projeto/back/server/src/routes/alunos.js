import { Router } from "express";

import { GetAllAlunoController } from "../controller/alunos/GetAllAlunoController.js";
import { GetByIdAlunoController } from "../controller/alunos/GetByIdAlunoController.js";
import { CreateAlunoController } from "../controller/alunos/CreateAlunoController.js";
import { UpdateAlunoController } from "../controller/alunos/UpdateAlunoController.js";
// import {DeleteAlunoController} from "../controller/alunos/DeleteAlunoController.js";

const alunoRouter = Router();

const getAllAlunoController = new GetAllAlunoController();
const getByIdAlunoController = new GetByIdAlunoController();
const createAlunoController = new CreateAlunoController();
const updateAlunoController = new UpdateAlunoController();
// const deleteAlunoController = new DeleteAlunoController();


alunoRouter.get('/alunos', getAllAlunoController.handle);
alunoRouter.get('/alunos/:id', getByIdAlunoController.handle);
alunoRouter.post('/alunos', createAlunoController.handle);
alunoRouter.put('/alunos', updateAlunoController.handle);
// alunoRouter.delete ('/alunos', deleteAlunoController.handle)

export{alunoRouter}