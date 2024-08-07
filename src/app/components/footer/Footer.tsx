import { MdKeyboardArrowRight } from "react-icons/md";
import "../../styles/footer.css"



export default function Footer(){
    return(
        <footer className="footer">
           <div className="d-flex flex-column d1">
            <h1 className="tTL">APOSTO</h1>
           <p className="desc">Bienvenue chez Aposto! Nous sommes spécialisés dans la vente
             de vêtements de haute qualité conçus pour le confort et le style. Nous nous engageons
             à fournir des solutions vestimentaires haut de gamme pour le marché algérien.
             Rejoignez-nous pour redéfinir le confort avec notre gamme luxueuse de vêtements.</p>
</div>
            <div className="d-flex align-items-center flex-column d2">
           <p className="cst">Service Client :</p>
           <p className="nmbr">1212121212</p>
           <p className="flw">Suivez-nous :</p>
           <div className="d-flex icnDv">
            <a href="https://www.instagram.com/aposto_store?igsh=MTA4emVpNXl1cjJmbA==">
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="30px" height="30px"><radialGradient id="yOrnnhliCrdS2gy~4tD8ma" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#fd5"/><stop offset=".328" stopColor="#ff543f"/><stop offset=".348" stopColor="#fc5245"/><stop offset=".504" stopColor="#e64771"/><stop offset=".643" stopColor="#d53e91"/><stop offset=".761" stopColor="#cc39a4"/><stop offset=".841" stopColor="#c837ab"/></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8ma)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"/><radialGradient id="yOrnnhliCrdS2gy~4tD8mb" cx="11.786" cy="5.54" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#4168c9"/><stop offset=".999" stopColor="#4168c9" stopOpacity="0"/></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8mb)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"/><path fill="#fff" d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"/><circle cx="31.5" cy="16.5" r="1.5" fill="#fff"/><path fill="#fff" d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"/></svg>            </a>
           </div>
           </div>
           <div className="d-flex align-items-center flex-column d3">
           <a href="/about-us">
           <p className="lstQst">À propos de nous<MdKeyboardArrowRight /></p>
           </a>
           <a href="/faq">
           <p className="lstQst">FAQ <MdKeyboardArrowRight /></p>
           </a>
           <a href="/delivery-infos">
           <p className="lstQst">Livraison et retours <MdKeyboardArrowRight /></p>
           </a>
           </div>
        </footer>
    )
}