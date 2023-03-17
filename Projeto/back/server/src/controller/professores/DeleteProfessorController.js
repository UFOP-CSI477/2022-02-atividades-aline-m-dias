import { prisma } from "../../database/client.js";

export class DeleteProfessorController {

    async handle(request, response) {

        const { id } = request.body;

        try {
            console.log(request.body);

            const professor = await prisma.professor.delete({
                where: {
                    id: parseInt(id)
                }
            });

            response.json(professor);
        }catch(error) {

            
            console.error(error);
            return response.status(400).json(error);

        }

    }

}