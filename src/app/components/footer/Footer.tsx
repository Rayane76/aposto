import { IoLogoInstagram } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa6";
import "../../styles/footer.css"



export default function Footer(){
    return(
        <footer className="footer">
           <div className="d-flex flex-column d1">
            <h1 className="tTL">APOSTO</h1>
           <p className="desc">Bienvenue chez Aposto! Nous sommes spécialisés dans la création
             de vêtements de haute qualité conçus pour le confort et le style. Nous nous engageons
             à fournir des solutions vestimentaires haut de gamme pour les marchés domestiques et
             internationaux. Rejoignez-nous pour redéfinir le confort avec notre gamme luxueuse de vêtements.</p>
</div>
            <div className="d-flex align-items-center flex-column d2">
           <p className="cst">Customer service :</p>
           <p className="nmbr">1212121212</p>
           <p className="flw">Follow us :</p>
           <div className="d-flex icnDv">
            <a href="https://www.instagram.com/peluche.homeslippers?igsh=MXdtOGNtNXZ4cTl2bQ==">
            <IoLogoInstagram className="icnFtr"/>
            </a>
           </div>
           </div>
           <div className="d-flex align-items-center flex-column d3">
           <a href="/aboutUs">
           <p className="lstQst">About us <MdKeyboardArrowRight /></p>
           </a>
           <a href="/faq">
           <p className="lstQst">FAQ <MdKeyboardArrowRight /></p>
           </a>
           <a href="/deliveryInfos">
           <p className="lstQst">Delivery and Return Informations <MdKeyboardArrowRight /></p>
           </a>
           </div>
        </footer>
    )
}