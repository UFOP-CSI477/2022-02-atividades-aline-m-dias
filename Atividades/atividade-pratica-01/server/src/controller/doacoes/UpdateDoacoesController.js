import { prisma } from '../../database/client.js';

export class UpdateDoacoesController{
    
    async handle(request, response) {

        const {id, pessoa_id, local_id} = request.body;

        const doacoes = await prisma.doacoes.update({
            where:{
                id: parseInt (id)
            }, 

            data: {
                
                pessoas: {
                    connect: {
                        id: pessoa_id
                    }
                },
                locaiscoleta: {
                    connect: {
                        id: local_id
                    }
                }
            }
          
        });
        response.json(doacoes);
    }
 
}
