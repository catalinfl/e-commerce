import './Navbar.scss'
import { BsCart2 } from 'react-icons/bs'
import { VscAccount } from 'react-icons/vsc'
import { AiOutlineSearch } from 'react-icons/ai'
import { Link, Navigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import Cart from './Cart'
import Image from '../../assets/Logo.png'
import { useSelector } from 'react-redux'
import { GiHamburgerMenu } from 'react-icons/gi'
import axios, { Axios, AxiosResponse } from 'axios'
import CartImage from '../../assets/CartImage.png'
import { ProductProps } from '../Product/Product'
import { AxiosHeaders } from "axios"


const Navbar: React.FC = () => {
    const [openCart, setOpenCart] = useState<boolean>(false);
    const [isFound, setIsFound] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const quantity = useSelector((state: any) => state.cart.quantity)
    const [searchItem, setSearchItem] = useState<any>();
    const [isBarOn, setIsBarOn] = useState<boolean>(false);
    const [partiallyResponses, setPartiallyResponses] = useState<any[]>([]);


    useEffect(() => {
        axios.get('http://localhost:3001/product')
        .then(
            async (responses: AxiosResponse) => {
                try {
                    responses.data.forEach((responseData: any) => {
                        if (search.length > 5 && responseData.name?.toLowerCase().includes(search) && responseData.description?.toLowerCase().includes(search)) {
                            setPartiallyResponses((prevResponses: any) => {
                                const isDuplicate = prevResponses.some((response: any) => response._id === responseData._id)
                                if (!isDuplicate) {
                                    return [...prevResponses, responseData]
                                }
                                return prevResponses;
                            })
                        }
                    })
                }
                catch(err) {
                    console.log(err)
                }
            }
        )
    }, [search])

    console.log(partiallyResponses)

    const searchingItemFunc = (response: any) => {
        setIsFound(true);
        setSearchItem(response);
    }

    const searchbarFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length >= 3) {
            setSearch(e.target.value.toLowerCase())
            setIsBarOn(true);
        }
        else {
            setIsBarOn(false);
        }
    }

  return (
    <div className="navbar">
        <div className="navbarContainer">
            <Link to="/"> 
            <img src={Image} alt="logo" className="navLogo" />
            </Link>
            <div className="navSearchbarContainer">
            <input className="navSearchbar" type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => searchbarFunc(e)}/> 
            {isBarOn ?
            <div className="navSearchbarItemContainer"> 
                <div className="navSearchbarItem"> 
                    <div className="navSearchbarItemImage">
                    <img src={CartImage} />
                    </div>
                    <div className="navSearchbarText"> 
                        <div className="navSearchbarItemTitle">
                        <h2> {search} </h2>
                        </div>
                        <div className="navSearchbarItemDesc">
                        <p> this is desc</p>
                        </div>
                    </div>    
                </div>
            </div>
            : null}
            <AiOutlineSearch className="navIcon"/>
            </div>
            <div className="navButtons"> 
            <button className="navButtonCart" onClick={() => setOpenCart(!openCart)}> <BsCart2 /> Cart <span className="circleQuantity">  {quantity} </span> </button>
            {openCart && <Cart />}
            <button className="navButtonAccount"> <VscAccount/> Login </button>
            </div>
            <GiHamburgerMenu className="navHamburger"/>
        </div>
    </div>
    )
}

export default Navbar