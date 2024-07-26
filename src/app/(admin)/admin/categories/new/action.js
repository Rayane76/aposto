'use server'
import { PrismaClient } from '@prisma/client'




export async function createCategorie(categorieNew) {
    console.log(categorieNew);
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
}