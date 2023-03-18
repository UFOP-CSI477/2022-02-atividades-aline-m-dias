import { prisma } from '../../database/client.js';

export class UpdateTurmaController{
    
    async handle(request, response) {

        const {id, nome,  ano, professor_id} = request.body;

        const turma = await prisma.turma.update({

            where:{

                id: parseInt (id),
            }, 

            data: {
                nome, 
                ano,
                professor: {
                    connect: {
                        id: professor_id
                    }
                },
            }
          
        });
    
        response.json(turma);
    }
 
}


