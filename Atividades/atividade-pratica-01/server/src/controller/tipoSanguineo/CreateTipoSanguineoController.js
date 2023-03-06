import { prisma } from "../../database/client.js"; 

export class CreateTipoSanguineoController {

    async handle(request, response) {

        const { tipo, fator } = request.body;

        const tipoSanguineo = await prisma.tipoSanguineo.create({

            data: {
                tipo,
                fator
            }

        });

        return response.json(tipoSanguineo);

    }

}