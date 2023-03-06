import { prisma } from "../../database/client.js"; 

export class UpdatePessoasController {

    async handle(request, response) {

        const { id, nome, rua, numero, complemento, documento, cidade_id, tipo_id,} = request.body;

        const pessoas = await prisma.pessoas.update({

            where:{
                id: parseInt (id)
            }, 

            data: {
                nome,
                rua,
                numero,
                complemento,
                documento,
                cidade: {
                    connect: {
                        id: cidade_id
                    }
                },
                tipo: {
                    connect: {
                        id: tipo_id
                    }
                }
            }

        });

        return response.json(pessoas);

    }

}