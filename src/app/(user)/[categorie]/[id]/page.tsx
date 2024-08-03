import Navbar from "@/app/components/navbar/Navbar";
import { PrismaClient } from '@prisma/client'
import "../../../styles/oneCategorie.css"
import OneCatPage from "@/app/components/oneCatPage/OneCatPage";


const prisma = new PrismaClient()


interface Article {
  id: string,
  name: string,
  images: string[],
  price: number,
  colors: Color[]
}[]

interface Color {
    name: string,
    secName: string,
    isOutColor: boolean,
}


async function getArticles(id: string): Promise<Article[]> {
    const res = await prisma.article.findMany({
        where: {
         categorieId: id,
        },
        select: {
            id: true,
            name: true,
            images: true,
            price: true,
            isOutArticle: true,
            colors: {
                select: {
                    name: true,
                    secName: true,
                    isOutColor: true,
                }
            }
        }
    });
  
    if(!res){
      throw new Error("failed to fetch");
    }
  
    return res;
  }


  interface Filter {
    name: string,
    secName: string
  }



export default async function OneCategorie({ params }: { params : { categorie: string , id: string } }){

    const articles = await getArticles(params.id)
    .finally(async ()=> {
        await prisma.$disconnect();
    });

    let filteredColors: Filter[] = [];

    articles.map((article)=>{
        article.colors.map((color)=>{
            if(color.isOutColor === false){
            filteredColors.push({name: color.name, secName: color.secName})
            }
        })
    })

    filteredColors = filteredColors.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.name === value.name && t.secName === value.secName
        ))
    );
 

    return(
        <div>
            <OneCatPage articles={articles} clrs={filteredColors} />
        </div>
    )
}