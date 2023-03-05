import { prisma } from '../../database/client.js';

export class GetByIdCidadeController {

    async handle(request, response) {

        const { id } = request.params;

        const estado = await prisma.cidade.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        return response.json(estado);

    }

}