import { PrismaClient } from '@prisma/client'
import "../../../../styles/oneArticle.css"
import OneArticlePage from "@/app/components/oneArticlePage/OneArticlePage"
import Footer from "@/app/components/footer/Footer"


export async function generateMetadata({ params }: { params : { name: string , id: string } }){
    return {
     title: decodeURI(params.name),
    }
 }

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

    return(
        <div>
           <OneArticlePage article={article} />
           <Footer />
        </div>
    )
}