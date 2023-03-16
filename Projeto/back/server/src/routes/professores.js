import { Router } from "express";

import { CreateProfessorController } from "../controller/professores/CreateProfessorController.js";
import { GetAllProfessorController } from "../controller/professores/getAllProfessorController.js";

const professorRouter = Router();

const createProfessorController = new CreateProfessorController();
const getAllProfessorController = new GetAllProfessorController();

professorRouter.post('/professores', createProfessorController.handle);
professorRouter.get('/professores', getAllProfessorController.handle);


export{professorRouter}