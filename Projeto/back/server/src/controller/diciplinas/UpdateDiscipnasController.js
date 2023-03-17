import { prisma } from '../../database/client.js';

export class UpdateDisciplinasController{
    
    async handle(request, response) {

        const {id, nome, cargaHoraria, Universidade, professor_id, tarefa_id }= request.body;


        const disciplina = await prisma.diciplina.update({

            where:{

                id: parseInt (id),

            }, 

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
     
        response.json(disciplina);
    }
 
}


