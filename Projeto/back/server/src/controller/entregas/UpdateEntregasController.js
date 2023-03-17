import { prisma } from '../../database/client.js';

export class UpdateEntregasController{
    
    async handle(request, response) {

        const { id, notas}= request.body;

        const entrega = await prisma.entregas.update({

            where:{

                id: parseInt (id),

            }, 

            data: {
    
                notas
               
            }
          
        });
     
        response.json(entrega);
    }
 
}


