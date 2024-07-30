import { PrismaClient } from '@prisma/client'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import "../../../../../styles/admin/gender.css"


const prisma = new PrismaClient()



async function getCategorieArticles(id: string) {
    const res = await prisma.article.findMany({
        where: {
          categorieId: id
        },
        select: {
            id: true,
            name: true,
            images: true,
            price: true
        }
    });

    return res;
}





export default async function Categorie({ params }: { params: { name: string , id: string } }){

    const articles = await getCategorieArticles(params.id)
    .finally(async ()=> {
        await prisma.$disconnect();
    })

    return(
        <div style={{width:"100%", padding: "40px",marginTop:"20px" }}>
        <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/admin">
          Dashboard
        </Link>
        <Link underline="hover" color="inherit" href={"/admin/categories"}>
          Categories
        </Link>
        <Typography color="text.primary">{params.name}</Typography>
      </Breadcrumbs>
         <div style={{display:"flex",justifyContent:"space-between",marginTop:"20px"}}>
         <a href={'/admin/categories/' + params.name + '/' + params.id + '/edit'}>Edit Categorie</a>
         <a href={'/admin/categories/' + params.name + '/' + params.id + '/new'}>Add Article</a>
         </div>
         {
          articles.length === 0 ? 
          <div>
          <h2>No Articles yet !</h2>
          </div>
          : 
          <div className="mt-4">
          <div className="allCats">
          {articles.map((article,index)=>{
            return(
              <a
                  key={index}
                  href={"/admin/categories/" + params.name + "/" + params.id + "/article/" + article.name + "/" + article.id }
                >
                  <div className="d-flex flex-column">
                    <img
                      style={{
                        height: "300px",
                        maxWidth: "300px",
                        width: "auto",
                      }}
                      alt="img"
                      src={article.images[0]}
                    ></img>
                     <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
                    <p>{article.name}</p>
                    <p>{article.price}</p>
                    </div>
                  </div>
                </a>
            )
          })
          }
          </div>
          </div>
         }
       </div>
    )
}