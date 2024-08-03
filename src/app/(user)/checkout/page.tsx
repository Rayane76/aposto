'use client'
import Navbar from "@/app/components/navbar/Navbar";
import "../../styles/check.css"

import { useEffect, useState } from "react"


export default function Checkout({ searchParams }: { searchParams : { source : string } }){




    const [articles,setArticles] = useState<any>([]);
    const [price,setPrice] = useState<any>(null);
    
    useEffect(()=>{
        if(searchParams.source === "article"){
        const storedArticle = sessionStorage.getItem('articles');
        if (storedArticle) {
          const lcl = JSON.parse(storedArticle);  
          setArticles(JSON.parse(storedArticle));
          setPrice(lcl[0].price);
        }
    }
    else if (searchParams.source === "cart"){
        const storedCart = JSON.parse(localStorage.getItem('cart') || '') as any[];
        const priceL = JSON.parse(localStorage.getItem('price') || '') as any[];
        if(storedCart && priceL){
        setPrice(priceL);    
        setArticles(storedCart);
        }
    }
    },[])


    return(
        <div>
           <Navbar />
           <div className="checkoutDiv">
        <div className="infosDiv">
          <div className="personnalInfos">
            <div className="container">
              <h1>Shipping</h1>
              <p>Please enter your shipping details.</p>
              <hr />
              <form onSubmit={(e)=>{}} className="form">
                <div className="fields fields--2">
                  <label className="field">
                    <span className="field__label">
                      Full name
                    </span>
                    <input
                      className="field__input"
                      type="text"
                      required
                      id="firstname"
                      name="fullName"
                      onChange={(e)=>{}}
                    />
                  </label>
                  <label className="field">
                    <span className="field__label">
                      email
                    </span>
                    <input required name="email" className="field__input" type="email" id="lastname"
                     />
                  </label>
                </div>
                <label className="field">
                  <span className="field__label">
                    Phone number
                  </span>
                  <input required name="phone" className="field__input" type="text" id="address" 
                  />
                </label>
                <div className="fields fields--2">
                  <label className="field">
                    <span className="field__label">
                      City
                    </span>
                    <select required name="city"  className="field__input" id="state">
                      <option hidden value=""></option>
                    </select>
                  </label>
                  <label className="field">
                    <span className="field__label">
                      District
                    </span>
                    <select required name="district" className="field__input" id="state">
                    <option hidden value=""></option>
                    </select>
                  </label>
                </div>
                <label className="field">
                  <span className="field__label">
                    Address
                  </span>
                  <input required name="address" className="field__input" type="text" id="lastname"
                   />
                </label>
                <button type="submit" className="btn btn-dark">Submit</button>
              </form>
              <hr></hr>
            </div>
          </div>
        </div>

            <div className="layout__sidebar -checkout">
              <div className="sidebar__content">
                   <div className="summary">
                      <div className="summary__header">
                       <h5 className="summary__title">Order Summary</h5>
                      </div>

                      <div className="summary__body">
                         <div className="summary__products">
                           {articles === null ? "" : 
                            articles.map((article:any,index:number)=>{
                                return(
                                    <div key={index} className="product">
                               <a className="product__area -image" href={"/articles/" + article.name + "/" + article.id}>
                                <img className="articleImg" src={article.image} alt={article.name}></img>
                               </a>
                               <div className="product__area -content">
                                   <h4 className="product__title">{article.name}</h4>
                                   <div className="product__attributes">
                                     <div style={{display:"flex",flexDirection:"row"}}>
                                      <span className="product__attrKey">
                                      Size:
                                      </span>
                                      <span className="product__attrValue">
                                      {article.size}
                                      </span>
                                      </div>
                                      <div style={{display:"flex",flexDirection:"row"}}>
                                      <span className="product__attrKey">
                                      Color:
                                      </span>
                                      <span className="product__attrValue">
                                      {article.color}
                                      </span>
                                      </div>
                                   </div>
                               </div>
                               <div  className="product__area -prices">
                               <span className="product__price">
                               {article.price} DA
                               </span>
                               </div>
                            </div>
                                )
                            })
                           }
                         </div>
                      </div>
                      <div className="summary__footer">
                         <div className="summaryItem -total">
                           <div className="summaryItem__title">
                             TOTAL
                           </div>
                           <div className="summaryItem__value" data-qa="totalAmountToBePaid">
                             {articles === null ? "" : price}
                               DA
                           </div>
                         </div>
                      </div>
                   </div>
              </div>

        </div>
      </div>
        </div>
    )
}