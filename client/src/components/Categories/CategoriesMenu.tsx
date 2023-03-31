import React, { useEffect, useState } from 'react'
import './CategoriesMenu.scss'
import {AiOutlineArrowRight} from 'react-icons/ai'
import axios from 'axios'
import { Link } from 'react-router-dom'

type CategoriesMenuType = {
    categories: string[]
}



const CategoriesMenu = ({categories}: CategoriesMenuType) => {

    return (
        <> 
        <div className="categoriesParent"> 
        <div className="categoriesTriangle">
        </div>
        <div className="categoriesMenu">
        <div className="categoriesMenuContainer">
            {categories.map((category: string) => {
                return (
                    <p className="categoriesItems">
                            <Link to={`/search/${category}`} className="categoriesLink" style={{textDecoration: 'none', color: 'grey'}}> 
                            {category} <AiOutlineArrowRight className="categoriesIcon"  />
                            </Link>
                    </p>
                )}
            )}
        </div>
    </div>
</div>
    </>
        )
}

export default CategoriesMenu