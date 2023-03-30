import React from 'react'
import './Categories.scss'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useState, useEffect } from 'react'
import CategoriesMenu from './CategoriesMenu'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Categories: React.FC = () => {

  const [isCategoriesOpen, setIsCategoriesOpen] = useState<boolean>(false);

  const [categories, setCategories] = useState<string[]>([])


  const fetchData = async () => {
      const responseData = await axios.get('http://localhost:3001/product/categoriesAll');
      setCategories(responseData.data);
  }

  useEffect(() => {
      fetchData();
    }, [])
    console.log(categories)


  return (
    <div className="categories">
        <div className="categoriesContainer">
            <button className={`categoriesItem principal`} onMouseLeave={() => setIsCategoriesOpen(false)}onMouseOver={() => setIsCategoriesOpen(true)}> <GiHamburgerMenu className="categoriesIcon"/> Produse </button>
            { isCategoriesOpen && 
              <div className="categoriesMenuHover" onMouseLeave={() => setIsCategoriesOpen(false)} onMouseOver={() => setIsCategoriesOpen(true)}>
              <CategoriesMenu categories={categories}/>
              </div>
            }
            <button className="categoriesItem"> Reduceri </button>
            <button className="categoriesItem"> Despre </button>
        </div>
    </div>
    
  )
}

export default Categories


