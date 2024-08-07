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
        url: `${process.env.WEBSITE_URL}/${categorie.name}/${categorie.id}`,
        lastModified:  categorie.updatedAt,
        priority: 0.8
    }))

    const articlesEntries = articles.map((article)=> ({
        url: `${process.env.WEBSITE_URL}/article/${article.name}/${article.id}`,
        lastModified: article.updatedAt,
        priority: 0.8
    }))
 

    return [
        {
            url: `${process.env.WEBSITE_URL}`,
            priority: 1
        },
        {
            url: `${process.env.WEBSITE_URL}/checkout`,
            priority: 0.2
        },
        {
            url: `${process.env.WEBSITE_URL}/about-us`,
            priority: 0.9
        },
        {
            url: `${process.env.WEBSITE_URL}/delivery-infos`,
            priority: 0.9
        },
        {
            url: `${process.env.WEBSITE_URL}/faq`,
            priority: 0.9
        },
        {
            url: `${process.env.WEBSITE_URL}/thanks`,
            priority: 0.2
        },
        ...categoriesEntries,
        ...articlesEntries

    ]
}