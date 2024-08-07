'use server'
import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'





export async function createArticle(article,name,id) {
    const prisma = new PrismaClient()
    await prisma.article.create({
        data: article
    }).finally(async () => {
        await prisma.$disconnect();
    })

    revalidatePath('/(user)', 'layout');
    revalidatePath('/(admin)/admin', 'layout');
}