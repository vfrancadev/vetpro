'use server'
import prisma from "@/lib/prisma";

interface GetUserDataProps{
    userId: string;
}


export async function getUserData({ userId }: GetUserDataProps) {

    if (!userId) {
        console.error("User ID is required to fetch user data.");
        return null;
    }


    try{
        const user = await prisma.user.findFirst({
        where: {
            id: userId,
        },
        include: {
            subscription: true,
        }
        });
       if (!user) {
            return null;
        }

        return user;
    }catch(error){
        console.error("Error fetching user data:", error);
        return null;
    }

}