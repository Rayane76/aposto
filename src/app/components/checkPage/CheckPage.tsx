'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Image from "next/image";



interface Wilaya {
  id: string,
  name: string,
  price: number,
  hide: boolean
}

interface Props {
  source: string,
  wilayas: Wilaya[]
}

function formatDate(date: Date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero based
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}


export default function CheckPage({ source , wilayas }: Props){

  const router = useRouter();
  const [open, setOpen] = useState(false);


  const [order,setOrder] = useState({
    fullName: "",
    email: "",
    phone: "",
    wilaya: "",
    district: "",
    address: "",
    articles: [],
    total: "",
    status: "Waiting"
  })





    const [articles,setArticles] = useState<any>([]);
    const [price,setPrice] = useState<any>(null);
    
    useEffect(()=>{
        if(source === "article"){
        const storedArticle = sessionStorage.getItem('article');
        if (storedArticle) {
          const lcl = JSON.parse(storedArticle);  
          setArticles(JSON.parse(storedArticle));
          setPrice(lcl[0].price);
          setOrder((prev:any)=>({...prev,total:lcl[0].price,articles:lcl}));
        }
    }
    else if (source === "cart"){
        const storedCart = JSON.parse(localStorage.getItem('cart') || '') as any[];
        const priceL = JSON.parse(localStorage.getItem('price') || '') as any[];
        if(storedCart && priceL){
        setPrice(priceL);    
        setArticles(storedCart);
        setOrder((prev:any)=>({...prev,total:priceL,articles:storedCart}));
        }
    }
    },[])

    const handleSubmit = async () => {
      setOpen(true);
      const currentDate = new Date();
      const formattedDate = formatDate(currentDate).toString();

      const formData = new FormData();

      let artcs = "";
      let clrs = "";
      let szs = ""
      if(source === "cart"){
      order.articles.map((article:any)=>{
         artcs = artcs + article.name + " ---- "
         clrs = clrs + article.color + " ---- "
         szs = szs + article.size + " ---- "
      })
    }
    else if (source === "article"){
      artcs = articles[0].name;
      clrs = articles[0].color;
      szs = articles[0].size;
    }

        formData.append("FULLNAME", order.fullName);
        formData.append("PHONE",order.phone);
        formData.append("WILAYA",order.wilaya);
        formData.append("DISTRICT",order.district);
        formData.append("ADDRESS",order.address);
        formData.append("DATE",formattedDate);
        formData.append("ARTICLE",artcs);
        formData.append("SIZE",szs);
        formData.append("COLOR",clrs);
        formData.append("TOTAL", order.total);
        formData.append("STATUS", "Waiting");
        try {
          await fetch("https://script.google.com/macros/s/AKfycby0sYZ1AXyWlSCOuxWvV21bExGb4kTvD-Llj-zoU7kwPvJXEueVMXyC6a5Owayq7gxw/exec",{
            method: "POST",
            mode: "no-cors",
            body: formData,
            })
   
            if(source === "cart"){
              localStorage.removeItem("cart");
              localStorage.removeItem("price");
            }

            else if (source === "article"){
              sessionStorage.removeItem("article");
            }


          router.push("/thanks");
        } catch (error) {
          console.log(error);
        }
        

      

    }


    return(
           <div className="checkoutDiv">
        <div className="infosDiv">
          <div className="personnalInfos">
            <div className="container">
              <h1>Expédition</h1>
              <p>Veuillez entrer vos coordonnées de livraison.</p>
              <hr />
              <form onSubmit={(e)=>{e.preventDefault();handleSubmit()}} className="form">
                <div className="fields fields--2">
                  <label className="field">
                    <span className="field__label">
                      Nom Complet
                    </span>
                    <input
                      className="field__input"
                      type="text"
                      required
                      id="firstname"
                      name="fullName"
                      onChange={(e)=>setOrder((prev)=>({...prev,[e.target.name]:e.target.value}))}
                    />
                  </label>
                  <label className="field">
                    <span className="field__label">
                      Email
                    </span>
                    <input required name="email" className="field__input" type="email" id="lastname"
                    onChange={(e)=>setOrder((prev)=>({...prev,[e.target.name]:e.target.value}))}
                     />
                  </label>
                </div>
                <label className="field">
                  <span className="field__label">
                    Numéro de tel
                  </span>
                  <input value={order.phone} pattern="\d{9,}" maxLength={12} minLength={9} required name="phone" className="field__input" type="text" id="address" 
                  onChange={(e)=>{const value = e.target.value.replace(/\D/g, ''); setOrder((prev)=>({...prev,[e.target.name]:value}))}}
                  />
                </label>
                <div className="fields fields--2">
                  <label className="field">
                    <span className="field__label">
                      Wilaya
                    </span>
                    <select required name="city"  className="field__input" id="state"
                    onChange={(e) => {
                    const selectedWilaya = wilayas.find(w => w.name === e.target.value);
                    setOrder((prev) => ({
                      ...prev,
                      wilaya: e.target.value,
                      total: price + (selectedWilaya ? selectedWilaya.price : 0),
                    }));
                  }}
                    >
                      <option hidden value=""></option>
                      <option value="Alger">Alger</option>
                      {wilayas.map((wilaya,key)=>{
                        return(
                          <option key={key} value={wilaya.name}>{wilaya.name}</option>
                        )
                      })}
                    </select>
                  </label>
                  <label className="field">
                    <span className="field__label">
                      Commune
                    </span>
                    <input required name="district" className="field__input" type="text" id="district" 
                  onChange={(e)=>setOrder((prev)=>({...prev,[e.target.name]:e.target.value}))}
                  />
                  </label>
                </div>
                <label className="field">
                  <span className="field__label">
                    Adresse
                  </span>
                  <input required name="address" className="field__input" type="text" id="lastname"
                   onChange={(e)=>setOrder((prev)=>({...prev,[e.target.name]:e.target.value}))}
                   />
                </label>
                <button type="submit" className="btn submitBTN" style={{backgroundColor:"#F1EADA",borderColor:"#946e60",color:"#946e60"}}>Soumettre</button>
              </form>
              <hr></hr>
            </div>
          </div>
        </div>

            <div className="layout__sidebar -checkout">
              <div className="sidebar__content">
                   <div className="summary">
                      <div className="summary__header">
                       <h5 className="summary__title">Récapitulatif de commande</h5>
                      </div>

                      <div className="summary__body">
                         <div className="summary__products">
                           {articles === null ? "" : 
                            articles.map((article:any,index:number)=>{
                                return(
                                    <div key={index} className="product">
                               <a className="product__area -image" href={"/article/" + article.name + "/" + article.id}>
                                <Image height={0} width={0} sizes="100vw" className="articleImg" src={article.image} alt={article.name}></Image>
                               </a>
                               <div className="product__area -content">
                                   <h4 className="product__title">{article.name}</h4>
                                   <div className="product__attributes">
                                     <div style={{display:"flex",flexDirection:"row"}}>
                                      <span className="product__attrKey">
                                      Taille:
                                      </span>
                                      <span className="product__attrValue">
                                      {article.size}
                                      </span>
                                      </div>
                                      <div style={{display:"flex",flexDirection:"row"}}>
                                      <span className="product__attrKey">
                                      Couleur:
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
                             PRIX
                           </div>
                           <div className="summaryItem__value" data-qa="totalAmountToBePaid">
                             {articles === null ? "" : price}
                               DA
                           </div>
                         </div>
                         <div className="d-flex justify-content-end pe-4">
                            +
                         </div>
                         <div className="summaryItem -total">
                         <div className="summaryItem__title">
                             LIVRAISON
                           </div>
                           <div className="summaryItem__value" data-qa="totalAmountToBePaid">
                             {order.wilaya === "" ? "" : Number(order.total) - price}
                               DA
                           </div>
                         </div>
                         <div className="d-flex justify-content-end pe-4">
                            =
                         </div>
                         <div className="summaryItem -total">
                         <div className="summaryItem__title">
                            PRIX TOTAL
                           </div>
                           <div className="summaryItem__value" data-qa="totalAmountToBePaid">
                             {order.wilaya === "" ? price : order.total}
                               DA
                           </div>
                         </div>
                      </div>
                   </div>
              </div>


        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

        </div>
      </div>
    )
}


