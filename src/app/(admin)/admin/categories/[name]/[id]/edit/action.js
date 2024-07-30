'use server'
import { PrismaClient } from '@prisma/client'




export async function editCategorie(changes , id) {
    const prisma = new PrismaClient()
    await prisma.categorie.update({
        where: { id },
        data: changes
    })
    .finally(async () => {
        await prisma.$disconnect();
    })
}