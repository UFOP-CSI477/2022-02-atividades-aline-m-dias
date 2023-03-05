import { prisma } from "../../database/client.js"; 

export class CreateCidadeController {

    async handle(request, response) {

        const { nome, estado_id } = request.body;
       
        const cidade = await prisma.cidade.create({

            data: {
                nome,
                estado: {
                    connect: {
                        id: estado_id
                    }
                }
            }

        });
        console.log(cidade);
        return response.json(cidade);

    }

}