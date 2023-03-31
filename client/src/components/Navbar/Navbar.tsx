import './Navbar.scss'
import { BsCart2 } from 'react-icons/bs'
import { VscAccount } from 'react-icons/vsc'
import { AiOutlineConsoleSql, AiOutlineSearch } from 'react-icons/ai'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import Cart, { stateTypes } from './Cart'
import Image from '../../assets/Logo.png'
import { useSelector } from 'react-redux'
import { GiHamburgerMenu } from 'react-icons/gi'
import axios, { Axios, AxiosResponse } from 'axios'
import CartImage from '../../assets/CartImage.png'
import { ProductProps } from '../Product/Product'



const Navbar = () => {
    
    const [openCart, setOpenCart] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const [isBarOn, setIsBarOn] = useState<boolean>(false);
    const [partiallyResponses, setPartiallyResponses] = useState<ProductProps[]>([]);
    const [category, setCategory] = useState<string>("");
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const location = useLocation();
    const navigate = useNavigate()


    
    const fetchData = () => { axios.get('http://localhost:3001/product')
    .then(
        (responses: AxiosResponse) => {
            try {
                if (search.length > 3) {
                responses.data.forEach((responseData: ProductProps) => {
                    if (responseData.name?.toLowerCase().includes(search) || responseData.description?.toLowerCase().includes(search) || responseData.name?.toLowerCase().includes(search.slice(0, 3))) {
                        setPartiallyResponses((prevResponses: ProductProps[]) => {
                            const isDuplicate = prevResponses.some((response: ProductProps) => response._id === responseData._id)
                            if (!isDuplicate) {
                                return [...prevResponses, responseData]
                            }
                            return prevResponses;
                        })
                    }
            
                })
            }
            else {
                setPartiallyResponses([])
            }
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

    
    const verifyCategory = () => {
        var param  = location.pathname.split('/')[2]
        if (category === param || category === undefined) {
            setIsMenuOpen(false)
        }
        else {
            setIsMenuOpen(true)
        }
    }

    useEffect(() => {
        verifyCategory()
    })

    const searchbarFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length >= 3) {
            setSearch(e.target.value.toLowerCase())
            setIsBarOn(true);
        }
        else {
            setIsBarOn(false);
        }
    }




    const navigateOnClick = (id: string) => {
    
        // search by product 
        navigate(`/product/${id}`)
    }

    useEffect(() => {
        if (category === "" || category === undefined)    {
            setCategory(location.pathname.split('/')[2])
        }
    }, [isMenuOpen])
    


    const keyListener = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setCategory(partiallyResponses[0]?.categories?.toLowerCase() as string);
        if (e.ctrlKey && e.key === 'a') {
            setPartiallyResponses([])
        }

        // search category
        if (e.key === "Enter" && category) {
            navigate(`/search/${category}`)
        }
    }



    const productsMaxQuantity = useSelector((state: stateTypes) => state.cart.totalQuantity)    

  return (
    <div className="navbar">
        <div className="navbarContainer">
            <Link to="/"> 
            <img src={Image} alt="logo" className="navLogo" />
            </Link>
            <div className="navSearchbarContainer">
            <input className="navSearchbar" type="text" onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => { keyListener(e) }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => searchbarFunc(e)}/>
           { isMenuOpen && <div className="navSearchbarItemsContainer"> 
                { partiallyResponses[0]?.categories?.toLowerCase() && <div className="navSearchbarItem">
                    <div className="navSearchbarItemTitle grey" onClick={() => navigate(`/search/${partiallyResponses[0]?.categories?.toLowerCase()}`)}>
                        <h2> Mai multe căutari pentru {partiallyResponses[0]?.categories?.toLowerCase()}... </h2>
                        </div>
                </div>}
            {
                isBarOn &&
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
        </div>}
            <AiOutlineSearch className="navIcon"/>
            </div>
            <div className="navButtons"> 
            <button className="navButtonCart" onClick={() => setOpenCart(!openCart)}> <BsCart2 /> Cart <span className="circleQuantity">  {productsMaxQuantity} </span> </button>
            {openCart && <Cart />}
            <button className="navButtonAccount"> <VscAccount/> Login </button>
            </div>
            <GiHamburgerMenu className="navHamburger"/>
        </div>
    </div>
    )
}

export default Navbar