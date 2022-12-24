import React, { useEffect, useState } from 'react'
import './Ratings.scss'
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from 'react-icons/io'


interface PropsForStars {
  stars: number | (() => number) 
  reviews?: number
}


const Ratings: React.FC<PropsForStars> = ({stars, reviews}: PropsForStars) => {


  const [useStars, setUseStars] = useState<number>(stars as number);
  const [useReviews, setUseReviews] = useState<number | (() => number) | undefined>(reviews);
  
  if (reviews === 0) {
    stars = 0;
  }
  

  return (
    <>
    <div className="cardRating">
    <div className="cardStars">
    { 
    (stars == 5.00) ?       
      <>
      <IoMdStar />
      <IoMdStar />
      <IoMdStar />
      <IoMdStar />
      <IoMdStar />
      </>
     : (stars >= 4.50 && stars < 5.00) ? 
      <>
      <IoMdStar />
      <IoMdStar />
      <IoMdStar />
      <IoMdStar />
      <IoMdStarHalf />
      </>
      : (stars >= 4.00 && stars < 4.50) ?
      <>
      <IoMdStar />
      <IoMdStar />
      <IoMdStar />
      <IoMdStar />
      <IoMdStarOutline />
      </>
      : (stars >= 3.50 && stars < 4.00) ? 
      <>
      <IoMdStar />
      <IoMdStar />
      <IoMdStar />
      <IoMdStarHalf />
      <IoMdStarOutline />
      </>
      : (stars >= 3.00 && stars < 3.50) ? 
      <>
      <IoMdStar />
      <IoMdStar />
      <IoMdStar />
      <IoMdStarOutline />
      <IoMdStarOutline />
      </>
      : (stars >= 2.50 && stars < 3.00) ? 
      <>
      <IoMdStar />
      <IoMdStar />
      <IoMdStarHalf />
      <IoMdStarOutline />
      <IoMdStarOutline />
      </>
      : (stars >= 2.00 && stars < 2.50) ? 
      <>
      <IoMdStar />
      <IoMdStar />
      <IoMdStarOutline />
      <IoMdStarOutline />
      <IoMdStarOutline />
      </>
      : (stars >= 1.50 && stars < 2.00) ? 
      <>
      <IoMdStar />
      <IoMdStarHalf />
      <IoMdStarOutline />
      <IoMdStarOutline />
      <IoMdStarOutline />
      </>
      : (stars >= 1.00 && stars < 1.50) ? 
      <>
      <IoMdStar />
      <IoMdStarOutline />
      <IoMdStarOutline />
      <IoMdStarOutline />
      <IoMdStarOutline />
      </>
      : (stars === 0) ? 
      <>
      <IoMdStarOutline />
      <IoMdStarOutline />
      <IoMdStarOutline />
      <IoMdStarOutline />
      <IoMdStarOutline />      
      </> : null
    }
    </div>
    <p className="cardRatingNumber"> {stars ? useStars : null}       ({reviews} reviews) </p> 
    </div>
      </>
  )
}

export default Ratings