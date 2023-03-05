import { prisma } from "../../database/client.js"; 

export class UpdateLocaisColetaController {

    async handle(request, response) {

        const { id, nome, rua, numero, complemento, cidade_id } = request.body;

        const locaisColeta = await prisma.locaisColeta.update({

            where:{
                id: parseInt (id)
            }, 

            data: {
                nome,
                rua,
                numero,
                complemento,
                cidade: {
                    connect: {
                        id: cidade_id
                    }
                }
            }

        });

        return response.json(locaisColeta);

    }

}