import "../../styles/homeCategories.css"



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
                      <img src={categorie.image} className="catImage"></img>
                        <h1 className="title">{categorie.name}</h1>
                        <label className="shop">Shop</label>
                    </a>
                )
             })}
        </div>
    )
}