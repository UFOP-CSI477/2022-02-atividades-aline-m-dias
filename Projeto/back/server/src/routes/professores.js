import { Router } from "express";

import { CreateProfessorController } from "../controller/professores/CreateProfessorController.js";
import { GetAllProfessorController } from "../controller/professores/getAllProfessorController.js";
import { UpdateProfessorController } from "../controller/professores/UpdateProfessorController.js";

const professorRouter = Router();

const createProfessorController = new CreateProfessorController();
const getAllProfessorController = new GetAllProfessorController();
const updateProfessorController = new UpdateProfessorController ();

professorRouter.post('/professores', createProfessorController.handle);
professorRouter.get('/professores', getAllProfessorController.handle);
professorRouter.put ('/professores', updateProfessorController.handle)


export{professorRouter}