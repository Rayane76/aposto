'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { CldUploadButton } from 'next-cloudinary';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createArticle } from "./action";



export default function NewArticle({ params }){

    const router = useRouter();


    const [newArticle,setNewArticle] = useState({
        name: "",
        images: [],
        price: 0,
    })

   const handleAddImage = (e)=>{
    if(e.event === 'success'){
        setNewArticle((prev)=>({...prev,images:[...prev.images,e.info.secure_url]}));
    }
}

   let smlArr = ["S","M","L","XL","XXL"];

   const [sizes,setSizes] = useState([]);
   const [colors,setColors] = useState([]);

   const [sizeType,setSizeType] = useState("xsValues");

   const [typedSize,setTypedSize] = useState("");
   const [typedColor,setTypedColor] = useState({
    name: "",
    secName:""
   });

   const handleSubmitArticle = async (e) => {
    e.preventDefault();
    if(colors.length > 0 && newArticle.images.length > 0 && (sizeType === "xsValues" || (sizeType === "manually" && sizes.length > 0))){

        let colorSizes = [];

       if(sizeType === "xsValues"){
         smlArr.map((size)=>{
            colorSizes.push({
                name: size,
               isOutSize: false
            })
         })
       }
       else if (sizeType === "manually"){
          sizes.map((size)=>{
            colorSizes.push({
                name: size,
                isOutSize: false
            })
          })
       }
       

       let colorsArticle = [];


       colors.map((color)=>{
        colorsArticle.push({
             name: color.name,
             isOutColor: false,
             secName: color.secName,
             sizes: {
                create: colorSizes
             }
        })
       })

        const article = {
            name: newArticle.name,
            images: newArticle.images,
            price: newArticle.price,
            isOutArticle: false,
            categorieId: params.id,
            colors: {
                create: colorsArticle
            }
        }


        await createArticle(article);

        router.back();


    }

    else{
        console.log("conditions not fullfilled")
    }
}


    return(
        <div style={{width:"100%", padding: "40px",marginTop:"20px" }}>
        <div style={{marginBottom:"30px"}}>
        <Breadcrumbs className="linkSize" aria-label="breadcrumb">
       <Link underline="hover" color="inherit" href="/admin">
         Dashboard
       </Link>
       <Link underline="hover" color="inherit" href={"/admin/categories"}>
         Categories
       </Link>
       <Link underline="hover" color="inherit" href={"/admin/categories/" + params.name + "/" + params.id}>
         {params.name}
       </Link>
       <Typography color="text.primary">New Article</Typography>
     </Breadcrumbs>
     </div>
       <form style={{minHeight:"150vh",height:"auto",position:"relative"}} onSubmit={(e)=>handleSubmitArticle(e)}>
       <label style={{marginBottom:"15px"}}>Article name : </label>
       <br></br>
       <input style={{width:"100%",height:"40px"}} onChange={(e)=>setNewArticle((prev)=>({...prev,[e.target.name]:e.target.value}))} type="text" name="name" required></input>
       <br></br>
       <label style={{marginTop:"30px",marginBottom:"30px"}}>Article price : </label>
       <br></br>
       <input style={{width:"100%",height:"40px"}} onChange={(e)=>setNewArticle((prev)=>({...prev,[e.target.name]: Number(e.target.value)}))} type="number" name="price" required></input>
       <br></br>
       <label style={{marginTop:"30px",marginBottom:"30px"}}>Article images : </label>
       <br></br>
       <CldUploadButton className="btn btn-secondary" onSuccess={(e)=>handleAddImage(e)} uploadPreset="aposto" />
       <br></br>
       <div style={{minHeight:"100px",marginTop:"50px"}} className='d-flex gap-4'>
        {newArticle.images.map((image,j)=>{
           return(
               <img key={j} src={image} style={{width:"auto",maxWidth:"150px",height:"100px"}}></img>
           )
        })} 
        </div>
       <br></br>

       <label style={{marginTop:"30px",marginBottom:"30px"}}>Article sizes type : </label>
       <br></br>
       <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
        <InputLabel>Type</InputLabel>
        <Select
          value={sizeType}
          label="Size Type"
          onChange={(e)=>setSizeType(e.target.value)}
        >
          <MenuItem value="xsValues">S-M-...-XXl</MenuItem>
          <MenuItem value="manually">Add sizes manually</MenuItem>
        </Select>
      </FormControl>
    </Box>
       <br></br>

       {sizeType === "manually" &&
        <>
        <div className='d-flex align-items-center mb-4'>
        <label className='me-2'>Add size name : </label>
        <input className='me-2' onChange={(e)=>setTypedSize(e.target.value)} value={typedSize} type='text'></input>
        <button className='btn btn-success' onClick={()=>{if(typedSize != ""){setSizes((prev)=>([...prev,typedSize]));setTypedSize("")}}}>+</button>
        </div>
        {sizes.length === 0 ? "" 
        : (
                <div className="flex gap-4">
                {sizes.map((size, index) => {
                    return(
                   <label key={index}>{size + " - " + " "}</label>
                    )
                })}
                </div>
            )}
      </>
       }
       <br></br>
       <br></br>

       <label>Colors : </label>
       <br></br>
       <p style={{margin:"0"}}>Please choose a name that exists in this link and write it exactly the same as it is in the website for the color docs name : <a target='blank' href='https://developer.mozilla.org/en-US/docs/Web/CSS/named-color'>Color names</a></p>
       <br></br>
       <div>
        <div className="d-flex gap-4 mb-4">
        <label className='me-2'>Add color name : </label>
        <input className='me-2' onChange={(e)=>setTypedColor((prev)=>({...prev,name:e.target.value}))} value={typedColor.name} type='text'></input>
        </div>
        <div className="d-flex gap-4 mb-4">
        <label className='me-2'>Add color docs name : </label>
        <input className='me-2' onChange={(e)=>setTypedColor((prev)=>({...prev,secName:e.target.value}))} value={typedColor.secName} type='text'></input>
        </div>
        <button className='btn btn-success' onClick={()=>{if(typedColor.name != "" && typedColor.secName != ""){setColors((prev)=>([...prev,typedColor]));setTypedColor({name:"",secName:""})}}}>+</button>
        </div>
        <br></br>
       <br></br>
        {colors.length === 0 ? "" 
        : (
                <div className="">
                {colors.map((color, index) => {
                    return(
                   <div key={index}>
                   <label>{color.name + " - " + color.secName}</label>
                   <br></br>
                   </div>
                    )
                })}
                </div>
            )}
         <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",marginTop:"100px"}}>
         <button type="submit" className="btn btn-primary">Submit</button>   
         </div>
       </form>
     </div>
    )
}