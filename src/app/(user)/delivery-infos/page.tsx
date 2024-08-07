import Footer from "@/app/components/footer/Footer";
import type { Metadata } from "next";



export const metadata: Metadata = {
    title: "Livraison et retours"
  };

export default function Delivery(){
    return(
        <>
        <div style={{minHeight:"85vh",margin:"5% 10%"}}>
            <h1>Livraison et retours</h1>
            
            <h2>Livraison</h2>

            <h2 style={{marginTop:"30px"}}>Délais de Livraison</h2>
            <p>
            Les délais de livraison varient selon votre emplacement. En général, les commandes sont livrées sous 2 à 3 jours ouvrables.
</p>

<h2 style={{marginTop:"30px"}}>Frais de Livraison</h2>

<p>
            Les frais de livraison varient selon votre emplacement. Vous pouvez consulter les prix en choisissant votre wilaya sur la page d'achat.
</p>

<h2 style={{marginTop:"30px"}}>Retours et Échanges</h2>

<h2>Politique de Retour</h2>

<p>Vous pouvez retourner ou échanger un article dans les 7 jours suivant la réception.</p>

<h2 style={{marginTop:"30px"}}>Conditions de Retour</h2>

<ul>
    <li style={{listStyle:"outside"}}>Les articles doivent être dans leur état d'origine, non portés et non lavés.    </li>
    <li style={{listStyle:"outside"}}>Les articles en solde ne sont pas éligibles pour un retour.    </li>
</ul>

<h2 style={{marginTop:"30px"}}>Procédure de Retour</h2>

<ol>
                <li style={{listStyleType:"decimal"}}>Contactez notre service client au 0676573719 pour initier le retour.                </li>
                <li style={{listStyleType:"decimal"}}>Emballez les articles et envoyez-les à l'adresse indiquée par notre service client.                </li>
                <li style={{listStyleType:"decimal"}}>Une fois reçus, nous traiterons votre retour et vous rembourserons sous 7 jours ouvrables.                </li>
            </ol>
            
        </div>
                    <Footer />
                    </>
    )
}