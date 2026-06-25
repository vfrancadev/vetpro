"use server";
import { auth} from '@/lib/auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache';

const formSchema = z.object({
  serviceId: z.string().min(1, { message: "ID do serviço é obrigatório" }),
  name: z.string().min(1, { message: "Nome é obrigatório  " }),
  price: z.number().min(1, { message: "Preço é obrigatório" }),
durations: z.number(),

})


type FormData = z.infer<typeof formSchema>


export async function updateService(formData: FormData) {

     const session = await auth();
    
         if (!session?.user?.id) {
            return {
                error: "Falha ao atualizar serviço. Usuário não autenticado."
    
            }
        }
    
    
        const schema = formSchema.safeParse(formData);
    
        if (!schema.success) {
            return {
                error: schema.error.issues[0].message
            }
        }

        try{

            const service = await prisma.service.update({
                where: {
                    id: formData.serviceId,
                    userId: session?.user?.id
                },
                data: {
                    name: formData.name,
                    price: formData.price,
                    duration: formData.durations < 30 ? 30 : formData.durations,
                }
            });
                revalidatePath("/dashboard/services");
                return { data: "serviço atualizado com sucesso" };


        }catch(error){
            console.error("Erro ao atualizar serviço:", error);
            return {
                error: "Ocorreu um erro ao atualizar o serviço. Por favor, tente novamente."
            }
        }

    }