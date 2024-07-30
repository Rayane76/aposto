'use client'
import { useEffect, useState } from 'react';
import { CldUploadButton } from 'next-cloudinary';
import { useRouter } from "next/navigation";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { MdDelete } from "react-icons/md";
import Checkbox from '@mui/material/Checkbox';
import _ from 'lodash';





export default function EditArticlePage({ article , categorieName , categorieId }){

    const [originalArticle,setOriginalArticle] = useState({
        images: article.images,
        isOutArticle: article.isOutArticle,
        name: article.name,
        price: article.price,
        colors: article.colors
    })

    const [modifiedArticle,setModifiedArticle] = useState({
        images: article.images,
        isOutArticle: article.isOutArticle,
        name: article.name,
        price: article.price,
        colors: article.colors
    });

    const [typedColor,setTypedColor] = useState({
        name: "",
        secName:""
       });

    const handleDeleteImage = (index)=>{
       const newImages = [...modifiedArticle.images];

       newImages.splice(index, 1);

       setModifiedArticle((prevArticle) => ({
         ...prevArticle,
         images: newImages,
       }));
    }

    const handleAddImage = (e)=>{
        if(e.event === 'success'){
            setModifiedArticle((prev)=>({...prev,images:[...prev.images,e.info.secure_url]}));
        }
    }

    const handleModifyColor = (index, newColor) => {
        setModifiedArticle((prev) => {
            const colorsCopy = [...prev.colors];

            if (index >= 0 && index < colorsCopy.length) {
                colorsCopy[index].isOutColor = newColor;
            }

            return {...prev,colors: colorsCopy}
        })
    };

    const [deletedColors,setDeletedColors] = useState([]);

    const handleDeleteColor = (index) => {
        setDeletedColors((prev)=>([...prev,modifiedArticle.colors[index].id]));
        setModifiedArticle((prev)=>({...prev,colors:prev.colors.filter((_,i)=> i !== index)}));
    }

    const [modifiedSizes,setModifiedSizes] = useState([]);

    const handleModifyColorSize = (index,j,value) => {
        setModifiedArticle((prev)=> {
            const colorsCopy = [...prev.colors];

            if (index >= 0 && index < colorsCopy.length) {
                colorsCopy[index].sizes[j].isOutSize = value;
            }

            return {...prev,colors: colorsCopy}

        })

        if(modifiedArticle.colors[index].sizes[j].id){
            if(!modifiedSizes.includes(modifiedArticle.colors[index].sizes[j].id)){
            setModifiedSizes((prev)=>([...prev,modifiedArticle.colors[index].sizes[j].id]));
            }
            else{
            setModifiedSizes(prev=> prev.filter(item => item !== modifiedArticle.colors[index].sizes[j].id));
            }
        }
    }

    const handleAddColor = () => {
        if(typedColor.name != "" && typedColor.secName != ""){
         let sizes = [];
         originalArticle.colors[0].sizes.map((size)=>{
            sizes.push({
                name: size.name,
                isOutSize: false
            })
         });   
         setModifiedArticle((prev)=>({...prev,colors:[...prev.colors,{name:typedColor.name,isOutColor:false,secName:typedColor.secName,sizes:sizes}]}))
         setTypedColor({name:"",secName:""})
        }
    }

    const handleSubmit = async () => {
        let orig = {
            images: originalArticle.images,
            isOutArticle: originalArticle.isOutArticle,
            name: originalArticle.name,
            price: originalArticle.price,
        }

        let nw = {
            images: modifiedArticle.images,
            isOutArticle: modifiedArticle.isOutArticle,
            name: modifiedArticle.name,
            price: modifiedArticle.price,
        }

        if (!_.isEqual(orig, nw)) {
           console.log("not equal")
           //modify article principal fields
        }
        else {
            console.log("equal")
        }

        let newColors = modifiedArticle.colors.filter(color=> !color.id);
        if(newColors.length > 0){
            console.log(newColors);
            //map newColors and create new colors
        }

        if(deletedColors.length > 0){
            console.log(deletedColors);
            //map deletedColors and delete colors
        }

        for (let i = 0; i < modifiedArticle.colors.length; i++) {
            for (let j = 0; j < originalArticle.colors.length; j++) {
               if(originalArticle.colors[j].id === modifiedArticle.colors[i].id && originalArticle.colors[j].isOutColor !== modifiedArticle.colors[i].isOutColor){
                 console.log(modifiedArticle.colors[i]);
                 // update color isOutColor
               }             
            }
        }

        if(modifiedSizes.length > 0){
            //update size isOutSize
        }



    }



    return(
        <div style={{width:"100%", padding: "40px",marginTop:"20px" }}>
        <div style={{width:"100%",padding:"20px"}}>
        <div style={{marginBottom:"20px",display:"flex",justifyContent:"space-between",width:"100%"}}>
        <Breadcrumbs aria-label="breadcrumb">
       <Link underline="hover" color="inherit" href="/admin">
         Dashboard
       </Link>
       <Link underline="hover" color="inherit" href={"/admin/categories"}>
         Categories
       </Link>
       <Link underline="hover" color="inherit" href={"/admin/categories/" + categorieName + "/" + categorieId}>
         {categorieName}
       </Link>
       <Typography color="text.primary">{article.name}</Typography>
     </Breadcrumbs>
     <button className="btn btn-light"><MdDelete style={{color:"red", height:"30px",width:"30px"}} /></button>
        </div>
        <label className="mb-2">Name : </label>
        <br></br>
        <input value={modifiedArticle.name} onChange={(e)=>setModifiedArticle((prev)=>({...prev,name:e.target.value}))} style={{width:"100%",height:"40px"}} name="name" type="text"></input> 
        <br></br>
        <label style={{marginTop:"10px",marginBottom:"10px"}}>Price : </label>
        <br></br>
        <input value={modifiedArticle.price} onChange={(e)=>setModifiedArticle((prev)=>({...prev,price:Number(e.target.value)}))} style={{width:"100%",height:"40px"}} name="price" type="number"></input>
        <br></br>
        <br></br>
        <label style={{marginBottom:"15px"}}>Hide Article ? </label>
        <Checkbox checked={modifiedArticle.isOutArticle} onChange={(e)=>setModifiedArticle((prev)=>({...prev,isOutArticle:e.target.checked}))} />
        <br></br>
        <label style={{marginTop:"30px",marginBottom:"30px"}}>Article images : </label>
       <br></br>
       <CldUploadButton onSuccess={(e)=>handleAddImage(e)} className="btn btn-secondary" uploadPreset="aposto" />
       <br></br>
       <div style={{minHeight:"100px",marginTop:"50px"}} className='d-flex gap-4'>
        {modifiedArticle.images.map((image,j)=>{
           return(
               <div key={j} style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",flexWrap:"wrap"}}>
               <img src={image} style={{width:"auto",maxWidth:"150px",height:"100px"}}></img>
               <MdDelete style={{marginTop:"10px",height:"20px",width:"20px",cursor:"pointer"}} onClick={()=>handleDeleteImage(j)} />
               </div>
           )
        })} 
        </div>
       <br></br>

       <div style={{marginBottom:"30px"}}>
       <label style={{marginTop:"30px",marginBottom:"30px"}}>Colors : </label>
       <br></br>
        {modifiedArticle.colors.map((color,index)=>{
            return(
         <div key={index}>       
        <div style={{display:"flex",gap:"20px",marginBottom:"20px"}}>
          <label style={{width:"100px",paddingTop:"8px"}}>- {color.name}</label>
          <label style={{width:"100px",paddingTop:"8px"}}>{color.secName}</label>
          <Checkbox type='checkbox' checked={color.isOutColor} onChange={(e)=>handleModifyColor(index,e.target.checked)} />
          <MdDelete style={{marginTop:"10px",marginLeft:"10px",height:"20px",width:"20px",cursor:"pointer"}} onClick={()=>handleDeleteColor(index)} />
        </div>
        <label className='mb-4'>Sizes : </label>
        <div>
         {color.sizes.map((size,j)=>{
            return(
                <div key={j} style={{display:"flex",gap:"20px",marginBottom:"20px"}}>
          <label style={{width:"100px",paddingTop:"8px"}}>- {size.name}</label>
          <Checkbox checked={size.isOutSize} onChange={(e)=>handleModifyColorSize(index,j,e.target.checked)} />
        </div>
            )
         })}
       </div>
        </div>
            )
        })}

        <label>Colors : </label>
       <br></br>
       <p style={{margin:"0"}}>Please choose a name that exists in this link and write it exactly the same as it is in the website for the color docs name : <a target='blank' href='https://developer.mozilla.org/en-US/docs/Web/CSS/named-color'>Color names</a></p>
       <br></br>
       <div>
        <div className="d-flex gap-4 mb-4">
        <label className='me-2'>Add color name : </label>
        <input onChange={(e)=>setTypedColor((prev)=>({...prev,name:e.target.value}))} value={typedColor.name} className='me-2' type='text'></input>
        </div>
        <div className="d-flex gap-4 mb-4">
        <label className='me-2'>Add color docs name : </label>
        <input onChange={(e)=>setTypedColor((prev)=>({...prev,secName:e.target.value}))} value={typedColor.secName} className='me-2' type='text'></input>
        </div>
        <button onClick={()=>handleAddColor()} className='btn btn-success'>+</button>
        </div>
        <br></br>

       </div>


       <div style={{display:"flex",width:"100%",justifyContent:"center",marginTop:"50px"}}>
       <button onClick={()=>handleSubmit()} className="btn btn-primary">Save Changes</button>
       </div>
        </div>
       </div>
    )
}