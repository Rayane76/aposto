'use server'
import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'




export async function editCategorie(changes , id) {
    const prisma = new PrismaClient()
    await prisma.categorie.update({
        where: { id },
        data: changes
    })
    .finally(async () => {
        await prisma.$disconnect();
    })

    revalidatePath('/(user)', 'layout');
    revalidatePath('/(admin)/admin', 'layout');
}

export async function deleteCategorie(id) {
    const prisma = new PrismaClient()

    const articles = await prisma.article.findMany({
        where: {
            categorieId: id
        }
    });

    for (let index = 0; index < articles.length; index++) {
        await prisma.color.deleteMany({
            where: {
                articleId: articles[index].id
            }
        })        
    }
    
    await prisma.article.deleteMany({
        where: {
            categorieId: id
        }
    });

    await prisma.categorie.delete({
        where: { 
            id: id 
        },
    });

    revalidatePath('/(user)', 'layout');
    revalidatePath('/(admin)/admin', 'layout');


    await prisma.$disconnect();
}

