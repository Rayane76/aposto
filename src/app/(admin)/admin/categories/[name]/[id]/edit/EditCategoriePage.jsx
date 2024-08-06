'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CldUploadButton } from 'next-cloudinary';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { MdDelete } from "react-icons/md";
import "../../../../../../styles/admin/gender.css"
import Checkbox from '@mui/material/Checkbox';
import _ from 'lodash';
import { deleteCategorie, editCategorie } from "./action";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';




export default function EditCategoriePage({ catImage , catHide , name , id }){

  const router = useRouter();

    const original = {
      name: name,
      image: catImage,
      hide: catHide
    };

    const [modified,setModified] = useState({
      name: name,
      image: catImage,
      hide: catHide
    });

    const handleAddImage = (e)=>{
      if(e.event === 'success'){
          setModified((prev)=>({...prev,image:e.info.secure_url}));
      }
  }

    const handleSubmit = async (e) => {
       e.preventDefault();
       if (!_.isEqual(original, modified)) {
        setModalShow(false);
        setModalShowSpinner(true);
        const changes = _.omitBy(modified, (value, key) => _.isEqual(value, original[key]));
        await editCategorie(changes , id);
       }
       router.push("/admin/categories");

    }

    const [modalShow, setModalShow] = useState(false);
    const [modalShowSpinner,setModalShowSpinner] = useState(false);

    const handleDeleteCategorie = async () => {
       setModalShow(false);
       setModalShowSpinner(true);
       await deleteCategorie(id);
       router.push("/admin/categories");
    }

    
    

    return(
        <div style={{width:"100%", padding: "40px",marginTop:"20px" }}>
        <div className="dv">
        <Breadcrumbs aria-label="breadcrumb">
       <Link underline="hover" color="inherit" href="/admin">
         Dashboard
       </Link>
       <Link underline="hover" color="inherit" href={"/admin/categories"}>
         Categories
       </Link>
       <Link underline="hover" color="inherit" href={"/admin/categories/" + name + "/" + id}>
         {name}
       </Link>
       <Typography color="text.primary">Edit</Typography>
     </Breadcrumbs>
     <button className="btn btn-light" onClick={()=>{setModalShow(true)}}><MdDelete style={{color:"red", height:"30px",width:"30px"}} /></button>
     </div>
        <form style={{marginTop:"40px",minHeight:"80vh",height:"auto",position:"relative"}} onSubmit={(e)=>{handleSubmit(e)}}>
        <label style={{marginBottom:"15px"}}>Categorie Name : </label>
        <br></br>
        <input value={modified.name} onChange={(e)=>setModified((prev)=>({...prev,name:e.target.value}))} style={{width:"100%",height:"30px",marginBottom:"40px"}} id="categorieName"></input>
        <br></br>
        <label style={{marginBottom:"15px"}}>Hide Categorie ? </label>
        <Checkbox checked={modified.hide} onChange={(e)=>setModified((prev)=>({...prev,hide:e.target.checked}))} />
        <br></br>
        <br></br>
        <label style={{marginBottom:"10px"}}>Categorie Image : </label>
        <br></br>
        <img src={modified.image} style={{height:"200px",width:"auto",maxWidth:"200px"}}></img>
        <br></br>
        <label style={{marginTop:"20px",marginRight:"10px"}}>Change Image : </label>
        <CldUploadButton className="btn btn-secondary" onSuccess={(e)=>handleAddImage(e)} uploadPreset="aposto" />   
        <br></br>
        <div style={{position:"absolute",bottom:"10px",display:"flex",justifyContent:"center",width:"100%"}}>
        <Button id="submitNewBtn" type="submit">Update</Button>
        </div>
        </form>




        <Modal
      show={modalShow}
      onHide={() => setModalShow(false)} 
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Delete Categorie ?</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={()=>handleDeleteCategorie()}>Delete</Button>
        <Button variant="secondary" onClick={()=>setModalShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>


    <Modal
      show={modalShowSpinner}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="sm"
    >
      <Modal.Body style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
      </Modal.Body>

    </Modal>
       </div>
    )
}