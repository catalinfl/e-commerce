import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initialState, reset } from '../../redux/cartReducer';
import './Cart.scss'

type stateTypes = {
  cart: {
    quantity: number,
    products: {
      id: number,
      name: string,
      price: number,
      quantity: number,
      image: string
    }[],
    total: number,
    name: string // this should be removed
  }
}


const Cart = () => {

  const cartProducts = useSelector((state: stateTypes) => state.cart) 
  console.log(cartProducts)
  const dispatch = useDispatch();

  return (
    <div className="cart">
        <div className="cartContainer">
          <div className="cartContainerTriangle"> </div>
          <div className="cartHeader"> 
            {cartProducts.quantity}
            {cartProducts.quantity > 1 ? ' items ' : ' item '}
            in your cart
            <br />
            {cartProducts?.products[0]?.name}
            <br />
            {/* {cartProducts.products[1].name} */}
            <br />
            {cartProducts.name}
          </div>
          <div className="cardBody">
          <button className="cartClearButton" onClick={() => dispatch(reset())}> Clear the cart </button>
          </div>
        </div>
    </div>
  )
}

export default Cart