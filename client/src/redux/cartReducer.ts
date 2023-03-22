import { createSlice, PayloadAction, StateFromReducersMapObject } from "@reduxjs/toolkit"

export type initialState = {
    products: ProductType[];
    totalQuantity: number;
    totalPrice?: number;
  };

type Action = {
    type: string
    payload: {
        totalQuantity: number,
        products: {
            _id: string,
            name: string,
            price: number,
            quantity: number,
            image: string
        },
        totalPrice?: number
    }
}

type ProductType = {
    price: number
    _id: string
    quantity: number,
    name: string
}

type ActionOptional = {
    type: string
    payload?: {
        totalQuantity: number,
        products: {
            _id: string,
            name: string,
            price: number,
            quantity: number,
            image: string
        },
        totalPrice?: number
    }
}



const initialState: initialState = {
    products: [],
    totalQuantity: 0,
    totalPrice: 0,
}

// create slice
    

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state: initialState, action: Action) => {
            if (state.products.filter((product: ProductType) => product._id === action.payload.products._id).length > 0) {
                state.totalQuantity += action.payload.totalQuantity;
                state.products = state.products.map((product: ProductType) => {
                    if (product._id === action.payload.products._id) {
                        product.quantity += action.payload.products.quantity
                        product.price += action.payload.products.price * action.payload.products.quantity
                    }
                    return product
                } 
            )
        }
        else {
                state.products?.push(action.payload.products)
                state.totalQuantity += action.payload.totalQuantity;
            }
                state.totalPrice! += action.payload.products.price * action.payload.products.quantity
        },
        reset: (state: initialState, action: ActionOptional) => {
            return initialState
        }
    }
})

export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;