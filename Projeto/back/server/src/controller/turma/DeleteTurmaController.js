import { prisma } from "../../database/client.js";

export class DeleteTurmaController {

    async handle(request, response) {

        const { id } = request.body;

        try {
            console.log(request.body);

            const turma = await prisma.turma.delete({
                where: {
                    id: parseInt(id)
                }
            });

            response.json(turma);
        }catch(error) {

            
            console.error(error);
            return response.status(400).json(error);

        }

    }

}