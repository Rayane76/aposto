'use server'
import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'





export async function updateArticle(editArtcl,createClr,deleteClr,modifyClr,modifySz) {
    const prisma = new PrismaClient()

    if(editArtcl !== undefined){
        const { articleId, ...restOfChanges } = editArtcl;

        await prisma.article.update({
            where: { 
                id: articleId
            },
            data: restOfChanges
        })
    }

    if(createClr !== undefined){
        for (let index = 0; index < createClr.length; index++) {
            await prisma.color.create({
                data: createClr[index]
            })
        }
    }

    if(deleteClr !== undefined){
        for (let index = 0; index < deleteClr.length; index++) {
            await prisma.color.delete({
                where: {
                    id: deleteClr[index]
                }
            })
        }
    }

    if(modifyClr !== undefined){
        for (let index = 0; index < modifyClr.length; index++) {
            await prisma.color.update({
                where: {
                    id: modifyClr[index].id
                },
                data: {
                    isOutColor: modifyClr[index].value
                }
            })
        }
    }

    if(modifySz !== undefined){
        for (let index = 0; index < modifySz.length; index++) {
            await prisma.size.update({
                where: {
                    id: modifySz[index].id
                },
                data: {
                    isOutSize: modifySz[index].value
                }
            })
        }
    }



     await prisma.$disconnect();

     revalidatePath('/(user)', 'layout');
     revalidatePath('/(admin)/admin', 'layout');

}

export async function deleteArticle(id){
  
    const prisma = new PrismaClient()

    await prisma.color.deleteMany({
        where: {
            articleId: id
        }
    })

    await prisma.article.delete({
        where: {
            id: id
        }
    })

    await prisma.$disconnect();

    revalidatePath('/(user)', 'layout');
    revalidatePath('/(admin)/admin', 'layout');
}