import { prisma } from "../../database/client.js"; 

export class DeleteEstadoController{

    async handle(request, response) {
        const estado = await prisma.user.delete({
            where: {
                nome
            },
          })
    }
    
}