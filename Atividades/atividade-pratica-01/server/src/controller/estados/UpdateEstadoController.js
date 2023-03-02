import { prisma } from '../../database/client.js';

export class UpdateEstadoController{
    
    async handle(request, response) {
        const updateUser = await prisma.user.update({
          
          });
    }
 
}


