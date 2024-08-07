import "../../styles/homeCategories.css"
import Image from "next/image";



interface Category {
    id: string;
    name: string;
    image: string;
  }
  
  interface CategoryProps {
    categories: Category[];
  }  

export default function Categ({ categories }: CategoryProps){
    return(
        <div className="cats">
             {categories.map((categorie,index)=>{
                return(
                    <a key={index} href={"/" + categorie.name + "/" + categorie.id} className="categorieDiv">
                      <Image loading="lazy" width={0} height={0} sizes="100vw" alt={categorie.image} src={categorie.image} className="catImage"></Image>
                        <h1 className="title">{categorie.name}</h1>
                        <label className="shop">Shop</label>
                    </a>
                )
             })}
        </div>
    )
}