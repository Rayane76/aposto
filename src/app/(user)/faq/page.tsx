import Footer from "@/app/components/footer/Footer";
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "FAQ"
  };

export default function Faq(){
    return(
        <>
        <div style={{minHeight:"85vh",margin:"5% 10%"}}>
            <h1>FAQ</h1>

            <h2>Comment passer une commande ?</h2>

            <ol>
                <li style={{listStyleType:"decimal"}}>Parcourez notre catalogue et sélectionnez vos articles préférés.                </li>
                <li style={{listStyleType:"decimal"}}>Ajoutez-les à votre panier ou bien cliquez sur acheter maintenant                </li>
                <li style={{listStyleType:"decimal"}}>Finalisez votre commande en suivant les instructions sur la page d'achat.                </li>
            </ol>
            
            <h2 style={{marginTop:"30px"}}>Quels modes de paiement acceptez-vous ?</h2>
            <p>
            Nous acceptons uniquement les paiements en main propre par l'intermédiaire du livreur.
                        </p>

            <h2 style={{marginTop:"30px"}}>Quels sont les délais de livraison ?            </h2>
            <p>
            Les délais de livraison varient selon votre emplacement. En général, les commandes sont livrées sous 2 à 3 jours ouvrables.
</p>
 

           <h2 style={{marginTop:"30px"}}>Comment puis-je contacter le service client ?</h2>

           <p>Pour toute question ou assistance, veuillez nous contacter via le numéro suivant : 0676573719</p>

            
        </div>
                    <Footer />
                    </>
    )
}