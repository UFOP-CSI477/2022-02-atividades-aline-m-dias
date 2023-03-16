import { prisma } from "../../database/client.js";

export class DeleteDoacoesController {

    async handle(request, response) {

        const { id } = request.body;

        try {
            console.log(request.body);

            const doacoes = await prisma.doacoes.delete({
                where: {
                    id: parseInt(id)
                }
            });

            response.json(doacoes);
        }catch(error) {

            
            console.error(error);
            return response.status(400).json(error);

        }

    }

}