import Navbar from "@/app/components/navbar/Navbar";
import "../../styles/check.css"
import CheckPage from "@/app/components/checkPage/CheckPage";
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()


interface Wilaya {
    id: string,
    name: string,
    price: number,
    hide: boolean
}[]

async function getWilayas(): Promise<Wilaya[]> {
     const res = await prisma.wilaya.findMany({});

     if(!res){
        throw new Error("failed to fetch");
      }
    
      return res;
}


export default async function Checkout({ searchParams }: { searchParams : { source : string } }){

    const wilayas = await getWilayas()
    .finally(async ()=> {
        await prisma.$disconnect();
    });


    return(
        <div>
           <Navbar />
           <CheckPage source={searchParams.source} wilayas={wilayas} />
        </div>
    )
}