import { prisma } from "../../database/client.js";

export class GetAllDoacoesController {
   
    async handle(request, response) {

        const doacoes = await prisma.doacoes.findMany({
            select: {
                id: true,
                pessoa_id: true,
                local_id: true
            }
        });

        return response.json(doacoes);
    }

}