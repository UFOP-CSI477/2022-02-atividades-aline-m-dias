import { prisma } from "../../database/client.js";

export class DeleteTipoSanguineoController {

    async handle(request, response) {

        const { id } = request.body;

        try {

            const tipo = await prisma.tipoSanguineo.delete({
                where: {
                    id: parseInt(id)
                }
            });

            response.json(tipo);
        }catch(error) {

            console.error(error);
            return response.status(400).json(error);

        }

    }

}