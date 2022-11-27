import './Slider.scss'
import { useState, useEffect, useMemo } from 'react'
import {BsArrowLeftCircle, BsArrowRightCircle} from 'react-icons/bs';
import { FiCircle } from 'react-icons/fi';
import { useRef, createRef } from 'react'
import Image1 from "../../assets/Logo.png"
import Image2 from "../../assets/CartImage.png"
interface Images {
    image: string,
    id: number,
    src: string;
}

type sliderCircleCss = {
    color: string;
}

const Slider: React.FC = () => {
    
    const [imageCount, setImageCount] = useState<number>(0);
    const [present, setPresent] = useState<boolean>(false);
    const [intervalFunctionActive, setIntervalFunctionActive] = useState<boolean>(true);
    
    
    const images: Array<Images> = [
        {image: "image1", id: 0, src: Image1},
        {image: "image2", id: 1, src: Image2},
        {image: "image3", id: 2, src: Image1},
        {image: "image4", id: 3, src: Image2},
        {image: "image5", id: 4, src: Image1},
        {image: "image6", id: 5, src: Image2},
    ]


    // const sliderFunction: Function = (direction: string) => {    
    //     console.log(direction, imageCount);
    //     if ((direction === "left") && (imageCount === 0)) {
    //         return setImageCount(images.length-1);
    //     }
    //     if (direction === "left") {
    //         return setImageCount(imageCount - 1);
    //     }
    //     if ((direction === "right") && (imageCount === images.length - 1)) {
    //         return setImageCount(0);
    //     }
    //     if (direction === "right") {
    //         return setImageCount(imageCount + 1);     
    //     }

    // }

    let slideInterval: any;
    const autoScroll: boolean = true;

  
    const nextSlide = () => {
        console.log(imageCount);
        setImageCount(imageCount === images.length - 1 ? 0 : imageCount + 1);
    }

    const prevSlide = () => {
        console.log(imageCount);
        setImageCount(imageCount === 0 ? images.length - 1 : imageCount - 1);
    }

    const sliderCircleOnClick: Function = (buttonCount: number) => {
        setImageCount(buttonCount);
    }

    useEffect(() => {
        setImageCount(0);
    }, [])


    function imageIntervalSlider() {
        slideInterval = setInterval(() => nextSlide(), 10000);
    }

    useEffect(() => {
        imageIntervalSlider();
        return () => clearInterval(slideInterval);
    }, [imageCount])


    return (
        <div className="slider">
        <div className="sliderContainer">
            <img className={`sliderImage`} src={images[imageCount].src} />        
            <BsArrowLeftCircle onClick={() => prevSlide()} className="sliderLeft" />
            <BsArrowRightCircle onClick={() => nextSlide()} className="sliderRight"/>
        </div>  
        <div className="circlesContainer">
            {images.map((image, id) => 
                <div key={id} className="circles">
                <FiCircle onClick={() => {sliderCircleOnClick(image.id)}} style={imageCount === id ? {backgroundColor: 'green'} : {backgroundColor: 'white'}} className={`sliderCircle test${imageCount}`}/>
                </div>
                )}
            </div>
        </div>
    )
}

export default Slider