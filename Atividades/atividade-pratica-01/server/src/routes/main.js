import {Router} from 'express'; 

const mainRouter= Router();

mainRouter.get('/', (request ,response)=>{

    response.status(401).json({message: 'Unauthorized'})
});

mainRouter.get('/admin', (request, response) => {
    
    response.json({
        mensage: "API Server is running"
    });

});

export { mainRouter };
