import { PrismaClient } from '@prisma/client'
import EditArticlePage from './EditArticlePage';


const prisma = new PrismaClient()


async function getArticle(id) {
    const res = await prisma.article.findUnique({
        where: {
          id: id
        },
        include: {
            colors: {
                include: {
                    sizes: true
                }
            }
        }
    });

    return res;
}



export default async function ArticlePage({ params }){

    const article = await getArticle(params.articleId)
    .finally(async ()=> {
        await prisma.$disconnect();
    })


    
    return(
        <EditArticlePage article={article} categorieName={decodeURI(params.name)} categorieId={params.id} idArticle={params.articleId} />
    )
}