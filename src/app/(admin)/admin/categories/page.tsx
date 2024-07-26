import { PrismaClient } from '@prisma/client'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import "../../../styles/admin/gender.css";


const prisma = new PrismaClient()



async function getCategories() {
    const res = await prisma.categorie.findMany({
        select: {
            id: true,
            name: true,
            image: true
        }
    });

    return res;
}



export default async function Categories(){

    const categories = await getCategories()
    .finally(async ()=> {
        await prisma.$disconnect();
    })

    return(
        <div style={{ width: "100%", padding: "40px",marginTop:"20px" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/admin">
            Dashboard
          </Link>
          <Typography color="text.primary">Categories</Typography>
        </Breadcrumbs>
        <div style={{ display: "flex", justifyContent: "space-between" , marginBottom:"30px",marginTop:"10px" }}>
          <h3>Categories : </h3>
          <a href='/admin/categories/new'>Create new categorie</a>
        </div>
        {categories?.length === 0 ? (
          <h1>No Categories Yet ! </h1>
        ) : (
          <div>
            <div className="allCats">
              {categories.map((categorie, index) => {
                return (
                  <a
                    key={index}
                    href={'/admin/categories/' + categorie.name + '/' + categorie.id}
                     >
                    <div className="d-flex flex-column">
                      <img
                        style={{
                          height: "300px",
                          maxWidth: "300px",
                          width: "auto",
                        }}
                        alt="img"
                        src={categorie.image}
                      ></img>
                      <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                      <p>{categorie.name}</p>
                       </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    )
}