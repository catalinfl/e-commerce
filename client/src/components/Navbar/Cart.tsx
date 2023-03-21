import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initialState, reset } from '../../redux/cartReducer';
import './Cart.scss'

type stateTypes = {
  cart: {
    quantity: number,
    products: {
      _id: string,
      name: string,
      price: number,
      quantity: number,
      image: string
    }[],
    total: number,
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
            {cartProducts.products.map(
              (product) => {
                return (
                  <div className="cartProduct">
                    <img src={product.image} alt="" />
                    <div className="cartProductInfo">
                      <span className="cartProductName"> {product.name} </span>
                      <span className="cartProductQuantity"> {product.quantity} </span>
                    </div>
                  </div>
                )
              }
            )}
            <br />
            {/* {cartProducts.products[1].name} */}
            <br />
          </div>
          <div className="cardBody">
          <button className="cartClearButton" onClick={() => dispatch(reset())}> Clear the cart </button>
          </div>
        </div>
    </div>
  )
}

export default Cart