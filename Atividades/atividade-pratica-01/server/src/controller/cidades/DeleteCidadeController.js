import { prisma } from "../../database/client.js";

export class DeleteCidadeController {

    async handle(request, response) {

        const { id } = request.body;

        try {
            console.log(request.body);

            const cidade = await prisma.cidade.delete({
                where: {
                    id: parseInt(id)
                }
            });

            response.json(cidade);
        }catch(error) {

            
            console.error(error);
            return response.status(400).json(error);

        }

    }

}