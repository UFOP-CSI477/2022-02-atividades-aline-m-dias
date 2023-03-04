import { prisma } from "../../database/client.js";

export class GetAllAlunoController {

    async handle(request, response) {

        const alunos = await prisma.aluno.findMany();
        return response.json(alunos);
    
    }

}