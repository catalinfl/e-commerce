import React, { useState } from 'react'
import { ProductProps } from '../Product/Product'
import './TopOferts.scss'
import { useEffect } from 'react'
// import TopOfertsCards from './TopOfertsCards'
import CardProduct from '../Card/CardProduct'
import Image from "../../assets/CartImage.png"
import { Link, NavigateFunction, useNavigate } from "react-router-dom"

type TopOfertsProps = {
    products: ProductProps[]
} 



const TopOferts = ({products}: TopOfertsProps) => {

    const [topProducts, setTopProducts] = useState<any>();
    useEffect(() => {
        setTopProducts(products)
    }, [products])
    const navigate: NavigateFunction = useNavigate();
    
    const navigateFunc = (link: string) => {
        navigate(`/${link}`);
    }

    return (
    <div className="topOferts">
        <div className="topOfertsContainer">
            <h1> Top products &#9889; </h1>
            <div className="cardsContainer">
            {topProducts?.map((product: any, index: number) => 
                <Link key={index}  style={{textDecoration: 'none'}}to={`product/${product._id}`}>
                <CardProduct price={product.price} title={product.name as string} rating={product.reviewStars} image={product.img[0+index%product.img.length]}
                oldPrice={product.oldPrice} />
                </Link>
                )}
                </div>
        </div>
    </div>
    )
}

export default TopOferts