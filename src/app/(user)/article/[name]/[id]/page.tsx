import Navbar from "@/app/components/navbar/Navbar"
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

interface Article {
    id: string,
    name: string,
    images: string[],
    price: number,
    colors: Color[]
  }
  
interface Color {
    name: string,
    secName: string,
    isOutColor: boolean,
    sizes: Size[]
}

interface Size {
   name: string,
   isOutSize: boolean,
   colorId: string
}

async function getArticle(id: string): Promise<Article> {
    const res = await prisma.article.findUnique({
        where: {
         id: id
        },
        select: {
            id: true,
            name: true,
            images: true,
            price: true,
            colors: {
                select: {
                    id: true,
                    name: true,
                    secName: true,
                    isOutColor: true,
                    sizes: {
                        select: {
                            name: true,
                            isOutSize: true,
                            colorId: true,
                        }
                    }
                }
            }
        }
    });
  
    if(!res){
      throw new Error("failed to fetch");
    }
  
    return res;
  }


export default async function Article({ params }: { params: { name: string , id: string } }){

    const article = await getArticle(params.id)
    .finally(async ()=> {
        await prisma.$disconnect();
    });

    console.log(article);

    return(
        <div>

        </div>
    )
}