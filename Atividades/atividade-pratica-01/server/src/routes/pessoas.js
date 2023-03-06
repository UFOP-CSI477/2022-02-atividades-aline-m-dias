import { Router } from "express";

import { GetAllPessoasController } from "../controller/pessoas/GetAllPessoasController.js";
import { CreatePessoasController } from "../controller/pessoas/CreatePessoasController.js";
import { UpdatePessoasController } from "../controller/pessoas/UpdatePessoasController.js";

const pessoasRouter = Router();

const getAllPessoasController = new GetAllPessoasController();
const createPessoasController = new CreatePessoasController();
const updatePessoasController = new UpdatePessoasController();


pessoasRouter.get('/pessoas', getAllPessoasController.handle);
pessoasRouter.post('/pessoas', createPessoasController.handle);
pessoasRouter.put('/pessoas', updatePessoasController.handle);

export { pessoasRouter }