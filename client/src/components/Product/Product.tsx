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
  
    interface productProps {
        name?: string;
        price?: string;
        warranty?: string,
        description?: string,
        specifications?: string,
        reviewStars?: string,
        reviewComments?: string,
        installService?: string,
        ask?: String | String[],
        images?: string | undefined,
        categories?: string,
        subcategory?: string,
        productCode?: string,
        inStock?: string,
        img: Array<string>,
        oldPrice?: string
    }

      
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [product, setProduct] = useState<productProps>({img: []});
  
  
  const [isProdDescOpen, setIsProdDescOpen] = useState<boolean>(true);
  const [isProdSpecOpen, setIsProdSpecOpen] = useState<boolean>(false);
  const [isProdReviewOpen, setIsProdReviewOpen] = useState<boolean>(false);
  const [isProdAskOpen, setIsProdAskOpen] = useState<boolean>(false);
  

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


    const onChangeCheckbox: Function = (): void => {
        if (checkboxRef1.current.checked) {
            console.log("case 1");
            setCheckbox1(true);
            setCheckbox2(false);
        }
        if (!checkboxRef1.current.checked) {
            console.log("case 2");
            setCheckbox1(false);
        }
        if (checkbox2 && checkboxRef1.current.checked) {
            console.log("case 3");
            setCheckbox2(false);
            setCheckbox1(true);
        }
        if (checkboxRef2.current.checked) {
            console.log("case 4");
            setCheckbox1(false);
            setCheckbox2(true);
        }
        if (!checkboxRef2.current.checked) {
            console.log("case 5");
            setCheckbox2(false);
        }
    }


    precision = calculatePercent(product.oldPrice, product.price);

    reductionColor = reductionColorCalculator(precision);
    // const sliderButton: Function = (direction: string) => {
    //     if (direction === "up") {
    //         buttonRef?.current?.scrollTo(0, 0);
    //     }
    //     if (direction === "down") {

    //     }
    // }

    const checkboxRef1 = useRef<any>();    
    const checkboxRef2 = useRef<any>();
   
    const refe = React.useRef<any>();

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
                    <img ref={principalRef} className="productPrincipalImage" src={Image} alt="alt" />
                </div>
                <div className="productOptions">
                    <div className="productPrices">
                        <div className="oldPriceContainer">
                            { (comparePrices(product.price, product.oldPrice)) ? <div className="productOldPrice"> {product.oldPrice} lei </div> : null  }
                            {(comparePrices(product.price, product.oldPrice)) ? <div className={`productReduced ${reductionColor}`}> {precision}% </div> : null}
                        </div>
                        <div className="productNewPrice">
                        {product.price} lei
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
                       <button className="productBuyButton">  Adaugă în coș </button> 
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
                    <div className="productServices">
                        <h2 className="servicesTitle">
                            Servicii
                        </h2>
                        <div className="servicesContainer">
                            <div className="serviceName"> Adauga extra garantie </div>
                            <div className="checkboxItem">
                               <input className="checkboxItemType" ref={checkboxRef1} checked={checkbox1} onChange={() => onChangeCheckbox()} type="checkbox" id="extrawarranty" name="warranty" />
                                 1 an - 100 lei
                            </div>
                            <div className="checkboxItem">
                                <input className="checkboxItemType" ref={checkboxRef2} checked={checkbox2} onChange={() => onChangeCheckbox()} id="extrawarranty" type="checkbox" name="warranty" /> 
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
                <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque, dolor? </p>
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
                <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque, dolor? </p>
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
                {isProdReviewOpen ? 
                <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque, dolor? </p>
                : null
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
                <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque, dolor? </p>
                : null
                }
        </div>
            <div className="productRecommendations">
            {/*  recommendations and similars */}
                <p className="productRecommended"> Produse recomandate </p>
                <div className="productRecommendContainer">
                <CardProduct price={"150"} oldPrice={"250"} title={"Salut"} image={"test"} rating={"3.3"} reviews={"3"}/>
                <CardProduct price={"120"} oldPrice={"125"} title={"mihai"} image={"img2"} rating={"3.5"} reviews={"5"}/>
                <CardProduct price={"350"} oldPrice={"450"} title={"lol"} image={"img3"} rating={"3.8"} reviews={"15"}/>
                <CardProduct price={"250"} oldPrice={"25000"} title={"mircea"} image={"img4"} rating={"5"} reviews={"20"}/>
                </div>
                <div className="productRecommendContainer">
                {/* <CardProduct />
                <CardProduct />
                <CardProduct />
                <CardProduct /> */}
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