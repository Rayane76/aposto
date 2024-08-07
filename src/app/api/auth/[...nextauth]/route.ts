import { NextRequest, NextResponse } from 'next/server';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import { compareSync } from 'bcrypt-ts';

async function login(credentials: { username: string; password: string }) {
    try {
        const prisma = new PrismaClient();
        const admin = await prisma.admin.findFirst({
            where: {
                username: credentials.username
            }
        });

        await prisma.$disconnect();

        if (admin) {
            const isCorrect = compareSync(credentials.password, admin.password);
            if (isCorrect) {
                return { id: admin.id };
            } else {
                console.log("wrong password");
                return null;
            }
        } else {
            console.log("wrong credentials");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

const authOptions: AuthOptions = {
    pages: {
        signIn: "/loginAdmin"
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                if (!credentials) return null;
                try {
                    const user = await login(credentials as { username: string; password: string });
                    if (user) {
                        return user;
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.log(error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (token) {
                session.user.id = token.id;
            }
            return session;
        }
    }
};


const handler = NextAuth(authOptions);


export { handler as GET, handler as POST }