import './Navbar.scss'
import { BsCart2 } from 'react-icons/bs'
import { VscAccount } from 'react-icons/vsc'
import { AiOutlineSearch } from 'react-icons/ai'
import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Cart from './Cart'
import Image from '../../assets/Logo.png'
import { useSelector } from 'react-redux'


const Navbar: React.FC = () => {
    const [openCart, setOpenCart] = useState<boolean>(false);

    const quantity = useSelector((state: any) => state.cart.quantity)

  return (
    <div className="navbar">
        <div className="navbarContainer">
            <Link to="/"> 
            <img src={Image} alt="logo" className="navLogo" />
            </Link>
            <div className="navSearchbarContainer">
            <input className="navSearchbar" type="text"/> 
            <AiOutlineSearch className="navIcon"/>
            </div>
            <button className="navButtonCart" onClick={() => setOpenCart(!openCart)}> <BsCart2 /> Cart <span className="circleQuantity">  {quantity} </span> </button>
            {openCart && <Cart />}
            <button className="navButtonAccount"> <VscAccount/> Login </button>
        </div>
    </div>
    )
}

export default Navbar