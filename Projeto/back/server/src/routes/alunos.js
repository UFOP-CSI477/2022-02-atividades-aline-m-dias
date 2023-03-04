import { Router } from "express";

import { GetAllAlunoController } from "../controller/alunos/GetAllAlunoController.js";
import { GetByIdAlunoController } from "../controller/alunos/GetByIdAlunoController.js";
import { CreateAlunoController } from "../controller/alunos/CreateAlunoController.js";

const alunoRouter = Router();

const getAllAlunoController = new GetAllAlunoController();
const getByIdAlunoController = new GetByIdAlunoController();
const createAlunoController = new CreateAlunoController();
// Get All 
alunoRouter.get('/alunos', getAllAlunoController.handle);

// Get By ID
alunoRouter.get('/alunos/:id', getByIdAlunoController.handle);

// Create - Post
alunoRouter.post('/alunos', createAlunoController.handle);
export{alunoRouter}