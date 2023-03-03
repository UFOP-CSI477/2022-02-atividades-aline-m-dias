import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/index.js";
import { prisma } from "../../database/client.js"; 

export class DeleteEstadoController{

    async handle(request, response) {

         //recuperar os dados
        const {id} = request.body; 
        try{
           
           
            console.log(request.body);

            const estado = await prisma.estado.delete({

            where: {
                id: parseInt(id)
            },

         }catch (error) {
            if (error.code === "P2025" && error instanceof  PrismaClientKnownRequestError){
                return response.status(400).json({ message: `[DeleteEstadoController] Estado id: id não existe`});
            }
         } else{
            return response.status(500).json({ message: "error"});
         }
        
        
          response.json(estado);
    }
    
}