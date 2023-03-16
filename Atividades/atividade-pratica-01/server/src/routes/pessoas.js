import { Router } from "express";

import { GetAllPessoasController } from "../controller/pessoas/GetAllPessoasController.js";
import { CreatePessoasController } from "../controller/pessoas/CreatePessoasController.js";
import { UpdatePessoasController } from "../controller/pessoas/UpdatePessoasController.js";
import { DeletePessoasController } from "../controller/pessoas/DeletePessoasController.js";
import { GetByIdPessoasController } from "../controller/pessoas/GetByIdPessoasController.js";

const pessoasRouter = Router();

const getAllPessoasController = new GetAllPessoasController();
const createPessoasController = new CreatePessoasController();
const updatePessoasController = new UpdatePessoasController();
const deletePessoasController = new DeletePessoasController();
const getByIdPessoasController = new GetByIdPessoasController();


pessoasRouter.get('/pessoas', getAllPessoasController.handle);
pessoasRouter.post('/pessoas', createPessoasController.handle);
pessoasRouter.put('/pessoas', updatePessoasController.handle);
pessoasRouter.delete('/pessoas', deletePessoasController.handle);
pessoasRouter.get('/pessoas/:id', getByIdPessoasController.handle);

export { pessoasRouter }