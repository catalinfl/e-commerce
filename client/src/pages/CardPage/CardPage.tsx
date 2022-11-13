import React from 'react'
import Categories from '../../components/Categories/Categories'
import Navbar from '../../components/Navbar/Navbar'
import Product from '../../components/Product/Product'


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