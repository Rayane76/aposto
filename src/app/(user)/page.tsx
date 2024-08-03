import Categ from "../components/home/Categ";
import Hero from "../components/home/Hero";
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()


interface Category {
  id: string;
  name: string;
  image: string;
}[]


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

export default async function Home() {

  const categories = await getCategories()
  .finally(async ()=> {
      await prisma.$disconnect();
  })


  return (
    <>
      <Hero />
      <Categ categories={categories} />
    </>
  );
}
