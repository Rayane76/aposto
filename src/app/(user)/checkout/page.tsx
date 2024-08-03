'use client'

import { useEffect, useState } from "react"


export default function Checkout({ searchParams }: { searchParams : { source : string } }){




    const [articles,setArticles] = useState<any>([]);
    
    useEffect(()=>{
        if(searchParams.source === "article"){
        const storedArticle = sessionStorage.getItem('articles');
        if (storedArticle) {
          setArticles(JSON.parse(storedArticle));
        }
    }
    else if (searchParams.source === "cart"){
        const storedCart = JSON.parse(localStorage.getItem('cart') || '') as any[];
        const price = JSON.parse(localStorage.getItem('price') || '') as any[];
        if(storedCart && price){
        console.log(storedCart);    
        console.log(price);
        setArticles(storedCart);
        }
    }
    },[])

    return(
        <div>

        </div>
    )
}