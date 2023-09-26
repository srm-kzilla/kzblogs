import type { Account, NextAuthOptions, Profile } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import { GoogleProfile } from "next-auth/providers/google";

export const options: NextAuthOptions={
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
              }
        }),
    ],
    pages:{
        signIn:"/auth/signin"
    }
}

