import { prisma } from "../../database/client.js";

export class DeleteDisciplinasController {

    async handle(request, response) {

        const { id } = request.body;

        try {
            console.log(request.body);

            const disciplina = await prisma.diciplina.delete({
                where: {
                    id: parseInt(id)
                }
            });

            response.json(disciplina);
        }catch(error) {

            
            console.error(error);
            return response.status(400).json(error);

        }

    }

}