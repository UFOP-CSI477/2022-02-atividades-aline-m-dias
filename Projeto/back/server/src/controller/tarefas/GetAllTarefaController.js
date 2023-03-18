import { prisma } from "../../database/client.js";

export class GetAllTarefaController {

    async handle(request, response) {

        const tarefa = await prisma.tarefa.findMany();
        return response.json(tarefa);
    
    }

}