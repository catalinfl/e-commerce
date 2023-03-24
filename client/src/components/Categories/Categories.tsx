import React from 'react'
import './Categories.scss'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useState, useEffect } from 'react'
import CategoriesMenu from './CategoriesMenu'
import { Link } from 'react-router-dom'


const Categories: React.FC = () => {

  const [isCategoriesOpen, setIsCategoriesOpen] = useState<boolean>(false);

  return (
    <div className="categories">
        <div className="categoriesContainer">
            <button className={`categoriesItem principal`} onMouseLeave={() => setIsCategoriesOpen(false)}onMouseOver={() => setIsCategoriesOpen(true)}> <GiHamburgerMenu className="categoriesIcon"/> Produse </button>
            { isCategoriesOpen && 
              <div className="categoriesMenuHover" onMouseLeave={() => setIsCategoriesOpen(false)} onMouseOver={() => setIsCategoriesOpen(true)}>
              <CategoriesMenu />
              </div>
            }
           <Link className="categoriesItem" to='/search'> <button className="categoriesItem"> Caută un produs </button> </Link> 
            <button className="categoriesItem"> Reduceri </button>
            <button className="categoriesItem"> Despre </button>
        </div>
    </div>
    
  )
}

export default Categories


