import { prisma } from '../../database/client.js';

export class UpdateAlunoController{
    
    async handle(request, response) {

        const {id, nome, matricula, dataNascimento, email, endereco} = request.body;


        const aluno = await prisma.aluno.update({

            where:{

                id: parseInt (id),
            }, 

            data: {
                nome, 
                matricula, 
                dataNascimento, 
                email,
                endereco,
                updated_at: new Date()
            }
          
        });
        console.log(aluno);
        response.json(aluno);
    }
 
}


