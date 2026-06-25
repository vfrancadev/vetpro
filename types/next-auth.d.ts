import {DefaultSession} from "next-auth";

declare module "next-auth" {
    interface Session {
        user: User & DefaultSession["user"];    

    }
}


interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
    emailVerified?: null | string | boolean;
    stripe_customer_id?: string;
    times: string[];
    address?: string;
    phone?: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
}