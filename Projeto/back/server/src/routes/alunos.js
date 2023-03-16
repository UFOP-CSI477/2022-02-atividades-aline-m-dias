import { Router } from "express";

import { GetAllAlunoController } from "../controller/alunos/GetAllAlunoController.js";
import { GetByIdAlunoController } from "../controller/alunos/GetByIdAlunoController.js";
import { CreateAlunoController } from "../controller/alunos/CreateAlunoController.js";
import { UpdateAlunoController } from "../controller/alunos/UpdateAlunoController.js";

const alunoRouter = Router();

const getAllAlunoController = new GetAllAlunoController();
const getByIdAlunoController = new GetByIdAlunoController();
const createAlunoController = new CreateAlunoController();
const updateAlunoController = new UpdateAlunoController();


alunoRouter.get('/alunos', getAllAlunoController.handle);
alunoRouter.get('/alunos/:id', getByIdAlunoController.handle);
alunoRouter.post('/alunos', createAlunoController.handle);
alunoRouter.put('/alunos', updateAlunoController.handle);

export{alunoRouter}