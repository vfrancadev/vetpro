"use server"

import prisma from "@/lib/prisma"

export async function getAllServices({ userId }: { userId: string }) {

    if (!userId) {
        return{
            error: "Falha ao obter os serviços. Usuário não autenticado."
        }
    }
    try{
        const services = await prisma.service.findMany({
            where: {
                userId: userId,
                status: true
            }
        })
        return{

            data: services
        }
    } catch (error) {
        return{
            error: "Erro ao obter os serviços."
        }
    }
}