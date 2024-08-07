import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default async function sitemap() {

    const articles = await prisma.article.findMany({
        select: {
            id: true,
            name: true,
            updatedAt: true
        }
    })

    const categories = await prisma.categorie.findMany({
        select: {
            id: true,
            name: true,
            updatedAt: true
        }
    })

    const categoriesEntries = categories.map((categorie)=>({
        url: `https://www.aposto.store/${categorie.name}/${categorie.id}`,
        lastModified:  categorie.updatedAt,
        priority: 0.8
    }))

    const articlesEntries = articles.map((article)=> ({
        url: `https://www.aposto.store/article/${article.name}/${article.id}`,
        lastModified: article.updatedAt,
        priority: 0.8
    }))
 

    return [
        {
            url: "https://www.aposto.store",
            priority: 1
        },
        {
            url: "https://www.aposto.store/about-us",
            priority: 0.9
        },
        {
            url: "https://www.aposto.store/delivery-infos",
            priority: 0.9
        },
        {
            url: "https://www.aposto.store/faq",
            priority: 0.9
        },
        {
            url: "https://www.aposto.store/thanks",
            priority: 0.2
        },
        {
            url: "https://www.aposto.store/checkout",
            priority: 0.2
        },
        ...categoriesEntries,
        ...articlesEntries
    ]
}