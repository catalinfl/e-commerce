import React from 'react'
import './CategoriesMenu.scss'
import {AiOutlineArrowRight} from 'react-icons/ai'


const CategoriesMenu: React.FC = () => {


    return (
        <> 
        <div className="categoriesParent"> 
        <div className="categoriesTriangle">
        </div>
        <div className="categoriesMenu">
        <div className="categoriesMenuContainer">
            <p className="categoriesItems"> Camnsdnsder <AiOutlineArrowRight className="categoriesIcon" /></p>
            <p className="categoriesItems"> dolorores <AiOutlineArrowRight className="categoriesIcon" /> </p>
            <p className="categoriesItems">  dffamet <AiOutlineArrowRight className="categoriesIcon" /> </p>
            <p className="categoriesItems"> uatewrtweatdolor <AiOutlineArrowRight className="categoriesIcon" /> </p>
            <p className="categoriesItems"> wetwtawetatolor <AiOutlineArrowRight className="categoriesIcon" /> </p>
        </div>
    </div>
</div>
    </>
        )
}

export default CategoriesMenu