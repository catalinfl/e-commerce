import React from 'react'
import CardProduct from '../Card/CardProduct'
import Image from "../../assets/CartImage.png"


const TopOfertsCards: React.FC = () => {
  return (
    <>
    <CardProduct price={"300"} oldPrice={"500"} title={"ba stelica"} rating={"3.8"} image={Image}/>
    <CardProduct price={"300"} oldPrice={"500"} title={"ba stelica"} rating={"3.8"} image={Image}/>
    <CardProduct price={"300"} oldPrice={"500"} title={"ba stelica"} rating={"3.8"} image={Image}/>
    <CardProduct price={"300"} oldPrice={"500"} title={"ba stelica"} rating={"3.8"} image={Image}/>
    <CardProduct price={"300"} oldPrice={"500"} title={"ba stelica"} rating={"3.8"} image={Image}/>
    <CardProduct price={"300"} oldPrice={"500"} title={"ba stelica"} rating={"3.8"} image={Image}/>
    <CardProduct price={"300"} oldPrice={"500"} title={"ba stelica"} rating={"3.8"} image={Image}/>
    </>
    )
}

export default TopOfertsCards