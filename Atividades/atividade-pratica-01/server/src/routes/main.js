import {Router} from 'express'; 
import { GetAllEstadosController } from '../controller/estados/GetAllEstadosController.js';


const mainRouter= Router();
const getAllEstadosController =   new GetAllEstadosController();


mainRouter.get('/', (request ,response)=>{

    response.status(401).json({message: 'Unauthorized'})
});

mainRouter.get('/admin', (request, response) => {

    response.json({
        mensage: "API Server is running"
    });

});

mainRouter.get('/estados', getAllEstadosController.handle);

export { mainRouter };
