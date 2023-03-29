import './Slider.scss'
import { useState, useEffect, useMemo } from 'react'
import {BsArrowLeftCircle, BsArrowRightCircle} from 'react-icons/bs';
import { FiCircle } from 'react-icons/fi';
import { useRef, createRef } from 'react'
import Image1 from '../../assets/BannerImg1.jpg'
import Image2 from '../../assets/BannerImg2.jpg'
interface Images {
    image: string,
    id: number,
    src: string;
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


    
    let slideInterval: any;
    const autoScroll: boolean = true;

  
    const nextSlide = () => {
        setImageCount(imageCount === images.length - 1 ? 0 : imageCount + 1);
    }

    const prevSlide = () => {
        setImageCount(imageCount === 0 ? images.length - 1 : imageCount - 1);
    }

    const sliderCircleOnClick: Function = (buttonCount: number) => {
        setImageCount(buttonCount);
    }

    useEffect(() => {
        setImageCount(0);
    }, [])

    function imageIntervalSlider() {
        slideInterval = setInterval(() => nextSlide(), 10000)
    }


    useEffect(() => {
        imageIntervalSlider();
        return () => clearInterval(slideInterval);
    }, [imageCount])


    // useEffect(() => {
    //     imageIntervalSlider();
    //     return () => clearInterval(slideInterval);
    // }, [imageCount])



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