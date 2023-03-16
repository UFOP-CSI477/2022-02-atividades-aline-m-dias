import { prisma } from '../../database/client.js';

export class UpdateProfessorController{
    
    async handle(request, response) {

        const {id, nome,  email} = request.body;

        const professor = await prisma.professor.update({

            where:{

                id: parseInt (id),
            }, 

            data: {
                nome, 
                email
            }
          
        });
    
        response.json(professor);
    }
 
}


