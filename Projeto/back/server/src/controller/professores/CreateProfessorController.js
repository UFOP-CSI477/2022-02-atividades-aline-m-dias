import { prisma } from "../../database/client.js"; 

export class CreateProfessorController {

    async handle(request, response) {

        const { nome, email } = request.body;

        const professor = await prisma.professor.create({

            data: {
                nome, 
                email    
            }
        });
      
        return response.json(professor);

    }

}