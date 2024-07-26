import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()



async function getCategories() {
    const res = await prisma.categorie.findMany({});

    return res;
}



export default async function Categories(){

    const categories = await getCategories()
    .finally(async ()=> {
        await prisma.$disconnect();
    })


    return(
        <div>
          {categories?.length === 0 ?
           "No Categories"
           :
           categories?.map((categorie,index)=>{
            return(
                <a key={index} href={'/admin/categories/' + categorie.name + '/' + categorie.id}>{categorie.name}</a>
            )
           })
          }

          <a href='/admin/categories/new'>Create new categorie</a>
        </div>
    )
}