'use client'
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';


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
    articles: Article[]
    clrs: Clrs[]
  }


export default function OneCatPage({ articles , clrs }: Props){


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
            <Dropdown>
    <Dropdown.Toggle style={{all:"unset",cursor:"pointer"}} id="dropdown-custom-components">
      Filter by color
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
                      <img src={article.images[0]} alt="article" className="articleImg"></img>
                      <h1>{article.name}</h1>
                      <h2>{article.colors.length + " "} Colors</h2>
                      <h2>{article.price + " "} Da</h2>
                    </a>
                )
                }
               })}
            </div>
            </div>
    )
}