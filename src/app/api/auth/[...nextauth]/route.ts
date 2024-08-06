import nextAuth, { Session } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from '@prisma/client'
import { compareSync } from "bcrypt-ts";
import { JWT } from "next-auth/jwt";

interface Cred {
    username: string;
    password: string;
}


async function login(credentials: Cred){
    try {

        const prisma = new PrismaClient()

        const admin = await prisma.admin.findFirst({
            where: {
                username: credentials.username
            }
        })

        await prisma.$disconnect();

        if(admin){
            const isCorrect = compareSync(credentials.password,admin.password);
            if(isCorrect){
                return {id: admin.id}
            }
            else{
                console.log("wrong password")
                return
            }
        }
        else{
            console.log("wrong credentials")
            return
        }


    } catch (error) {
         console.log(error);
    
        return
    }
}


export const authOptions = {
    pages:{
        signIn: "/loginAdmin"
       },

    providers: [
        CredentialsProvider({
          name: "credentials",
          credentials: {},
          //@ts-ignore
          async authorize(credentials: Cred){
            try {
                 const user = await login(credentials);
                 if(user){  
                  return user
                 }
                 else{
                    return
                 }
            } catch (error) {
                console.log(error)
                return
            }
          }
        })
    ],

    callbacks:{
        async jwt({token,user}: {token: JWT, 
            user: any}): Promise<JWT>{
            if(user){
                token.id = user.id
            }
            return token;
        },
        async session({session,token}: {session: any, 
            token: JWT}): Promise<Session>{
            if(token){
                session.user.id = token.id
            }
            return session;
        }
    }
    }


const handler = nextAuth(authOptions);

export { handler as GET, handler as POST }