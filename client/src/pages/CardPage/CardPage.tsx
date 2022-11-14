import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import Categories from '../../components/Categories/Categories'
import Navbar from '../../components/Navbar/Navbar'
import Product from '../../components/Product/Product'
import axios from "axios"
import { publicRequest, userRequest } from '../../requestMethods'




const CardPage: React.FC = () => {


  return (
    <>
    <Navbar />
    <Categories />
    <Product />
    </>
  )
}

export default CardPage