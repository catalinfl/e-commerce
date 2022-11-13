import React from 'react'
import Categories from '../../components/Categories/Categories'
import Navbar from '../../components/Navbar/Navbar'
import Searchpage from '../../components/Searchpage/Searchpage'
import './Search.scss'

const Search = () => {
  return (
    <>
    <Navbar />
    <Categories />
    <Searchpage />
    </>
  )
}

export default Search