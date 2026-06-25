"use server";
import { auth} from '@/lib/auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache';

const formSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório  " }),
  price: z.number().min(1, { message: "Preço é obrigatório" }),
durations: z.number(),

})


type FormData = z.infer<typeof formSchema>

export async function createNewService(formData: FormData) {
     const session = await auth();

     if (!session?.user?.id) {
        return {
            error: "Falha ao cadastrar serviço. Usuário não autenticado."

        }
    }


    const schema = formSchema.safeParse(formData);

    if (!schema.success) {
        return {
            error: schema.error.issues[0].message
        }
    }

    try{

        const newService = await prisma.service.create({
            data: {
                name: formData.name,
                price: formData.price,
                duration: formData.durations,
                userId: session?.user?.id
            }
        });
            revalidatePath("/dashboard/services");

        return { data: newService };

    }catch(error){
        console.error("Erro ao criar serviço:", error);
        return {
            error: "Ocorreu um erro ao criar o serviço. Por favor, tente novamente."
        }
    }
}