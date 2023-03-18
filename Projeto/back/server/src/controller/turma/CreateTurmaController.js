import { prisma } from "../../database/client.js"; 

export class CreateTurmaController {

    async handle(request, response) {

        const { nome, ano, professor_id } = request.body;

        const turma = await prisma.turma.create({

            data: {
                nome, 
                ano, 
                professor:{
                    connect:{
                        id: professor_id
                    }
                }   
            }
        });
      
        return response.json(turma);

    }

}