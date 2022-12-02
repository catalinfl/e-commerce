import React from 'react'
import { ProductProps } from '../Product/Product'
import './TopOferts.scss'
// import TopOfertsCards from './TopOfertsCards'
import CardProduct from '../Card/CardProduct'
import Image from "../../assets/CartImage.png"
import { Link, NavigateFunction, useNavigate } from "react-router-dom"

type TopOfertsProps = {
    products: ProductProps[]
} 



const TopOferts = ({products}: TopOfertsProps) => {

    const allProducts: ProductProps[] = products;    
    const navigate: NavigateFunction = useNavigate();
    
    const navigateFunc = (link: string) => {
        console.log("ajunge aici")
        navigate(`/${link}`);
    }

    return (
    <div className="topOferts">
        <div className="topOfertsContainer">
            <h1> Top products &#9889; </h1>
            <div className="cardsContainer">
            {allProducts?.map((product, index) => 
                <Link style={{textDecoration: 'none'}}to={`product/${product._id}`}>
                <CardProduct key={index} price={product.price} title={product.name as string} rating={product.reviewStars} image={product.images ? product.images[0] : Image}
                oldPrice={product.oldPrice}
                />
                </Link>
                )}
                </div>
        </div>
    </div>
    )
}

export default TopOferts