'use server';

import { signIn } from "@/auth";


export const signinWithGoogle  = async () => {
    await signIn("google");
}