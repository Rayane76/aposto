'use client'
import "../../styles/admin/navAdmin.css"
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { RxHamburgerMenu } from "react-icons/rx";
import SideBar from "./SideBar";


export default function NavAdmin(){

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return(
        <div className="navAdmin">
           <RxHamburgerMenu onClick={()=>handleShow()} style={{cursor:"pointer", height:"20px",width:"20px",marginLeft:"20px"}}/>

           <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <SideBar cls=""/>
        </Offcanvas.Body>
      </Offcanvas>
        </div>
    )
}