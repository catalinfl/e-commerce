import React, { useState } from 'react'
import './CardProduct.scss'
import Image from "../../assets/CartImage.png"
import Ratings from './Ratings'
import Product from '../Product/Product'


interface PropsForCards {
    price: string
    title: string,
    rating: string | undefined,
    reduce?: string,
    image: string,
    oldPrice?: string,
    reviews?: undefined | string
}

const CardProduct: React.FC<PropsForCards> = ({ price, title, rating, reviews, reduce, image, oldPrice}: PropsForCards) => {

    var ratingToPass: any;
    if (rating === undefined) {
        ratingToPass = 0;
    }
    else ratingToPass = parseFloat(rating).toPrecision(3);

    var reviewsToPass: any;
    if (reviews === undefined) {
        reviewsToPass = 0;
    }
    else reviewsToPass = parseInt(reviews);

  return (
    <div className="cardItem">
        <div className="cardImg">
            <img className="cartImage" src={Image} alt="image" />
        </div>
        <div className="cardDesc">
            {title}
        </div>
        <div className="cardAvailability">
        &#9989; In stock
        </div>
        {rating ? <div className="cardRatings">
            <Ratings stars={ratingToPass} reviews={reviewsToPass}/>
        </div> : null}
        <div className="cardOldPriceContainer">
        { oldPrice ? 
        <div className="cardOldPrice">
            {oldPrice} lei
        </div>
        : null
        }
        {reduce ? 
            <div className="cardReduce">
            20%
        </div>
        : null    
        }
        </div>
        <div className="cardPrice">
        {price} lei
        </div>
        <div className="cardButton">
            <button className="cardBuyButton"> Adaugă în coș </button>
        </div>
    </div>
    )
}

export default CardProduct