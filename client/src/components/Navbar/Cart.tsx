import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reset } from '../../redux/cartReducer';
import './Cart.scss'


const Cart = () => {

  const cartProducts = useSelector((state: any) => state.cart) 
  console.log(cartProducts)
  const dispatch = useDispatch();

  return (
    <div className="cart">
        <div className="cartContainer">
          <div className="cartContainerTriangle"> </div>
          <div className="cartHeader"> 
            {cartProducts.quantity}
          </div>
          <div className="cardBody">
          <button className="cartClearButton" onClick={() => dispatch(reset())}> Clear the cart </button>
          </div>
        </div>
    </div>
  )
}

export default Cart