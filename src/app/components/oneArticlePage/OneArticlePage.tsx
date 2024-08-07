'use client'
import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Button from 'react-bootstrap/Button';
import { IoIosArrowDown } from "react-icons/io";

import 'swiper/css';
import 'swiper/css/pagination';
import { useRouter } from "next/navigation";
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
    sizes: Size[]
}

interface Size {
   name: string,
   isOutSize: boolean,
   colorId: string
}

interface Props {
    article: Article
}


export default function OneArticlePage({ article }: Props){

    const order = ["S", "M", "L", "XL", "XXL"];

    const router = useRouter();


    let sortedSizes = article.colors[0].sizes.sort((a, b) => {
        return order.indexOf(a.name) - order.indexOf(b.name);
      });

    const [selectedColor,setSelectedColor] = useState<Color>({
        name: article.colors[0].name,
        secName: article.colors[0].secName,
        isOutColor:article.colors[0].isOutColor,
        sizes:sortedSizes
    });
  


    const handleSelectColor = (color: Color) => {
        setSelectedColor(color);

         sortedSizes = color.sizes.sort((a, b) => {
          return order.indexOf(a.name) - order.indexOf(b.name);
        });

        setSelectedColor({name: color.name, secName: color.secName,isOutColor:color.isOutColor,sizes:sortedSizes}); 

    }

    const [selectedSize,setSelectedSize] = useState<string>("Taille");
    const [error,setError] = useState<string>("");

    const handleSize = (e: React.MouseEvent<HTMLElement>,sizeSelected: string) => {

        if(selectedSize !== sizeSelected){
            if(selectedSize !== "Taille"){
            const checked = document.getElementsByClassName("checked");
            checked[0].classList.remove("checked");
            }
            (e.target as HTMLElement).classList.add("checked");
            setSelectedSize(sizeSelected);
            setError("");
            const sizesOpen = document.getElementsByClassName("product__sizes");
            sizesOpen[0].classList.toggle("-mobileShow");
        }
       

    }

    const handleOpen = ()=>{
        const sizesOpen = document.getElementsByClassName("product__sizes");
        sizesOpen[0].classList.toggle("-mobileShow");
      }

      const handleAddCart = () => {
        if(selectedSize === "Taille"){
            const sizesOpen = document.getElementsByClassName("product__sizes");
            sizesOpen[0].classList.toggle("-mobileShow");
            setError("Choisir une taille !");
          }
            else{
                const articleToBuy = {
                    id: article.id,
                    name: article.name,
                    image: article.images[0],
                    size: selectedSize,
                    color: selectedColor.name,
                    price: article.price
                }
               
               let currentCart = JSON.parse(localStorage.getItem('cart') || '[]') as any[];
      
               // Add the new article to the cart
               currentCart.push(articleToBuy);
           
               // Save the updated cart back to localStorage
               localStorage.setItem('cart', JSON.stringify(currentCart));
      
               const svgElement = document.getElementById('crt');
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      });

      if(svgElement){
        svgElement.dispatchEvent(event);
      }
      
    }
 }

      const handleBuy = () => {
        if(selectedSize === "Taille"){
            const sizesOpen = document.getElementsByClassName("product__sizes");
            sizesOpen[0].classList.toggle("-mobileShow");
            setError("Choisir une taille !");
          }
          else{
             const articleToBuy = [{
                 id: article.id,
                 name: article.name,
                 image: article.images[0],
                 size: selectedSize,
                 color: selectedColor.name,
                 price: article.price
             }]
             sessionStorage.setItem('article',JSON.stringify(articleToBuy));
             router.push(`/checkout?source=${"article"}`);
          }
      }

   

    return(
        <Container className="all" style={{marginBottom:"150px"}}>
        <Row>
          <Col className="col-lg-8 col-12 product-images-area">
            <div className="product-images -desktop">
              <div className="productGallery o-gallery -passive -passive">
                <div className="swiper-container">
                  <ul className="swiper-wrapper">
                    {article.images.map((image, index) => {
                      return (
                        <li key={index} className="swiper-slide">
                          <div className="o-gallery__imgContainer productGallery__container">
                            <Image
                              alt="product"
                              height={0}
                              width={0}
                              sizes="100vw"
                              id="product-image"
                              className="o-gallery__img lazy -loaded"
                              src={image}
                            ></Image>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
  
            <div className="product-images -mobile">
            <Swiper 
           pagination={{
            clickable: true,
             }} 
          modules={[Pagination]} 
           style={{height:"auto"}}
          >
              {article.images.map((image,index)=>{
            return(
              <SwiperSlide key={index} style={{justifyContent:"center",alignItems:"center",display:"flex"}}>
          <Image height={0} width={0} sizes="100vw" src={image} style={{width:"100%",height:"100%"}} alt='product'></Image>
          </SwiperSlide>
            )
          })}
  
          </Swiper>
   
            </div>
          </Col>
  
          <Col className="col-12 col-lg-4">
          <div className="product">
            <h1 className="product__name">{article.name}</h1>
            <div className="product__prices">
              <div className="product__priceContent">
                <div className="product__item">
                  <span className="product__price -actual"> {article.price + " "} DA </span>
                </div>
              </div>
            </div>
            <div className="product__colors">
            {article.colors.map((color,j)=>{
              return(
                  <div onClick={()=>handleSelectColor(color)} key={j} className="product__color">
                <span style={{display:"block",width:"100%",height:"100%",borderRadius:"50%",backgroundColor:color.secName.toLowerCase()}}></span>
              </div>
              )
            })}
              <span className="product__colorName">{selectedColor.name.toUpperCase()}</span>
            </div>
            <div className="product__sizes">
              <div className="overlay"></div>
              <div className="product__header -sizes">
              <span className="product__label -sizes">Choisir une taille : 
                <span style={{color:"red"}}>{error}</span>
                </span>
              </div>
              <div className="product__content -sizes">
              {selectedColor.sizes.map((size,i)=>{
                   if(size.isOutSize === false){ 
                    return(
                      <div key={i} onClick={(e)=>handleSize(e,size.name)} className="product__size radio-box">
                   <label className="radio-box__label">{size.name}</label>
                 </div>
                    )
                   }
              })}
          
            </div>
              
            </div>
            
  
  
            <div className="product__shopTheLook">
            <Button onClick={()=>handleAddCart()} className="lg block" variant="outline-light" style={{borderColor:"#946e60"}}>
            <span className="button__text" style={{color:"#946e60"}}>Ajouter au panier</span>
            </Button>
            </div>
  
  
            <div className="product__buttons -shopTheLook">
             <button onClick={()=>handleOpen()} className="product__button -selectSize">
              {selectedSize} <IoIosArrowDown />
             </button>
             <div className="product__button -addToCart">
             <Button onClick={()=>handleBuy()} className="block2 lg" style={{backgroundColor:"#F1EADA",borderColor:"#946e60",color:"#946e60"}}>Acheter maintenant</Button>
             </div>
            </div>
            </div>
          </Col>
        </Row>
      </Container>
    )
}