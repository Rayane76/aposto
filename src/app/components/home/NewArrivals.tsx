"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import "../../styles/newArrivals.css"


interface Article {
    id: string,
    name: string,
    isOutArticle: boolean,
    images: string[],
    price: number,
    colors: Color[]
  }
  
  interface Color {
      name: string,
      secName: string,
      isOutColor: boolean,
  }

  interface Props {
    articles: Article[]
  }

export default function NewArrivals({ articles }: Props) {
  return (
    <>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100px",color:"#946e60",backgroundColor:"#F1EADA",fontWeight:"bold",fontSize:"24px",marginTop:"50px",borderStyle:"solid none solid none",borderWidth:"1px",borderColor:"#946e60"}}>
         Nouvel Arrivage
      </div>
      <div style={{backgroundColor:"rgba(241, 234, 218, 0.1)",paddingTop:"50px",paddingBottom:"50px"}}>
      <Swiper
        loop={true}
        pagination={{
          clickable: true,
        }}
        spaceBetween={10}
        slidesPerView={1}
        navigation={true}
        modules={[FreeMode, Navigation, Pagination]}
        className="swpr"
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >

      {
        articles.map((article,index)=>{
          return(
              <SwiperSlide
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
              key={index}
             >
               <a className="article" key={index} href={"/article/" + article.name + "/" + article.id}>
                      <img src={article.images[0]} alt="article" className="imgArticle"></img>
                      <h2 className='details' style={{marginBottom:"5px",marginTop:"5px"}}>{article.name}</h2>
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
              </SwiperSlide>
                  )
        })
      }

      </Swiper>    
      </div>  
    </>
  );
}