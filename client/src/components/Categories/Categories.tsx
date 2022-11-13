import React from 'react'
import './Categories.scss'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useState, useEffect } from 'react'
import CategoriesMenu from './CategoriesMenu'


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
            <button className="categoriesItem"> Item 2 </button>
            <button className="categoriesItem"> Item 3 </button>
            <button className="categoriesItem"> Item 4 </button>
        </div>
    </div>
    
  )
}

export default Categories


