'use client'
import "../../styles/navbar.css"
import "../../styles/check.css"
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { HiMenuAlt2 } from "react-icons/hi";
import { PiHandbag } from "react-icons/pi";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState , useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { CiMenuKebab } from "react-icons/ci";



interface Category {
  id: string;
  name: string;
}

interface Props {
  categories: Category[]
}


export default function Navbar({ categories }: Props) {
    
    
  const router = useRouter();

  const [showCart, setShowCart] = useState(false);

  const handleClose = () => setShowCart(false);
  const handleShow = () => setShowCart(true);

  
  const [showMenu, setShowMenu] = useState(false);

  const handleCloseMenu = () => setShowMenu(false);
  const handleShowMenu = () => setShowMenu(true);

  const [articlesCart, setArticlesCart] = useState<any>(null);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]') as any[];
    setArticlesCart(storedCart);
  }, [showCart]);

  const handleDeleteFromCart = (index: number)=> {
    let currentCart = JSON.parse(localStorage.getItem('cart') || '[]') as any[];

    // Remove the article at the specified index
    currentCart.splice(index, 1);

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(currentCart));

    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]') as any[];


    setArticlesCart(storedCart);

  }

  const handleClickBuyNow = () => {
    let prc = 0;
    articlesCart.map((article:any)=>{
     prc = prc + article.price;
    })

    localStorage.setItem("price",JSON.stringify(prc));
    
    setShowCart(false);

    router.push(`/checkout?source=${"cart"}`);
 }




  return (
    <div className="stickyNav">
      <header className="headerNav">
        <div className="headerInnerNav">
          <Container className="container">
            <Row id="row1" className="align-items-center">
              <Col className="col-3 header-col__left">
                <div className="new-header__area -left">
                  <HiMenuAlt2 style={{color:"#946e60"}} onClick={()=>handleShowMenu()} className="new-header__button -menu mlNav--trigger" />
                </div>
              </Col>
              <Col className="col-6 header-col__center">
                <div className="new-header__area -center">
                  <a className="new-header__link -logo" href="/">
                    <img src="/logo.png" style={{objectFit:"cover" , height:"50px",marginTop:"10px"}}></img>
                  </a>
                </div>
              </Col>
              <Col className="col-3 header-col__right">
                <div className="new-header__area -right">
                  <PiHandbag style={{color:"#946e60"}} id="crt" className="icn" onClick={()=>handleShow()}/>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </header>
      <Container className="container">
      <Row className="navbar">
        <ul className="navbar__content">
          {categories.map((categorie,index)=>{
            return(
              <li key={index} className="navbar__item" style={{width:"150px",textAlign:"center"}}>
            <a className="navbar__link h5" href={"/" + categorie.name + "/" + categorie.id}>{categorie.name.toUpperCase()}</a>
          </li>
            )
          })}
        </ul>
      </Row>
      </Container>



      <Offcanvas placement="end" show={showCart} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><PiHandbag className="icn" style={{marginRight:"5px"}} /> Mon Panier</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className="summary__body">
                         <div className="summary__products">
                           {articlesCart === null ? "" : 
                           articlesCart.length === 0 ? "Le panier est vide" :
                            <div>
                            {articlesCart.map((article:any,index:number)=>{
                                return(
                                    <div key={index} className="product">
                               <a className="product__area -image" href={"/article/" + article.name + "/" + article.id}>
                                <img className="articleImg" src={article.image} alt={article.name}></img>
                               </a>
                               <div className="product__area -content">
                                   <h4 className="product__title">{article.name}</h4>
                                   <div className="product__attributes">
                                     <div style={{display:"flex",flexDirection:"row"}}>
                                      <span className="product__attrKey">
                                      Taille:
                                      </span>
                                      <span className="product__attrValue">
                                      {article.size}
                                      </span>
                                      </div>
                                      <div style={{display:"flex",flexDirection:"row"}}>
                                      <span className="product__attrKey">
                                      Couleur:
                                      </span>
                                      <span className="product__attrValue">
                                      {article.color}
                                      </span>
                                      </div>
                                   </div>
                               </div>
                               <div  className="product__area -prices">
                               <span className="product__price">
                               {article.price} DA
                               </span>
                               <MdDelete className="icn mt-4" onClick={()=>handleDeleteFromCart(index)} />
                               </div>
                            </div>
                                )
                            })}
                            <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                           <button onClick={()=>handleClickBuyNow()} className="btn" style={{backgroundColor:"#F1EADA",borderColor:"#946e60",color:"#946e60"}}>Acheter maintenant</button>
                            </div>
                            </div>
                           }
                         </div>
                      </div>
        </Offcanvas.Body>
      </Offcanvas>




      <Offcanvas show={showMenu} onHide={handleCloseMenu}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><CiMenuKebab className="icn me-2" /> APOSTO</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="menu">
            {categories.map((categorie,index)=>{
              return(
                <li key={index} className="menu__item">
                <a className="menu__link with-arrow" href={"/" + categorie.name + "/" + categorie.id}>
                                {categorie.name}
                            </a>
                </li>
              )
            })}
             <li className="menu__item">
                <a className="menu__link with-arrow" href="/about-us">
                        À propos de nous
                            </a>
                </li>
                <li className="menu__item">
                <a className="menu__link with-arrow" href="/faq">
                      FAQ
                            </a>
                </li>
                <li className="menu__item">
                <a className="menu__link with-arrow" href="/delivery-infos">
                Livraison et retours
                </a>
                </li>
          </ul>
        </Offcanvas.Body>
        </Offcanvas>
    </div>
  );
}
