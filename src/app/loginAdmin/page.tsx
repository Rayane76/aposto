"use client"
import { useState } from "react"
import "../styles/login.css"
import {signIn} from "next-auth/react"
import { useRouter } from "next/navigation"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';



export default function Login(){


    

    const router = useRouter();

    const [info,setInfo] = useState({username:"",password:""})

    const [error,setError] = useState("");

    function handleInput(e:React.ChangeEvent<HTMLInputElement>){
        setInfo((prev)=>({...prev,[e.target.name]:e.target.value}))
    }

    async function handleSubmit(){
        
        try {
            if(error != ""){
                setError("");
            }
            setModalShow(true);
            const res = await signIn("credentials",{
                username: info.username,
                password: info.password,
                redirect: false
            })
            console.log(res)
            if(res?.error){
                setError(res.error);
                setModalShow(false);
                console.log("invalid credentials")
            }
            else{
              router.push("/admin");
            }
        } catch (error) {
            console.log(error)
        }
    }

    const [modalShow, setModalShow] = useState(false);

    return(
        <>
           <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",height:"100vh"}}>
           <form className="form" onSubmit={(e)=>{e.preventDefault();handleSubmit()}}>
       <p className="form-title">Sign in to your account</p>
        <div className="input-container">
          <input required type="text" name="username" placeholder="Enter username" onChange={(e)=>handleInput(e)}/>
      </div>
      <div className="input-container">
          <input required type="password" name="password" placeholder="Enter password"  onChange={(e)=>handleInput(e)} />
        </div>
         <button type="submit" className="submit">
        Sign in
      </button>
      </form>

      {error != "" && 
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",marginTop:"50px"}}>
          {"Error : " + error}
      </div>
      }


      <Modal
      show={modalShow}
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
        </>
    )
}