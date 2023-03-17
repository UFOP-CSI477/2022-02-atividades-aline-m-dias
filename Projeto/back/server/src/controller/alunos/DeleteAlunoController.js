import { prisma } from "../../database/client.js";

export class DeleteAlunoController {

    async handle(request, response) {

        const { id } = request.body;

        try {
            console.log(request.body);

            const aluno = await prisma.aluno.delete({
                where: {
                    id: parseInt(id)
                }
            });

            response.json(aluno);
        }catch(error) {

            
            console.error(error);
            return response.status(400).json(error);

        }

    }

}