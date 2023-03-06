import { prisma } from "../../database/client.js";

export class GetAllTipoSanguineoController {
   
    async handle(request, response) {

        const tipo = await prisma.tipoSanguineo.findMany({
            select: {
                tipo: true,
                fator: true
            }
        });

        return response.json(tipo);
    }

}