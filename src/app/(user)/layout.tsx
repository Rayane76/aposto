import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/navbar/Navbar";
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()


interface Category {
  id: string;
  name: string;
}[]


async function getCategories(): Promise<Category[]> {
  const res = await prisma.categorie.findMany({
      where: {
       hide: false
      },
      select: {
          id: true,
          name: true
      }
  });

  if(!res){
    throw new Error("failed to fetch");
  }

  return res;
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const categories = await getCategories()
  .finally(async ()=> {
      await prisma.$disconnect();
  })

  return (
    <html lang="en">
      <body style={{overflowX:"hidden"}} className={inter.className}>
        <Navbar categories={categories} />
        {children}
        </body>
    </html>
  );
}


// #B9907A