import { prisma } from "../../database/client.js"; 

export class CreateAlunoController {

    async handle(request, response) {

        const { nome, matricula, dataNascimento, email, endereco, turma_id } = request.body;

        // validacoes
        if ( nome === "" ) {
            return response.status(400).json({
                message: "Dados incompletos. Informe o  seu nome"
            });
        }
        // sanitizacao

        const aluno = await prisma.aluno.create({

            data: {
                nome, 
                matricula, 
                dataNascimento, 
                email, 
                endereco, 
                turma_id
            }

        });

        console.log(aluno);
        return response.json(aluno);

    }

}