import { PrismaClientKnownRequestError } from "@prisma/client/runtime/index.js";
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

            if ( error.code === "P2025" &&
            error instanceof PrismaClientKnownRequestError ) {
                return response.status(400).json({
                    message: `[DeleteEstadoController] Estado id: ${id} não existe.`
                });
            } else {
                return response.status(500).json({
                    message: error,
                    id: id
                });
            }


        }

    }

}