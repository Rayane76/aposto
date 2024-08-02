import Navbar from "../navbar/Navbar"



interface Category {
   id: string;
   name: string;
   image: string;
 }
 
 interface CategoryProps {
   categories: Category[];
 }

export default function Hero({ categories }: CategoryProps){
     return(
        <section style={{height:"100vh",backgroundColor:"#F1EADA"}}>
           <Navbar />
        </section>
     )
}