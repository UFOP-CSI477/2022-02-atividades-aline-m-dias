import { prisma } from "../../database/client.js"; 

export class CreateDisciplinasController {

    async handle(request, response) {

        const { nome, cargaHoraria, Universidade, professor_id, tarefa_id }= request.body;

        const disciplina = await prisma.diciplina.create({

            data: {
                nome, 
                cargaHoraria, 
                Universidade,
                professor: {
                        connect: {
                            id: professor_id
                        }
                    },
                
                tarefa_id
            }

        });

   
        return response.json(disciplina);

    

    }
}