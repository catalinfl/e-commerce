import './Slider.scss'
import { useState, useEffect } from 'react'
import {BsArrowLeftCircle, BsArrowRightCircle} from 'react-icons/bs';
import { FiCircle } from 'react-icons/fi';
import { useRef, createRef } from 'react'

interface Images {
    image: string,
    id: number,
    color: string
}

type sliderCircleCss = {
    color: string;
}

const Slider: React.FC = () => {
    
    const [imageCount, setImageCount] = useState<number>(0);
    const [present, setPresent] = useState<boolean>(false);
    const [intervalFunctionActive, setIntervalFunctionActive] = useState<boolean>(true);
    
    
    const images: Array<Images> = [
        {image: "image1", id: 0, color: "#ff0000"},
        {image: "image2", id: 1, color: "#00ffff"},
        {image: "image3", id: 2, color: "#000000"},
        {image: "image4", id: 3, color: "#000fff"},
        {image: "image5", id: 4, color: "#cccfff"},
        {image: "image6", id: 5, color: "#00ff00"},
    ]


    const sliderFunction: Function = (direction: string) => {    
        if ((direction === "left") && (imageCount > 0)) {
            setImageCount(imageCount - 1);
        }
        if ((direction === "right") && (imageCount < images.length - 1)) {
            setImageCount(imageCount + 1);            
        }
        if ((imageCount === images.length - 1) && (direction === "right")) {
            setImageCount(0);
        }
        if ((imageCount === 0) && (direction === "left")) {
            setImageCount(images.length - 1);
        }
    }


    
    const sliderCircleOnClick: Function = (buttonCount: number) => {
        setImageCount(buttonCount);
    }


    

    return (
    <div className="slider">
        <div className="sliderContainer" style={{backgroundColor: `${images[`${imageCount}`].color}`}}>
            <div className="circlesContainer">
            {images.map((image, id) => 
            <div key={id} className="circles">
            <FiCircle onClick={() => {sliderCircleOnClick(image.id)}} className={`sliderCircle`} style={{marginLeft: '3px'}}/>
            </div>)}
            </div>
            <BsArrowLeftCircle onClick={() => sliderFunction("left")} className="sliderLeft" />
            <BsArrowRightCircle onClick={() => sliderFunction("right")} className="sliderRight"/>
        </div>
    </div>
    )
}

export default Slider