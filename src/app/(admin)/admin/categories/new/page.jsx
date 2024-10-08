'use client'
import { useState } from "react";
import { CldUploadButton } from 'next-cloudinary';
import { useRouter } from "next/navigation";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { createCategorie } from "./action";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';


export default function NewCategorie(){

    const router = useRouter();

    const [categorieNew,setCategorieNew] = useState({
        name: "",
        image: "",
    });

    const handleChangeCategorie = (e)=>{
        setCategorieNew((prev)=>({...prev,[e.target.name]:e.target.value}));
    }

    const handleSubmitCategorie = async ()=> {
        setModalShow(false);
        setModalShowSpinner(true);
        await createCategorie(categorieNew);
        router.push("/admin/categories");
    }

    const handleAddImage = (e)=>{
        if(e.event === 'success'){
            setCategorieNew((prev)=>({...prev,image:e.info.secure_url}));
        }
    }

    const [modalShow, setModalShow] = useState(false);
    const [modalShowSpinner,setModalShowSpinner] = useState(false);




    return(
        <div style={{ width: "100%",  padding: "40px",marginTop:"20px"  }}>
        <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/admin">
          Dashboard
        </Link>
        <Typography color="text.primary">New</Typography>
      </Breadcrumbs>
        
        <form style={{marginTop:"30px",position:"relative" , height:"80vh"}} onSubmit={(e)=>{e.preventDefault();setModalShow(true)}}>
        <label style={{marginBottom:"40px"}}>Enter New Categorie : </label>
        <br></br>
        <label style={{marginBottom:"10px"}}>Name : </label>
        <br></br>
        <input style={{width:"100%",height:"40px",borderRadius:"5px"}} name="name" required onChange={(e)=>handleChangeCategorie(e)}></input>
        <br></br>
        <label style={{marginTop:"50px",marginRight:"20px"}}>Image : </label>
        <CldUploadButton className="btn btn-secondary" required onSuccess={(e)=>handleAddImage(e)} uploadPreset="aposto" />
        <br></br>
        {categorieNew.image != "" && <img src={categorieNew.image} style={{height:"200px",width:"auto",maxWidth:"200px"}}></img>}
        <div style={{display:"flex",justifyContent:"center",marginTop:"200px"}}>
        <Button variant="primary" type="submit">Submit</Button>
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
        {categorieNew.image === "" ? <h4>Please add an image</h4>
        :
        <h4>Create Categorie ?</h4>
        }
      </Modal.Body>
      <Modal.Footer>
        {categorieNew.image !== "" && <Button onClick={()=>handleSubmitCategorie()}>Submit</Button>}
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