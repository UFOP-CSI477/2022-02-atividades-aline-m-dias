import { prisma } from "../../database/client.js";

export class GetAllDisciplinasController {

    async handle(request, response) {

        const diciplina = await prisma.diciplina.findMany();
        return response.json(diciplina);
    
    }

}