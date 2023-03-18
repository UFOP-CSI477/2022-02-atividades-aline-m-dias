import { prisma } from "../../database/client.js";

export class DeleteTarefaController {

    async handle(request, response) {

        const { id } = request.body;

        try {
            console.log(request.body);

            const tarefa = await prisma.tarefa.delete({
                where: {
                    id: parseInt(id)
                }
            });

            response.json(tarefa);
        }catch(error) {

            
            console.error(error);
            return response.status(400).json(error);

        }

    }

}