import React, { RefObject, MutableRefObject } from 'react'
import './Product.scss'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import { BsSuitHeart } from "react-icons/bs"
import { AiOutlineInfoCircle, AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai"
import Image from '../../assets/CartImage.png'
import Image2 from '../../assets/Logo.png'
import CardProduct from '../Card/CardProduct'
import { useRef, useState } from 'react'
import { IconType } from 'react-icons'




const Product: React.FC = () => {

    const principalRef = React.useRef<HTMLImageElement>(null);
    const photoRef = React.useRef<HTMLImageElement>(null);
    const buttonRef = React.useRef<HTMLDivElement>(null);
    const [isClicked, setIsClicked] = React.useState<boolean>(false);
    // const favoriteRef = React.forwardRef<HTMLButtonElement>(null);

    const principalImageFunc: Function = (name: string) => {
        if (principalRef.current === null) {
            console.log("Error");
        }
        else {
        principalRef.current.src = `${name}`;
        }
    }

    // const sliderButton: Function = (direction: string) => {
    //     if (direction === "up") {
    //         buttonRef?.current?.scrollTo(0, 0);
    //     }
    //     if (direction === "down") {

    //     }
    // }
   

    return (
    <div className="product">
        <div className="productContainer">
            <p className="productCategory">
                IT / Calculatoare / <span className="productC"> DVD-ROM </span>
            </p>
            <h1 className="productTitle">
                DVD-ROM Asus Lorem Ipsum
            </h1>
            <p className="productCode">
                Cod produs: ETWATOAWJTEAWOTKEWAW
            </p>
            <p className="productRating">
                Fii primul care evalueaza acest produs
            </p>
            <div className="productPrincipalContainer">
                <div className="productSlider">
                    <BsArrowUp onClick={() => buttonRef?.current?.scrollTo({ top: buttonRef?.current?.scrollTop - 200, behavior: 'smooth' })}className="productSliderButtonUp"/>
                    <div ref={buttonRef} className="productImageContainer">
                        <img className="productImagePng" onClick={() => principalImageFunc(Image2)} src={Image2} alt="test" />
                        <img className="productImagePng" onClick={() => principalImageFunc(Image)} src={Image} alt="test" />
                        <img className="productImagePng" onClick={() => principalImageFunc(Image2)} src={Image2} alt="test" />
                        <img className="productImagePng" onClick={() => principalImageFunc(Image2)} src={Image2} alt="test" />
                        <img className="productImagePng" onClick={() => principalImageFunc(Image2)} src={Image2} alt="test" />
                        <img className="productImagePng" onClick={() => principalImageFunc(Image)} src={Image} alt="test" />
                        <img className="productImagePng" onClick={() => principalImageFunc(Image)} src={Image} alt="test" />
                        <img className="productImagePng" onClick={() => principalImageFunc(Image)} src={Image} alt="test" />
                        <img className="productImagePng" onClick={() => principalImageFunc(Image2)} src={Image2} alt="test" />
                        <img className="productImagePng" onClick={() => principalImageFunc(Image)} src={Image} alt="test" />
                        <img className="productImagePng" onClick={() => principalImageFunc(Image2)} src={Image2} alt="test" />
                        <img className="productImagePng" onClick={() => principalImageFunc(Image2)} src={Image2} alt="test" />
                        <img className="productImagePng" onClick={() => principalImageFunc(Image2)} src={Image2} alt="test" />
                        <img className="productImagePng" onClick={() => principalImageFunc(Image)} src={Image} alt="test" />
                        <img className="productImagePng" onClick={() => principalImageFunc(Image)} src={Image} alt="test" />
                        <img className="productImagePng" onClick={() => principalImageFunc(Image)} src={Image} alt="test" />    <img className="productImagePng" onClick={() => principalImageFunc(Image2)} src={Image2} alt="test" />
                        <img className="productImagePng" onClick={() => principalImageFunc(Image)} src={Image} alt="test" />
                        <img className="productImagePng" onClick={() => principalImageFunc(Image2)} src={Image2} alt="test" />
                        <img className="productImagePng" onClick={() => principalImageFunc(Image2)} src={Image2} alt="test" />
                        <img className="productImagePng" onClick={() => principalImageFunc(Image2)} src={Image2} alt="test" />
                        <img className="productImagePng" onClick={() => principalImageFunc(Image)} src={Image} alt="test" />
                        <img className="productImagePng" onClick={() => principalImageFunc(Image)} src={Image} alt="test" />
                        <img className="productImagePng" onClick={() => principalImageFunc(Image)} src={Image} alt="test" />
                    </div>
                    <BsArrowDown onClick={() => { buttonRef?.current?.scrollTo({top: buttonRef?.current?.scrollTop + 200, behavior: 'smooth'})}} className="productSliderButtonDown" />
                </div>
                <div className="productPrincipal">
                    <img ref={principalRef} className="productPrincipalImage" src={Image} alt="alt" />
                </div>
                <div className="productOptions">
                    <div className="productPrices">
                        <div className="oldPriceContainer">
                        <div className="productOldPrice">
                            352552,32 lei</div>
                             <div className="productReduced"> 20% </div>
                        </div>
                        <div className="productNewPrice">
                            2353,32 lei
                        </div>
                        <div className="productGreenTax"> Include taxa verde </div>
                        <div className="productStock">
                            În stoc &#10003;
                        </div>
                    </div>
                    <div className="productWarranty">
                        <AiOutlineInfoCircle /> Acest produs include garantie 24 de luni
                    </div>
                    <div className="productBuyButtonContainer">
                       <button className="productBuyButton">  Adaugă în coș </button> 
                    </div>
                    <div className="productFavorite" onClick={() => setIsClicked(!isClicked)}>
                        { !isClicked ? 
                        <> 
                        <BsSuitHeart /> Favorite 
                        </> 
                        : 
                        <> 
                        <div className="favoriteIcon">
                        <BsSuitHeart />  Favorite 
                        </div>
                        </>
                        } 
                        
                    </div>
                    <div className="productServices">
                        <h2 className="servicesTitle">
                            Servicii
                        </h2>
                        <div className="servicesContainer">
                            <div className="serviceName"> Adauga extra garantie </div>
                            <div className="checkboxItem">
                               <input className="checkboxItemType" type="radio" name="warranty" />
                                 1 an - 11 lei
                            </div>
                            <div className="checkboxItem">
                                <input className="checkboxItemType" type="radio" name="warranty" /> 
                                2 ani - 15 lei
                            </div>
                        </div>
                        <div className="servicesContainer">
                            <div className="serviceName"> Adauga serviciu instalare </div>
                            <div className="checkboxItem">
                                <input className="checkboxItemType" type="radio" name="service"/>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et magnam enim aperiam modi mollitia tempore reiciendis 
                            </div>
                            <div className="checkboxItem">
                                <input className="checkboxItemType" type="radio" name="service"/>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, quae?
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="productOffer">
                    Lorem ipsum, dolor sit amet consectetur 
                    Not available right now
                </div> */}
            </div>
            <div className="productDescription">
                <h1 className="productDescriptionTitle"> Descriere </h1> 
                {/* <AiOutlineArrowUp className="productArrowUp"/> */}
                <AiOutlineArrowDown className="productArrowDown"/>
            </div>
            <div className="productSpecifications">
                <h1 className="productSpecificationsTitle"> Specificatii </h1>
                {/* <AiOutlineArrowUp className="productArrowUp"/> */}
                <AiOutlineArrowDown className="productArrowDown"/>
            </div>
            <div className="productRatings">
                <h1 className="productRatingsTitle"> Reviewuri </h1>
                {/* <AiOutlineArrowUp className="productArrowUp"/> */}
                <AiOutlineArrowDown className="productArrowDown"/> 
            </div>
            <div className="productAsk">
                <h1 className="productAskTitle"> Intrebari </h1>
                {/* <AiOutlineArrowUp className="productArrowUp"/> */}
                <AiOutlineArrowDown className="productArrowDown"/>
            </div>
            {/*  recommendations and similars */}
            <div className="productRecommendations">
                <p className="productRecommended"> Produse recomandate </p>
                <div className="productRecommendContainer">
                <CardProduct />
                <CardProduct />
                <CardProduct />
                <CardProduct />
                </div>
                <div className="productRecommendContainer">
                <CardProduct />
                <CardProduct />
                <CardProduct />
                <CardProduct />
                </div>
            </div>
            <div className="productSimilar">
                <p className="productSimilarTitle"> Produse similare </p>
                <div className="productSimilarContainer">
                <CardProduct />
                <CardProduct />
                <CardProduct />
                <CardProduct />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Product