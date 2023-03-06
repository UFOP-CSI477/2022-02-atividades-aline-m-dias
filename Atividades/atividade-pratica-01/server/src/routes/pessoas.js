import { Router } from "express";

import { GetAllPessoasController } from "../controller/pessoas/GetAllPessoasController.js";
import { CreatePessoasController } from "../controller/pessoas/CreatePessoasController.js";

const pessoasRouter = Router();

const getAllPessoasController = new GetAllPessoasController();
const createPessoasController = new CreatePessoasController();


pessoasRouter.get('/pessoas', getAllPessoasController.handle);
pessoasRouter.post('/pessoas', createPessoasController.handle);

export { pessoasRouter }