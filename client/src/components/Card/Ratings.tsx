import React, { useEffect, useState } from 'react'
import './Ratings.scss'
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from 'react-icons/io'


interface PropsForStars {
  stars?: any | number | (() => number),
  reviews?: number
}


const Ratings: React.FC<PropsForStars> = ({stars, reviews}: PropsForStars) => {


  const [useStars, setUseStars] = useState<number>(stars);
  const [useReviews, setUseReviews] = useState<number | (() => number) | undefined>(reviews);
  
  var fiveStars, fourAndHalfStars, fourStars, threeAndHalfStars, threeStars, twoAndHalfStars, twoStars, oneAndHalfStar, oneStar, zeroStar;

  const createRating = (stars: number) => {
      if (!stars) {
        zeroStar = true;
      }
      if (stars == 5.00) {
        fiveStars = true;
      }
      if (stars >= 4.50 && stars < 5.00) {
        fourAndHalfStars = true;
      }
      if (stars >= 4.00 && stars < 4.50) {
        fourStars = true;
      }
      if (stars >= 3.50 && stars < 4.00) {
        threeAndHalfStars = true;
      }
      if (stars >= 3.00 && stars < 3.50) {
        threeStars = true;
      }
      if (stars >= 2.50 && stars < 3.00) {
        twoAndHalfStars = true;
      }
      if (stars >= 2.00 && stars < 2.50) {
        twoStars = true;
      }
      if (stars >= 1.50 && stars < 2.00) {
        oneAndHalfStar = true;
      }
      if (stars >= 1.00 && stars < 1.50) {
        oneStar = true;
      }
  }
  
  createRating(stars);
  

  return (
    <>
    <div className="cardRating">
    <div className="cardStars">
    { fiveStars ?       
      <>
      <IoMdStar />
      <IoMdStar />
      <IoMdStar />
      <IoMdStar />
      <IoMdStar />
      </>
     : fourAndHalfStars ? 
      <>
      <IoMdStar />
      <IoMdStar />
      <IoMdStar />
      <IoMdStar />
      <IoMdStarHalf />
      </>
      :
      fourStars ?
      <>
      <IoMdStar />
      <IoMdStar />
      <IoMdStar />
      <IoMdStar />
      <IoMdStarOutline />
      </>
      :      
      threeAndHalfStars ? 
      <>
      <IoMdStar />
      <IoMdStar />
      <IoMdStar />
      <IoMdStarHalf />
      <IoMdStarOutline />
      </>
      : threeStars ? 
      <>
      <IoMdStar />
      <IoMdStar />
      <IoMdStar />
      <IoMdStarOutline />
      <IoMdStarOutline />
      </>
      : twoAndHalfStars
      ? 
      <>
      <IoMdStar />
      <IoMdStar />
      <IoMdStarHalf />
      <IoMdStarOutline />
      <IoMdStarOutline />
      </>
      : twoStars ? 
      <>
      <IoMdStar />
      <IoMdStar />
      <IoMdStarOutline />
      <IoMdStarOutline />
      <IoMdStarOutline />
      </>
      : oneAndHalfStar ? 
      <>
      <IoMdStar />
      <IoMdStarHalf />
      <IoMdStarOutline />
      <IoMdStarOutline />
      <IoMdStarOutline />
      </>
      : oneStar ?
      <>
      <IoMdStar />
      <IoMdStarOutline />
      <IoMdStarOutline />
      <IoMdStarOutline />
      <IoMdStarOutline />
      </>
      : zeroStar ? 
      <>
      <IoMdStarOutline />
      <IoMdStarOutline />
      <IoMdStarOutline />
      <IoMdStarOutline />
      <IoMdStarOutline />      
      </> : null
    }
    </div>
    
    
    <p className="cardRatingNumber"> {stars ? useStars : null} ({(reviews == 5) ?  "To do tomorrow" : null} reviews) </p> 
    </div>
      </>
  )
}

export default Ratings