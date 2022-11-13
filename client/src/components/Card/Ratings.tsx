import React from 'react'
import './Ratings.scss'
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from 'react-icons/io'


const Ratings: React.FC = () => {
  return (
    <div className="cardRating">
    <div className="cardStars">
    <IoMdStar />
    <IoMdStar/>
    <IoMdStar/>
    <IoMdStarHalf/>
    <IoMdStarOutline/>
    </div>
    <p className="cardRatingNumber">3.5 (5 reviews) </p> 
    </div>
  )
}

export default Ratings