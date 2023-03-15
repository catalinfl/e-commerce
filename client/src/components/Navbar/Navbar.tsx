import './Navbar.scss'
import { BsCart2 } from 'react-icons/bs'
import { VscAccount } from 'react-icons/vsc'
import { AiOutlineSearch } from 'react-icons/ai'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
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
    const [search, setSearch] = useState<string>("");
    const quantity = useSelector((state: any) => state.cart.quantity)
    const [isBarOn, setIsBarOn] = useState<boolean>(false);
    const [partiallyResponses, setPartiallyResponses] = useState<ProductProps[]>([]);


    const fetchData = async() => { axios.get('http://localhost:3001/product')
    .then(
        (responses: AxiosResponse) => {
            try {
                responses.data.forEach((responseData: ProductProps) => {
                    if ((search.length > 3) && (responseData.name?.toLowerCase().includes(search) || responseData.description?.toLowerCase().includes(search) || (responseData.name?.toLowerCase().includes(search.slice(0, 3))))) {
                        setPartiallyResponses((prevResponses: ProductProps[]) => {
                            const isDuplicate = prevResponses.some((response: ProductProps) => response._id === responseData._id)
                            if (!isDuplicate) {
                                return [...prevResponses, responseData]
                            }
                            return prevResponses;
                        })
                    }
                    else {
                        setPartiallyResponses([])
                    }
                })
            }
            catch(err) {
                console.log(err)
            }
        }
    )
    }


    useEffect(() => {  
        fetchData()
    }, [search])


    const searchbarFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length >= 3) {
            setSearch(e.target.value.toLowerCase())
            setIsBarOn(true);
        }
        else {
            setIsBarOn(false);
        }
    }

    const navigate = useNavigate()
    const location = useLocation();
    const navigateOnClick = (id: string) => {
        navigate(`/product/${id}`)
    }

  return (
    <div className="navbar">
        <div className="navbarContainer">
            <Link to="/"> 
            <img src={Image} alt="logo" className="navLogo" />
            </Link>
            <div className="navSearchbarContainer">
            <input className="navSearchbar" type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => searchbarFunc(e)}/>
            <div className="navSearchbarItemsContainer"> 
            {
            partiallyResponses.map((itemResponse: ProductProps) => {
                return (
                <div className="navSearchbarItem" key={itemResponse._id} onClick={() => navigateOnClick(`${itemResponse._id}`)}> 
                    <div className="navSearchbarItemImage">
                    <img src={itemResponse.img[0]} />
                    </div>
                    <div className="navSearchbarText"> 
                        <div className="navSearchbarItemTitle">
                        <h2> {itemResponse.name} </h2>
                        </div>
                        <div className="navSearchbarItemDesc">
                        <p> {itemResponse.description} </p>
                        </div>
                    </div>    
                </div>
            )
        })
    }
        </div>
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