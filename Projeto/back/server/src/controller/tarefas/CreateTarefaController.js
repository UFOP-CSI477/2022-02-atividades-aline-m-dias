import { prisma } from "../../database/client.js"; 

export class CreateTarefaController {

    async handle(request, response) {

        const {  descricao, dataEntrega, turma_id, aluno_id} = request.body;

        const tarefa = await prisma.tarefa.create({

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
      
        return response.json(tarefa);

    }

}