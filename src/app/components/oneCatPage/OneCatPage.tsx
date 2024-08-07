'use client'
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import "../../styles/oneCategorie.css"
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Image from "next/image";



interface Article {
    id: string,
    name: string,
    images: string[],
    price: number,
    colors: Color[]
  }
  
  interface Color {
      name: string,
      secName: string,
      isOutColor: boolean,
  }

  interface Clrs {
    name: string,
    secName: string
  }

  interface Props {
    name: string
    articles: Article[]
    clrs: Clrs[]
  }


export default function OneCatPage({ articles , clrs , name }: Props){


    const [selectedColors, setSelectedColors] = useState<string[]>([]);

    const handleClickColor = (e: React.MouseEvent<HTMLElement>,color: string) => {
        const parentElement = (e.target as HTMLElement).closest('a');
        if(parentElement){
          if (selectedColors.includes(color)){
                setSelectedColors(prev=> prev.filter(item=> item !== color))
                parentElement.style.backgroundColor = 'white'
          }
          else{
              setSelectedColors((prev)=>([...prev,color]));
              parentElement.style.backgroundColor = '#f9f9f9'
          }
        }
    }

    return(
        <div>
            <div className="miniNav">
            <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Accueil
        </Link>
        <Typography color="text.primary">{name}</Typography>
      </Breadcrumbs>


            <Dropdown>
    <Dropdown.Toggle style={{all:"unset",cursor:"pointer"}} id="dropdown-custom-components">
      Filtrer par Couleur
    </Dropdown.Toggle>

    <Dropdown.Menu>
              {clrs.map((color,index)=>{
                return(
                  <Dropdown.Item key={index} onClick={(e)=>handleClickColor(e,color.secName)}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <label>{color.name}</label>
                      <label style={{height:"10px",width:"10px",borderRadius:"50%",backgroundColor: color.secName}}></label>
                    </div>
                  </Dropdown.Item>
                  )

              })}
              
    </Dropdown.Menu>
  </Dropdown>
            </div>
            <div className="articlesDiv">
               {articles.map((article,index)=>{
                if(selectedColors.length === 0 || selectedColors.some(color => article.colors.some(obj => obj.secName === color))){
                return(
                    <a className="article" key={index} href={"/article/" + article.name + "/" + article.id}>
                      <Image height={0} width={0} sizes='100vw' src={article.images[0]} alt={article.name} className="imgArticle"></Image>
                      <h1 className='title'>{article.name.toUpperCase()}</h1>
                      <h2 className='details' style={{marginBottom:"5px"}}>{name}</h2>
                      <div style={{display:"flex",alignItems:"center",marginBottom:"10px"}}>
                      <h2 className='details'>{article.colors.length + " "} Couleurs</h2>
                      <div className="products__colorOptions -twoColor">
                        {article.colors.map((color,index)=>{
                          return(
                            <span key={index} className="products__itemColor" style={{backgroundColor: color.secName}}></span>
                          )
                        })}
                      </div>
                      </div>
                      <h2 className='price'>{article.price + " "} Da</h2>
                    </a>
                )
                }
               })}
            </div>
            </div>
    )
}