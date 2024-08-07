'use server'
import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'




export async function updateWilaya(id: string, price:number , hide: boolean) {
    const prisma = new PrismaClient()
    await prisma.wilaya.update({
        where: {
            id: id
        },
        data: {
            price: price,
            hide: hide
        }
    }).finally(async () => {
        await prisma.$disconnect();
    })

    revalidatePath('/(user)/checkout');
    revalidatePath('/(admin)/admin/wilayas');
}