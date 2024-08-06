import WilayasPage from '@/app/components/admin/WilayasPage';
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()



interface Wilaya {
    id: string;
    name: string;
    price: number;
    hide: boolean;
  }[]

async function getWilayas(): Promise<Wilaya[]> {
    const res = await prisma.wilaya.findMany({});

    return res;
}


export default async function Wilayas(){

    const wilayas = await getWilayas()
    .finally(async ()=> {
        await prisma.$disconnect();
    })

    return(
        <WilayasPage wilayas={wilayas} />
    )
}