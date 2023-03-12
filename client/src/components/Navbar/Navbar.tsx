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
import axios, { Axios } from 'axios'

const Navbar: React.FC = () => {
    const [openCart, setOpenCart] = useState<boolean>(false);
    const [isFound, setIsFound] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const quantity = useSelector((state: any) => state.cart.quantity)
    const [searchItem, setSearchItem] = useState<any>();


    useEffect(() => {
        axios.get('http://localhost:3001/product')
        .then((responses) => {
            (responses.data.some((response: any) => response.categories === search ? searchingItemFunc(response.categories) : setIsFound(false)))
        })
    }, [search])
    
    const searchingItemFunc = (response: any) => {
        setIsFound(true);
        setSearchItem(response);
    }


    const searchbarFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length >= 3) {
            setSearch(e.target.value)
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