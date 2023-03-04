import { prisma } from '../../database/client.js';

export class GetByIdAlunoController {

    async handle(request, response) {

        const { id } = request.params;

        const aluno= await prisma.aluno.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        return response.json(aluno);

    }

}