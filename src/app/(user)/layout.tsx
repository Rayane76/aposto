import type { Metadata } from "next";
import localFont from 'next/font/local'
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/navbar/Navbar";
import { PrismaClient } from '@prisma/client'
import { Analytics } from "@vercel/analytics/react"


const prisma = new PrismaClient()


interface Category {
  id: string;
  name: string;
}[]


const myFont = localFont({ src: "../fonts/TT Norms Pro Regular.otf" })


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

export const metadata: Metadata = {
  title: {
    default: "Aposto",
    template: "%s - Aposto"
  },
  description: "Découvrez Aposto, votre boutique en ligne en Algérie spécialisée dans la vente de vêtements tendance et de haute qualité. Trouvez les dernières collections à des prix abordables et profitez d'une expérience de shopping exceptionnelle.",
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
      <body style={{overflowX:"hidden"}} className={myFont.className}>
        <Navbar categories={categories} />
        {children}
        <Analytics />
        </body>
    </html>
  );
}