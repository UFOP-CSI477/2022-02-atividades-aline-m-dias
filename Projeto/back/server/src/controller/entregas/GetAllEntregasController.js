import { prisma } from "../../database/client.js";

export class GetAllEntregasController {

    async handle(request, response) {

        const entrega = await prisma.entregas.findMany();
        return response.json(entrega);
    
    }

}