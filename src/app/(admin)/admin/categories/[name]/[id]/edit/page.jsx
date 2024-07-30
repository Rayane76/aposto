import { PrismaClient } from '@prisma/client'
import EditCategoriePage from './EditCategoriePage';

const prisma = new PrismaClient()


async function getCategorie(id) {
    const res = await prisma.categorie.findUnique({
        where: {
          id: id
        },
        select: {
            image: true,
            hide: true,
        }
    });

    return res;
}

export default async function EditCategorie({ params }) {

    const categorie = await getCategorie(params.id)
    .finally(async ()=> {
        await prisma.$disconnect();
    })


    return(
         <EditCategoriePage catImage={categorie.image} catHide={categorie.hide} name={params.name} id={params.id} />
    )
}