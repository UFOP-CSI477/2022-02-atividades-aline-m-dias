import { prisma } from '../../database/client.js';

export class GetByIdDisciplinasController {

    async handle(request, response) {

        const {id, nome, cargaHoraria, Universidade, professor_id, tarefa_id }= request.body;

        const disciplina = await prisma.diciplina.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        return response.json(disciplina);

    }

}