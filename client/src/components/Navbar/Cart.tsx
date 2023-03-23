import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initialState, reset } from '../../redux/cartReducer';
import './Cart.scss'

export type stateTypes = {
  cart: {
    totalQuantity: number,
    products: {
      _id: string,
      name: string,
      price: number,
      quantity: number,
      image: string
    }[],
    totalPrice: number,
  }
}


const Cart = () => {


const cartProducts = useSelector((state: stateTypes) => state.cart) // get the cart from redux 
console.log(cartProducts)
const dispatch = useDispatch()




  return (
    <div className="cart">
        <div className="cartContainer">
          <div className="cartContainerTriangle"> </div>
          <div className="cartHeader"> 
            <span className="cartHeaderTitle"> Cart </span>
            {cartProducts.products.map(
              (product, index) => {
                return (
                  <div className="cartProduct" key={index}>
                    <img src={product.image} alt="image" />
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