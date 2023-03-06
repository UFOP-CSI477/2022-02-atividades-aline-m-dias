import { prisma } from "../../database/client.js"; 

export class CreatePessoasController {

    async handle(request, response) {

        const { nome, rua, numero, complemento, documento, cidade_id, tipo_id,} = request.body;

        const pessoas = await prisma.pessoas.create({

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