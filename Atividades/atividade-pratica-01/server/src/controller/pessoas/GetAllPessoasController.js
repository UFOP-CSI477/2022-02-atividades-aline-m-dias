import { prisma } from "../../database/client.js";

export class GetAllPessoasController {
   
    async handle(request, response) {

        const pessoas = await prisma.pessoas.findMany({
            select: {
                id: true,
                nome: true,
                rua: true,
                numero: true,
                complemento: true,
                documento:  true,
                cidade_id: true,
                tipo_id: true,
                created_at: true
            }
        });

        return response.json(pessoas);
    }

}