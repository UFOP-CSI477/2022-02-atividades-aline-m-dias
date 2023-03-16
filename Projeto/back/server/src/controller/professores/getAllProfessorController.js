import { prisma } from "../../database/client.js";

export class GetAllProfessorController {

    async handle(request, response) {

        const professor = await prisma.professor.findMany();
        return response.json(professor);
    
    }

}