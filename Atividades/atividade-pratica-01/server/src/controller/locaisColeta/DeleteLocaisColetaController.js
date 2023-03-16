import { prisma } from "../../database/client.js";

export class DeleteLocaisColetaController {

    async handle(request, response) {

        const { id } = request.body;

        try {

            const local = await prisma.locaisColeta.delete({
                where: {
                    id: parseInt(id)
                }
            });

            response.json(local);
        }catch(error) {

            console.error(error);
            return response.status(400).json(error);

        }

    }

}