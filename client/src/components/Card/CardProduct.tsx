import React, { useEffect, useRef, useState } from 'react'
import './CardProduct.scss'
import Image from "../../assets/CartImage.png"
import Ratings from './Ratings'
import Product from '../Product/Product'
import { useNavigate } from 'react-router-dom'

interface PropsForCards {
    price: string ,
    title: string,
    rating: string | undefined,
    reduce?: string,
    image: string,
    oldPrice?: undefined  | string,
    reviews?: undefined | string
    _id: string
}

const CardProduct: React.FC<PropsForCards> = ({ price, title, rating, reviews, reduce, image, oldPrice, _id}: PropsForCards) => {

    const navigate = useNavigate()

    var precision: string;
    var reductionColor: string;

    var ratingToPass: any;
    if (rating === undefined) {
        ratingToPass = 0;
    }
    else ratingToPass = parseFloat(rating).toPrecision(3);

    var reviewsToPass: any;
    if (reviews === undefined) {
        reviewsToPass = 0;
    }
    else reviewsToPass = reviews.length;

   

    const calculatePercent = (oldPrice: string, price: string): string => {    
        var oldPriceInt: number = parseInt(oldPrice as string);
        var newPriceInt: number = parseInt(price as string);
        var percent: any;
        var percentMinus = newPriceInt / oldPriceInt;
        percent = (1 - percentMinus) * 100;
        if (percent <= 0) return "";
        var percentString = percent.toString();
            
            if (percentString.length > 2) {
                precision = percentString.slice(0, percentString.indexOf("."));
            }
            
            else precision = percentString;
        
        return precision;
    }



    const reductionColorCalculator: Function = (precision: string): string | null => {
        var precisionInt = parseInt(precision);
        if (precisionInt === 0) return null;
        if (precisionInt < 20) {
            return "yellow"; // yellow
        }
        if (precisionInt >= 20 && precisionInt < 30) {
            return "red";
        }
        if (precisionInt > 30) {
            return "red30";
        }
        return "";
    }

    precision = calculatePercent(oldPrice as string, price);
    reductionColor = reductionColorCalculator(precision);

    const onClickCard = (id: string) => {
        navigate(`/product/${id}`)
    }


  return (
    <div className="cardItem" onClick={() => onClickCard(_id)}>
        <div className="cardImg">
            <img className="cartImage" src={image} alt="image" />
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
        {oldPrice && (precision!=="") ?
        <div className="cardOldPrice">
            {oldPrice} lei
        </div> : null
        }
        {oldPrice && 
            (precision!=="") && <div className={`cardReduce ${reductionColor}`}> <p> {precision}% </p> </div> } 
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

