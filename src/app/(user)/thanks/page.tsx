import Footer from "@/app/components/footer/Footer";


export default function Thanks(){
    return(
        <>
        <div style={{minHeight:"85vh",margin:"10% 10%"}}>
            <h1>Merci pour votre confiance !</h1>

            <h2>Nous vous remercions d'avoir choisi Aposto pour vos achats. Votre commande a été reçue et est en cours de traitement.</h2>

            <h2 style={{marginTop:"30px"}}>Nous vous contacterons</h2>
                        <p>
            Nous vous contacterons dès que possible sur le numéro de mobile que vous nous avez fourni pour la confirmation de votre commande.
</p>

<h2 style={{marginTop:"30px"}}>Besoin d'aide ?</h2>

<p>
Si vous avez des questions ou des préoccupations concernant votre commande, n'hésitez pas à contacter notre service client au numéro : 0676573719.
</p>

<a href="/" style={{marginTop:"30px",textDecoration:"underline",fontSize:"20px"}}>Revenir vers page d'accueil</a>


        </div>
                    <Footer />
                    </>
    )
}