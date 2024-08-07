'use client'
import { useState } from 'react';
import { CldUploadButton } from 'next-cloudinary';
import { useRouter } from "next/navigation";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { MdDelete } from "react-icons/md";
import Checkbox from '@mui/material/Checkbox';
import _ from 'lodash';
import { deleteArticle, updateArticle } from './action';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';





export default function EditArticlePage({ article , categorieName , categorieId , idArticle }){

    const router = useRouter();

    const [clickedBtn,setClickedBtn] = useState("");
    const [indexOfImageToDelete,setIndexOfImageToDelete] = useState(null);
    const [indexOfColorToDelete,setIndexOfColorToDelete] = useState(null);


    const [modalShow, setModalShow] = useState(false);
    const [modalShowSpinner,setModalShowSpinner] = useState(false);

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

    //to handle input of adding a new color
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
       
       setModalShow(false);
       setIndexOfImageToDelete(null);
    }

    const handleAddImage = (e)=>{
        if(e.event === 'success'){
            setModifiedArticle((prev)=>({...prev,images:[...prev.images,e.info.secure_url]}));
        }
    }

    const [modifiedColors,setModifiedColors] = useState([]);
    const [modifiedSizes,setModifiedSizes] = useState([]);
    const [deletedColors,setDeletedColors] = useState([]);


    const handleModifyColor = (index, value) => {
        // to modify a color isOutColor field
        setModifiedArticle((prev) => {
            const colorsCopy = [...prev.colors];

            if (index >= 0 && index < colorsCopy.length) {
                colorsCopy[index].isOutColor = value;
            }

            return {...prev,colors: colorsCopy}
        })

        //add the modified color id to modifiedColors array

        //check first if the modified color does not belong to a new added color
        // because a new added color will be created after and can have on creation all values we want for any field
        //we check by seeing if it has an id or no , if no it means it's a new color

        if(modifiedArticle.colors[index].id){
            if(!modifiedColors.some(obj => obj.id === modifiedArticle.colors[index].id)){
                setModifiedColors((prev)=>([...prev,{id:modifiedArticle.colors[index].id, value: value}]));
                }
                //if the id does exist it means we changed it one time and now we are resetting it to initial value
                //so there's no changes needed in backend so we delete it from modifiedSizes array
                else{    
                setModifiedColors(prev=> prev.filter(item => item.id !== modifiedArticle.colors[index].id));
                }
        }


    };

    const handleModifyColorSize = (indexOfColor,indexOfSizeInColor,value) => {
        setModifiedArticle((prev)=> {
            const colorsCopy = [...prev.colors];

            if (indexOfColor >= 0 && indexOfColor < colorsCopy.length) {
                colorsCopy[indexOfColor].sizes[indexOfSizeInColor].isOutSize = value;
            }

            return {...prev,colors: colorsCopy}

        })

        //add the modified size id to modifiedSize array

        //check first if the modified size does not belong to a new added color
        // because a new added color will be created after and can have on creation all values we want for any field
        if(modifiedArticle.colors[indexOfColor].sizes[indexOfSizeInColor].id){
            //if the id doesn't exist in modifiedSize we add it so we can change isOutSize field
            if(!modifiedSizes.some(obj => obj.id === modifiedArticle.colors[indexOfColor].sizes[indexOfSizeInColor].id)){
            setModifiedSizes((prev)=>([...prev,{id: modifiedArticle.colors[indexOfColor].sizes[indexOfSizeInColor].id, value: value}]));
            }
            //if the id does exist it means we changed it one time and now we are resetting it to initial value
            //so there's no changes needed in backend so we delete it from modifiedSizes array
            else{    
            setModifiedSizes(prev=> prev.filter(item => item.id !== modifiedArticle.colors[indexOfColor].sizes[indexOfSizeInColor].id));
            }
        }
    }


    const handleDeleteColor = (index) => {
        // first 5 lines to verify if i modified a size in that color before deleting it
        // if i modified i delete it from modifiedSizes
        modifiedArticle.colors[index].sizes.map((size)=>{
            if(modifiedSizes.some(obj => obj.id === size.id)){
                setModifiedSizes(prev => prev.filter(item => item.id !== size.id));
            }
        })

        
        // these 2 lines to verify if i modified a color before deleting it
        //if i modified it it delete it from modifiedColors
        if(modifiedColors.some(obj => obj.id === modifiedArticle.colors[index].id)){
            setModifiedColors(prev => prev.filter(item => item.id !== modifiedArticle.colors[index].id));
        }

        //add deleted color id to a deletedColors array
        setDeletedColors((prev)=>([...prev,modifiedArticle.colors[index].id]));
        setModifiedArticle((prev)=>({...prev,colors:prev.colors.filter((_,i)=> i !== index)}));
        setModalShow(false);
        setIndexOfColorToDelete(null);
    }



    const handleAddColor = () => {
        if(typedColor.name != "" && typedColor.secName != ""){
         let sizes = [];
         //give the new color the sizes of first color of initially fetched article
         //useful when i delete all colors and then i want to create a new one
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

        setModalShow(false);


        if(modifiedArticle.name !== "" && modifiedArticle.price != "" && modifiedArticle.images.length > 0 && modifiedArticle.colors.length > 0){

        setModalShowSpinner(true);

        let editArtcl = undefined;
        let createClr = undefined;
        let deleteClr = undefined;
        let modifyClr = undefined;
        let modifySz = undefined;

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
           const changes = _.omitBy(nw, (value, key) => _.isEqual(value, orig[key]));
           changes.articleId = idArticle;
           editArtcl = changes;
        }

        else {
            console.log("equal")
        }

        //get newly added colors by filtering the colors the don't have an id
        let newColors = modifiedArticle.colors.filter(color=> !color.id);
        if(newColors.length > 0){
            //map newColors and create new colors

            let crt = [];
            newColors.map((color)=>{
                crt.push({
                    articleId: idArticle,
                    name: color.name,
                    secName: color.secName,
                    isOutColor: color.isOutColor,
                    sizes: {
                        create: color.sizes
                    }
                })
            });

            createClr = crt;
        }

        if(deletedColors.length > 0){
            deleteClr = deletedColors;
        }

        if(modifiedColors.length > 0){
            modifyClr = modifiedColors;
        }

        if(modifiedSizes.length > 0){
            modifySz = modifiedSizes;
        }

        await updateArticle(editArtcl,createClr,deleteClr,modifyClr,modifySz);

    }

    setModalShowSpinner(false);

    router.push("/admin/categories/" + categorieName + "/" + categorieId);



    }


    const handleDeleteArticle = async () => {
        
        setModalShow(false);

        setModalShowSpinner(true);

        await deleteArticle(idArticle);

        router.push("/admin/categories/" + categorieName + "/" + categorieId);

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
     <button className="btn btn-light" onClick={()=>{setClickedBtn("delete");setModalShow(true)}}><MdDelete style={{color:"red", height:"30px",width:"30px"}} /></button>
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
               <MdDelete style={{marginTop:"10px",height:"20px",width:"20px",cursor:"pointer"}} onClick={()=>{setIndexOfImageToDelete(j);setClickedBtn("image");setModalShow(true)}} />
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
          <FormControlLabel control={<Checkbox type='checkbox' checked={color.isOutColor} onChange={(e)=>handleModifyColor(index,e.target.checked)} />} label="Hide" />
          <MdDelete style={{marginTop:"10px",marginLeft:"10px",height:"20px",width:"20px",cursor:"pointer"}} onClick={()=>{setIndexOfColorToDelete(index);setClickedBtn("color");setModalShow(true)}} />
        </div>
        <label className='mb-4'>Sizes : </label>
        <div>
         {color.sizes.map((size,j)=>{
            return(
                <div key={j} style={{display:"flex",gap:"20px",marginBottom:"20px"}}>
          <label style={{width:"100px",paddingTop:"8px"}}>- {size.name}</label>
          <FormControlLabel control={<Checkbox checked={size.isOutSize} onChange={(e)=>handleModifyColorSize(index,j,e.target.checked)} />} label="Hide" />
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
       <button onClick={()=>{setClickedBtn("save");setModalShow(true)}} className="btn btn-primary">Save Changes</button>
       </div>
        </div>





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
        {clickedBtn === "delete" ?
        <h4>Delete Article ?</h4>
        :
         clickedBtn === "image" ?
         <h4>Delete Image ?</h4>
         : 
         clickedBtn === "color" ?
         <h4>Delete Color ?</h4>
         :
         clickedBtn === "save" ?
           modifiedArticle.name === "" ?
           <h4>Please add a name</h4>
           :
           modifiedArticle.price === "" ?
           <h4>Please add a price</h4>
           :
           modifiedArticle.images.length === 0 ?
           <h4>Please add at least one image</h4>
           :
           modifiedArticle.colors.length === 0 ?
           <h4>Please add at least one image</h4>
           :
           <h4>Save Changes ?</h4>
         :
         ""
        }
      </Modal.Body>
      <Modal.Footer>
        {clickedBtn === "save" && modifiedArticle.name !== "" && modifiedArticle.price != "" && modifiedArticle.images.length > 0 && modifiedArticle.colors.length > 0 && <Button onClick={()=>handleSubmit()}>Save</Button>}
        {clickedBtn === "color" && <Button variant='danger' onClick={()=>handleDeleteColor(indexOfColorToDelete)}>Delete</Button>}
        {clickedBtn === "image" && <Button variant='danger' onClick={()=>handleDeleteImage(indexOfImageToDelete)}>Delete</Button>}
        {clickedBtn === "delete" && <Button variant='danger' onClick={()=>handleDeleteArticle()}>Delete</Button>}
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