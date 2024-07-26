'use server'
import { PrismaClient } from '@prisma/client'




export async function createArticle(article) {
    const prisma = new PrismaClient()
    await prisma.article.create({
        data: article
    }).finally(async () => {
        await prisma.$disconnect();
    })
}