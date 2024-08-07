'use server'
import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'





export async function createCategorie(categorieNew) {
    const prisma = new PrismaClient()
    await prisma.categorie.create({
        data: {
            name: categorieNew.name,
            hide: false,
            image: categorieNew.image,
        }
    }).finally(async () => {
        await prisma.$disconnect();
    })
    revalidatePath('/(user)', 'layout');
    revalidatePath('/(admin)/admin', 'layout');
}