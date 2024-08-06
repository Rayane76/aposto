'use server'
import { PrismaClient } from '@prisma/client'




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
}