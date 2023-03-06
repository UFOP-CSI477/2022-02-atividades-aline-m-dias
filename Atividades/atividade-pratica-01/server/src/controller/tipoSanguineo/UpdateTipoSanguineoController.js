import { prisma } from "../../database/client.js"; 

export class UpdateTipoSanguineoController {

    async handle(request, response) {

        const { id, tipo, fator } = request.body;

        const tipoSanguineo = await prisma.tipoSanguineo.update({

            where:{
                id: parseInt (id)
            }, 

            data: {
                tipo, 
                fator
            }

        });

        return response.json(tipoSanguineo);

    }

}