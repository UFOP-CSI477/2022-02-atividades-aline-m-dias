import { prisma } from "../../database/client.js"; 

export class CreateCidadeController {

    async handle(request, response) {

        const { nome, estado_id } = request.body;

        // validacoes
        if ( nome === "" ) {
            return response.status(400).json({
                message: "Dados incompletos. Informe o nome e a sigla"
            });
        }
        // sanitizacao

        const cidade = await prisma.cidade.create({

            data: {
                nome,
                sigla
            }

        });

        console.log(cidade);
        return response.json(cidade);

    }

}