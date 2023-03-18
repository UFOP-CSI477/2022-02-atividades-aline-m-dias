import { Router } from "express";

import { GetAllTurmasController } from "../controller/turma/GetAllTurmasController.js";
import { CreateTurmaController } from "../controller/turma/CreateTurmaController.js";
import { UpdateTurmaController } from "../controller/turma/UpdateTurmaController.js";
import { DeleteTurmaController } from "../controller/turma/DeleteTurmaController.js";

const turmaRouter = Router();

const getAllTurmasController = new GetAllTurmasController();
const createTurmaController = new CreateTurmaController();
const updateTurmaController = new UpdateTurmaController();
const deleteTurmaController = new DeleteTurmaController();

turmaRouter.get('/turmas', getAllTurmasController.handle);
turmaRouter.post('/turmas', createTurmaController.handle);
turmaRouter.put ('/turmas', updateTurmaController.handle);
turmaRouter.delete('/turmas', deleteTurmaController.handle);


export{turmaRouter}