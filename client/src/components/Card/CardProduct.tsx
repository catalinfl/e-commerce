import React, { useState } from 'react'
import './CardProduct.scss'
import Image from "../../assets/CartImage.png"
import Ratings from './Ratings'

const CardProduct: React.FC = () => {

  return (
    <div className="cardItem">
        <div className="cardImg">
            <img className="cartImage" src={Image} alt="image" />
        </div>
        <div className="cardDesc">
            Lorem ipsum dolor sit ametetww consectetur adipisicing elit. M
        </div>
        <div className="cardAvailability">
        &#9989; in stock
        </div>
        <div className="cardRatings">
            <Ratings />
        </div>
        <div className="cardOldPriceContainer">
        <div className="cardOldPrice">
            35435,32 lei
        </div>
        <div className="cardReduce">
            20%
        </div>
        </div>
        <div className="cardPrice">
            35333,65 lei
        </div>
        <div className="cardButton">
            <button className="cardBuyButton"> Adaugă în coș </button>
        </div>
    </div>
    )
}

export default CardProduct