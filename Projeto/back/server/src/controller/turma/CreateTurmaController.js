import { prisma } from "../../database/client.js";

export class GetAllTurmaController {

    async handle(request, response) {

        const turma = await prisma.turma.findMany();
        return response.json(turma);
    
    }

}