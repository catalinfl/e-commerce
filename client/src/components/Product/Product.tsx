import React, { RefObject, MutableRefObject, useRef } from 'react'
import './Product.scss'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import { BsSuitHeart } from "react-icons/bs"
import { AiOutlineInfoCircle, AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai"
import Image from '../../assets/CartImage.png'
import Image2 from '../../assets/Logo.png'
import CardProduct from '../Card/CardProduct'
import { IconType } from 'react-icons'
import { useState, useEffect } from "react"
import { publicRequest } from '../../requestMethods'
import { useLocation } from 'react-router-dom'
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi"
import { MdWarning } from "react-icons/md"
import { Checkbox } from 'pretty-checkbox-react'
import '@djthoms/pretty-checkbox';
import { useDispatch } from 'react-redux'
import { addProduct } from '../../redux/cartReducer'

export type ProductProps = {
    name?: string;
    price: string;
    warranty?: string,
    description?: string,
    specifications?: string,
    reviewStars?: string,
    reviewComments?: string | any,
    installService?: string,
    ask?: String | String[],
    images?: string | undefined,
    categories?: string,
    subcategory?: string,
    productCode?: string,
    inStock?: string,
    _id?: string
    img: Array<string>,
    oldPrice: string,
    top?: boolean
}


const Product = (props: any) => {

    const principalRef = useRef<HTMLImageElement>(null);
    const photoRef = useRef<HTMLImageElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const dispatch = useDispatch()
    // const favoriteRef = React.forwardRef<HTMLButtonElement>(null);


    const principalImageFunc: Function = (name: string) => {
        if (principalRef.current === null) {
            console.log("Error");
        }
        else {
        principalRef.current.src = `${name}`;
        }
    }
  
   
   
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [product, setProduct] = useState<any>({img: [], price: "0", oldPrice: "0"});
  
  
  const [isProdDescOpen, setIsProdDescOpen] = useState<boolean>(true);
  const [isProdSpecOpen, setIsProdSpecOpen] = useState<boolean>(false);
  const [isProdReviewOpen, setIsProdReviewOpen] = useState<boolean>(false);
  const [isProdAskOpen, setIsProdAskOpen] = useState<boolean>(false);
  const [warning, setWarning] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  

  const openTabFunction: Function = (path: string) => {
        if (path === 'desc') {
            setIsProdDescOpen(!isProdDescOpen);
        }
        if (path === 'spec') {
            setIsProdSpecOpen(!isProdSpecOpen);
        }
        if (path === 'review') {
            setIsProdReviewOpen(!isProdReviewOpen);
        }
        if (path === 'ask') {
            setIsProdAskOpen(!isProdAskOpen);
        }
    }
  
   useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/product/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);


  var precision: string;
  var reductionColor: string;

  const calculatePercent: Function = (oldPrice: string, price: string): string => {    
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
    const comparePrices: Function = (price: string, oldPrice: string): boolean | undefined => {
        if (oldPrice > price) {
           return true;
        }
        else false;
    }   

    const [checkbox1, setCheckbox1] = useState<boolean>(false);
    const [checkbox2, setCheckbox2] = useState<boolean>(false);


    var priceConverted: string;
    var priceInNumber: number;

    const checkNumber = (price: string): string => {
        priceInNumber = parseInt(price);
        if (priceInNumber >= 1000) {
            var step: number = 0;
            if (priceInNumber / 1000 < 10) {
                step = 1;
            } 
            if (priceInNumber / 1000 > 10) {
                step = 2;
            } 
            if (priceInNumber / 1000 > 100) {
                step = 3;
            }     
            priceConverted = price.slice(0, step) + "." + price.slice(step, price.length); 
        }
        else priceConverted = price;
        return priceConverted;
    }

    const onChangeCheckbox: Function = (checkbox: string): void => {
        switch(checkbox) {
            case "checkbox1": {
                if (!checkbox1 && !checkbox2) {
                    setCheckbox1(true);
                    return;
                }
                if (checkbox1 && !checkbox2) {
                    setCheckbox1(false);
                    return;
                }
                if (!checkbox1 && checkbox2) {
                    setCheckbox2(false);
                    setCheckbox1(true);
                }            
            }
            case "checkbox2": {
                if (!checkbox1 && !checkbox2) {
                    setCheckbox2(true);
                    return;
                }
                if (!checkbox1 && checkbox2) {
                    setCheckbox2(false);
                    return;
                }
                if (checkbox1 && !checkbox2) {
                    setCheckbox1(false);
                    setCheckbox2(true);
                }            
            }
        }
    }


    precision = calculatePercent(product.oldPrice, product.price);

    reductionColor = reductionColorCalculator(precision);

    const checkboxRef1 = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;    
    const checkboxRef2 = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;
    const warningRef = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>

    const countQuantity = (direction: string) => {
        if (quantity === 1 && direction === "minus") {
            return setQuantity(1);
        }
        if (direction === "minus") {
            setQuantity(quantity - 1);
        }
        if (direction === "plus") {
            setQuantity(quantity + 1);
        }
        if ((direction === "plus") && (quantity === 10)) {
            setWarning(true);
            setQuantity(10);
        }
    }

    const handleClick = () => {
        dispatch(addProduct({...product, quantity, price: product.price * quantity}))
    }

    return (
    <div className="product">
        <div className="productContainer">
            <p className="productCategory">
            {product.categories} / {product.subcategory} / <span className="productC"> {product.name} </span>
            </p>
            <h1 className="productTitle">
                {product.name}
            </h1>
            <p className="productCode">
                Cod produs: {product.productCode}
            </p>
            <p className="productRating">
                {product.reviewStars ? `${product.reviewStars} persoane au evaluat acest produs` : "Fii primul care evalueaza acest produs"}
            </p>
            <div className="productPrincipalContainer">
                <div className="productSlider">
                    <BsArrowUp onClick={() => buttonRef?.current?.scrollTo({ top: buttonRef?.current?.scrollTop - 200, behavior: 'smooth' })}className="productSliderButtonUp"/>
                    <div ref={buttonRef} className="productImageContainer">
                        { product.img.map((prod: string, index: number) => 
                            <img className="productImagePng" onClick={() => principalImageFunc(product.img[index])} key={index} src={prod}/>
                        ) 
                        }
                    </div>
                    <BsArrowDown onClick={() => { buttonRef?.current?.scrollTo({top: buttonRef?.current?.scrollTop + 200, behavior: 'smooth'})}} className="productSliderButtonDown" />
                </div>
                <div className="productPrincipal">
                    <img ref={principalRef} className="productPrincipalImage" src={product.img[0]} alt="alt" />
                </div>
                <div className="productOptions">
                    <div className="productPrices">
                        <div className="oldPriceContainer">
                            { (comparePrices(product.price, product.oldPrice)) && <div className="productOldPrice"> 
                            {checkNumber((parseInt(product.oldPrice) * quantity).toString())} lei
                             </div>  }
                            {(comparePrices(product.price, product.oldPrice)) && <div className={`productReduced ${reductionColor}`}> {precision}% </div>}
                        </div>
                        <div className="productNewPrice">
                            {checkNumber((parseInt(product.price) * quantity).toString())} lei
                        </div>
                        <div className="productGreenTax"> Include taxa verde </div>
                            {product.inStock === "yes" ? 
                        <div className={`productStock ${product.inStock}`}>
                            In stoc &#10003; 
                        </div>
                            : null}
                    </div>
                    <div className="productWarranty">
                        <AiOutlineInfoCircle /> Acest produs include garantie {product.warranty}
                    </div>
                    
                    <div className="productBuyButtonContainer">
                       <button onClick={handleClick}className="productBuyButton">  Adaugă în coș </button> 
                    </div>
                    <div className="productFavorite" onClick={() => setIsClicked(!isClicked)}>
                        { !isClicked ? 
                        <> 
                        <BsSuitHeart style={{color: 'black'}}/> <span style={{color: 'grey'}}> Favorite </span>
                        </> 
                        : 
                        <> 
                        <div className="favoriteIcon">
                        <BsSuitHeart />  Favorite 
                        </div>
                        </>
                        } 
                    </div>
                    <div className="productQuantity">
                        <p className="productQuantityText"> Cantitatea dorită </p>
                        <div className="quantityCart">
                            <FiMinusCircle style={{cursor: 'pointer'}} onClick={() => countQuantity("minus")}/>
                            <h5> {quantity} </h5>
                            <FiPlusCircle style={{cursor: 'pointer'}} onClick={() => countQuantity("plus")}/>
                        </div>
                    </div>
                    {warning &&
                    <div ref={warningRef} onClick={() => setWarning(false)} className={`quantityWarning ${warning && "onClick"}`}> 
                    <p> Canitatea maxima admisa este 10 <MdWarning style={{color: 'red', fontSize: '25px', marginLeft: '10px'}}/>  </p>
                    </div>
                    }
                    <div className="productServices">
                        <h2 className="servicesTitle">
                            Servicii
                        </h2>
                        <div className="servicesContainer">
                            <div className="serviceName"> Adauga extra garantie </div>
                            <div className="checkboxItem">
                                <Checkbox className="checkboxItemType" color="success"ref={checkboxRef1} checked={checkbox1} onChange={() => onChangeCheckbox("checkbox1")} id="extrawarranty" name="warranty" />
                                 1 an - 100 lei
                            </div>
                            <div className="checkboxItem">
                                <Checkbox className="checkboxItemType" color="success" ref={checkboxRef2} checked={checkbox2} onChange={() => onChangeCheckbox("checkbox2")} id="extrawarranty" name="warranty" /> 
                                2 ani - 180 lei
                            </div>
                        </div>
                        { product.installService!=="" ? <div className="servicesContainer">
                            <div className="serviceName"> Adauga serviciu instalare </div>
                            <div className="checkboxItem">
                                <input className="checkboxItemType" type="radio" />
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et magnam enim aperiam modi mollitia tempore reiciendis 
                            </div>
                            <div className="checkboxItem">
                                <input className="checkboxItemType"  type="radio" />
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, quae?
                            </div>
                        </div> : null}
                    </div>
                </div>
                {/* <div className="productOffer">
                    Lorem ipsum, dolor sit amet consectetur 
                    Not available right now
                </div> */}
            </div>
        <div className="productAboutContainer">
            <div className="productDescription" onClick={() => openTabFunction('desc')}>
                <h1 className="productDescriptionTitle"> Descriere </h1> 
                {isProdDescOpen ? 
                <AiOutlineArrowUp className="productArrowUp"/>
                :
                <AiOutlineArrowDown className="productArrowDown"/>
                }
            </div>
                {/* <AiOutlineArrowUp className="productArrowUp"/> */}
                {isProdDescOpen ? 
                <p> {product.description} </p>
                : null
                }
        </div>
        <div className="productAboutContainer">
            <div className="productSpecifications" onClick={() => openTabFunction('spec')}>
                <h1 className="productSpecificationsTitle"> Specificatii </h1>
                {isProdSpecOpen ? 
                <AiOutlineArrowUp className="productArrowUp"/>
                :
                <AiOutlineArrowDown className="productArrowDown"/>
                }
            </div>
                {/* <AiOutlineArrowUp className="productArrowUp"/> */}
                {isProdSpecOpen ? 
                <p> {product.specifications} </p>
                : null
                }
        </div>
        <div className="productAboutContainer">
            <div className="productReviews" onClick={() => openTabFunction('review')}>
                <h1 className="productReviewsTitle"> Reviewuri </h1>
                {isProdReviewOpen ? 
                <AiOutlineArrowUp className="productArrowUp"/>
                :
                <AiOutlineArrowDown className="productArrowDown"/>
                }
            </div>
                {/* <AiOutlineArrowUp className="productArrowUp"/> */}
                { product.reviewComments ? isProdReviewOpen ? 
                <>
                {product.reviewComments}
                </>
                : null : <p> Nu sunt reviewuri disponibile. </p>
                }
        </div>
        <div className="productAboutContainer">
            <div className="productAsk" onClick={() => openTabFunction('ask')}>
                <h1 className="productAskTitle"> Intrebari </h1>
                {isProdAskOpen ? 
                <AiOutlineArrowUp className="productArrowUp"/>
                :
                <AiOutlineArrowDown className="productArrowDown"/>
                }
            </div>
                {/* <AiOutlineArrowUp className="productArrowUp"/> */}
                {isProdAskOpen ? 
                <p> {product.ask} </p>
                : null
                }
        </div>
            <div className="productRecommendations">
            {/*  recommendations and similars */}
                <p className="productRecommended"> Produse recomandate </p>
                <div className="productRecommendContainer">
                { /* aici merg card producturile */}
                </div>
                <div className="productRecommendContainer">
                { /* alta zona de card producturi */ }
                </div>
            </div>
            <div className="productSimilar">
                <p className="productSimilarTitle"> Produse similare </p>
                <div className="productSimilarContainer">
                {/* <CardProduct />
                <CardProduct />
                <CardProduct />
                <CardProduct /> */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Product