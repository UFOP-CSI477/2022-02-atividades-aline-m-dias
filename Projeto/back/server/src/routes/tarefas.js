import { Router } from "express";

import { CreateTarefaController } from "../controller/tarefas/CreateTarefaController.js";
import { GetAllTarefaController } from "../controller/tarefas/GetAllTarefaController.js";
import { DeleteTarefaController } from "../controller/tarefas/DeleteTarefaController.js";
import { UpdateTarefaController } from "../controller/tarefas/UpdateTarefaController.js";

const tarefaRouter = Router();

const createTarefaController = new CreateTarefaController();
const getAllTarefaController = new GetAllTarefaController();
const deleteTarefaController = new DeleteTarefaController();
const updateTarefaController = new UpdateTarefaController();

tarefaRouter.post('/tarefas', createTarefaController.handle);
tarefaRouter.get('/tarefas', getAllTarefaController.handle);
tarefaRouter.delete('/tarefas', deleteTarefaController.handle);
tarefaRouter.put('/tarefas', updateTarefaController.handle);


export{tarefaRouter}