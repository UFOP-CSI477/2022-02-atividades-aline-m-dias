import { prisma } from "../../database/client.js";

export class GetAllLocaisColetaController {
   
    async handle(request, response) {


        const locaisColeta = await prisma.locaisColeta.findMany({
            select: {
                id: true,
                nome: true,
                rua: true,
                numero: true,
                complemento: true,
                cidade:  true,
                created_at: true
            }
        });

        return response.json(locaisColeta);
    }

}