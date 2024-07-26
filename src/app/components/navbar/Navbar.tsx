'use client'
import "../../styles/navbar.css"
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { HiMenuAlt2 } from "react-icons/hi";
import { PiHandbag } from "react-icons/pi";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';

export default function Navbar() {
    
    

  const [showCart, setShowCart] = useState(false);

  const handleClose = () => setShowCart(false);
  const handleShow = () => setShowCart(true);

  
  const [showMenu, setShowMenu] = useState(false);

  const handleCloseMenu = () => setShowMenu(false);
  const handleShowMenu = () => setShowMenu(true);


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
      <div className="navbar">
        <ul className="navbar__content">
          <li className="navbar__item">
            <a className="navbar__link h5" href="/newArrivals">New Arrivals</a>
          </li>
        </ul>
      </div>



      <Offcanvas placement="end" show={showCart} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><PiHandbag className="icn" /> My Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

        </Offcanvas.Body>
      </Offcanvas>




      <Offcanvas show={showMenu} onHide={handleCloseMenu}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><PiHandbag className="icn me-2" /> PELUCHE</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="menu">
            <li className="menu__item">
            <a className="menu__link with-arrow" href="/newArrivals">
                            New Arrivals
                        </a>
            </li>
            <li>
            <a className="menu__link with-arrow" href="/Men">
                            Men
                        </a>
            </li>
            <li>
            <a className="menu__link with-arrow" href="/Women">
                            Women
                        </a>
            </li>
            <li>
            <a className="menu__link with-arrow" href="/Kids">
                            Kids
                        </a>
            </li>
          </ul>
        </Offcanvas.Body>
        </Offcanvas>
    </div>
  );
}
