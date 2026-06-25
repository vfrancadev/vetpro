"use server";

import {auth} from "@/lib/auth"
import prisma from '@/lib/prisma'
import { revalidatePath } from "next/cache";
import { z } from "zod";



const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome precisa ter no mínimo 3 caracteres" }),
  address: z.string().optional(),
  phone: z.string().optional(),
  status: z.boolean(),
  timeZone: z
    .string()
    .min(3, { message: "O fuso horário precisa ter no mínimo 3 caracteres" }),
    times: z.array(z.string()),
});

type FormSchema = z.infer<typeof formSchema>;

export async function updateProfile(formData: FormSchema) {

    const session = await auth();

    if(!session?.user?.id){
        return {
            error: "Usuário não autenticado"
        }
    }


    const schema = formSchema.safeParse(formData);

    if (!schema.success) {
        return{

            error: "preencha todos os campos"
        };
    }
        try{

            await prisma.user.update({
                where: {
                    id: session?.user?.id,
                },
                data: {
                    name: formData.name,
                    address: formData.address,
                    phone: formData.phone,
                    status: formData.status,
                    timeZone: formData.timeZone,
                    times: formData.times || [],
                },
            });

            revalidatePath("/dashboard/profile");

            return {
                data: "Perfil atualizado com sucesso"
            }
        }catch(error){
            console.error("Erro ao atualizar perfil:", error);
            return {
                error: "Ocorreu um erro ao atualizar o perfil"
            }
        }
}