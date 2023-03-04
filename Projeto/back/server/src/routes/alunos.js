import { Router } from "express";

import { GetAllAlunoController } from "../controller/alunos/GetAllAlunoController.js";

const alunoRouter = Router();

const getAllAlunoController = new GetAllAlunoController();

// Get All 
alunoRouter.get('/alunos', getAllAlunoController.handle);

export{alunoRouter}