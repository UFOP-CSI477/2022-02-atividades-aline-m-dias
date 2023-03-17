import { prisma } from "../../database/client.js";

export class DeleteEntregasController {

    async handle(request, response) {

        const { id } = request.body;

        try {
            console.log(request.body);

            const entrega = await prisma.entregas.delete({
                where: {
                    id: parseInt(id)
                }
            });

            response.json(entrega);
        }catch(error) {

            
            console.error(error);
            return response.status(400).json(error);

        }

    }

}