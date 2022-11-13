import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import Categories from '../../components/Categories/Categories'
import Navbar from '../../components/Navbar/Navbar'
import Product from '../../components/Product/Product'
import axios from "axios"
import { publicRequest, userRequest } from '../../requestMethods'




const CardPage: React.FC = () => {
  
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [product, setProduct] = useState<any>();
  
   useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/product/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);
  


  return (
    <>
    <Navbar />
    <Categories />
    <Product />
    </>
  )
}

export default CardPage