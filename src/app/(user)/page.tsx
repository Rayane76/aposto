import Categ from "../components/home/Categ";
import Hero from "../components/home/Hero";
import { PrismaClient } from '@prisma/client'
import Footer from "../components/footer/Footer";
import NewArrivals from "../components/home/NewArrivals";


const prisma = new PrismaClient()


interface Category {
  id: string;
  name: string;
  image: string;
}[]

interface Article {
  id: string,
  name: string,
  isOutArticle: boolean,
  images: string[],
  price: number,
  colors: Color[]
}[]

interface Color {
    name: string,
    secName: string,
    isOutColor: boolean,
}


async function getCategories(): Promise<Category[]> {
  const res = await prisma.categorie.findMany({
      where: {
       hide: false
      },
      select: {
          id: true,
          name: true,
          image: true
      }
  });

  if(!res){
    throw new Error("failed to fetch");
  }

  return res;
}


async function getArticles(): Promise<Article[]> {
  const res = await prisma.article.findMany({
    where: {
      isOutArticle: false
    },
     orderBy: {
       createdAt: 'desc'
     },
     take: 8,
     include: {
      colors: true
     }
  });

  if(!res){
    throw new Error("failed to fetch");
  }

  return res;
}

export default async function Home() {

  const categories = await getCategories();

  const articles = await getArticles()
  .finally(async ()=> {
      await prisma.$disconnect();
  })

  return (
    <>
      <Hero />
      <Categ categories={categories} />
      <NewArrivals articles={articles} />
      <Footer />
    </>
  );
}
