import { prisma } from "../../database/client.js";

export class DeletePessoasController {

    async handle(request, response) {

        const { id } = request.body;

        try {

            const pessoas = await prisma.pessoas.delete({
                where: {
                    id: parseInt(id)
                }
            });

            response.json(pessoas);
        }catch(error) {

            console.error(error);
            return response.status(400).json(error);

        }

    }

}