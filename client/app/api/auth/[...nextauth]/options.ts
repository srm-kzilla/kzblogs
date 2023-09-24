import type { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";

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
        // CredentialsProvider({
        //     name:"Credentials",
        //     credentials:{}
        //     },
        //     authorize(Credentials) {
        //         const {username, password } =Credentials as {
        //             username: string;
        //             password: string;
        //         };

        //     },
        // })
    ],
    pages:{
        signIn:"/signin"
    }
}

