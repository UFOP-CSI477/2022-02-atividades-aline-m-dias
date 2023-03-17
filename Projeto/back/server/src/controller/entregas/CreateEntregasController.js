import { prisma } from "../../database/client.js"; 

export class CreateEntregasController {

    async handle(request, response) {

        const { dataEntrega, notas, aluno_id}= request.body;
      
        const entrega = await prisma.entregas.create({

            data: {
                dataEntrega, 
                notas, 
                aluno: {
                        connect: {
                            id: aluno_id
                        }
                    }
            }

        });

   
        return response.json(entrega);

    

    }
}