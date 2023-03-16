import { prisma } from "../../database/client.js"; 

export class CreateDoacoesController {

    async handle(request, response) {

        const {pessoa_id, local_id} = request.body;

        const doacoes = await prisma.doacoes.create({

            data: {
                pessoas: {
                    connect: {
                        id: {
                                select: {
                                id: pessoa_id
                            }

                        }
                    }
                },
                locaiscoleta: {
                    connect: {
                        id: {
                            select: {
                            id: local_id
                        }

                    }
                    }
                }
            }
            
                
            

        });

        console.log(doacoes);
        return response.json(doacoes);

    }

}