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


const cartProducts = useSelector((state: stateTypes) => state.cart) 
const dispatch = useDispatch()




  return (
    <div className="cart">
        <div className="cartContainer">
          <div className="cartContainerTriangle"> </div>
            <span className="cartHeaderTitle"> Cart </span>
            <div className="cartAllProducts">
            {cartProducts.totalQuantity !== 0 ? 
            cartProducts.products.map(
              (product, index) => {
                return (
                  <div className="cartProduct" key={index}>
                    <div className="cartProductInfo">
                      <div className="cartProductImage">
                      <img src={product.image} 
                      alt="image" />
                      </div>
                      <div className="cartProductColumn" >
                      <span className="cartProductName"> {product.name.length > 25 ? `${product.name.slice(0, 25)}...` : product.name } </span>
                      </div>
                      <span className="cartProductQuantity"> x{product.quantity} </span>
                      <span className="cartProductPrice">
                        {product.price} lei
                      </span>
                    </div>
                  </div>
                )
              }
            )
          : <div className="cartProduct noProd"> There are no products currently in cart </div>
          }
          </div>
          <div className="cartMisc">
            { cartProducts.totalPrice !== 0 && <div className="cartTotal">
              <span className="cartTotalTitle"> Total: </span>
              <span className="cartTotalPrice"> {cartProducts.totalPrice} lei </span>
            </div>}
          {
            cartProducts.totalQuantity !== 0 &&
            <button className="cartClearButton" onClick={() => dispatch(reset())}> Clear the cart </button>
          }
          </div>
        </div>
    </div>
  )
}

export default Cart