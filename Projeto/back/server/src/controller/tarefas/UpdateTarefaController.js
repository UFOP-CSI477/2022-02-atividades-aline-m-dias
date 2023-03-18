import { prisma } from '../../database/client.js';

export class UpdateTarefaController{
    
    async handle(request, response) {

        const {id, descricao, dataEntrega, turma_id, aluno_id} = request.body;

        const tarefa = await prisma.tarefa.update({

            where:{

                id: parseInt (id),
            }, 

            data: {
                descricao,
                dataEntrega,
                turma: {
                    connect: {
                        id: turma_id
                    }
                },
                aluno: {
                    connect: {
                        id: aluno_id
                    }
                }
            }
          
        });
    
        response.json(tarefa);
    }
 
}


