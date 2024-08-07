import Footer from "@/app/components/footer/Footer";
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "À propos de nous"
  };


export default function About(){
    return(
        <>
        <div style={{minHeight:"85vh",margin:"5% 10%"}}>
            <h1>À propos de nous</h1>
            <p>Bienvenue chez Aposto, votre boutique en ligne pour des vêtements algériens authentiques et modernes. Fondée avec passion, notre mission est de célébrer la richesse de la mode algérienne en proposant des pièces uniques et de qualité.</p>
            
            <h2 style={{marginTop:"30px"}}>Qui sommes-nous?</h2>
            <p>Aposto est né de l'amour pour la culture algérienne. Nous offrons une sélection de vêtements traditionnels et contemporains, tous soigneusement choisis pour leur qualité et leur style authentique.</p>

            <h2 style={{marginTop:"30px"}}>Nos Valeurs</h2>
            <ul>
                <li style={{listStyle:"outside"}}><label style={{fontWeight:"bold",marginRight:"5px"}}>Authenticité: </label>Fidèles à nos racines culturelles.</li>
                <li style={{listStyle:"outside"}}><label style={{fontWeight:"bold",marginRight:"5px"}}>Qualité: </label>Matériaux et fabrication de haute qualité.</li>
                <li style={{listStyle:"outside"}}><label style={{fontWeight:"bold",marginRight:"5px"}}>Diversité: </label>Une gamme variée de styles.</li>
                <li style={{listStyle:"outside"}}><label style={{fontWeight:"bold",marginRight:"5px"}}>Engagement: </label>Soutien aux artisans locaux et pratiques durables.</li>
            </ul>
        </div>
                    <Footer />
                    </>
    )
}