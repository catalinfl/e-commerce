import React from 'react'
import './TopOferts.scss'
import TopOfertsCards from './TopOfertsCards'

const TopOferts: React.FC = () => {
  return (
    <div className="topOferts">
        <div className="topOfertsContainer">
            <h1> Top products &#9889; </h1>
            <div className="cardsContainer">
                <TopOfertsCards />
            </div>
        </div>
    </div>
    )
}

export default TopOferts