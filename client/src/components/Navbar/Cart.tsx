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
          <button onClick={() => dispatch(reset())}> test </button>
            {cartProducts.quantity}
        </div>
    </div>
  )
}

export default Cart