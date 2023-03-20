import { createSlice, PayloadAction, StateFromReducersMapObject } from "@reduxjs/toolkit"

export type initialState = {
    products: ProductType[];
    quantity: number;
    total: number;
    name: string | null
  };

type Action = {
    type: string
    payload: ProductType
}

type ProductType = {
    price: number
    _id: string
    quantity: number,
    name: string
}

type ActionOptional = {
    type?: string,
    payload?: ProductType,
}


const initialState: initialState = {
    products: [],
    quantity: 0,
    total: 0,
    name: null
}


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state: initialState, action: Action) => {
            if (state.products.every((product: any) => product._id !== action.payload._id)) {
            state.quantity += action.payload.quantity;
            state.products?.push(action.payload)
            state.total += action.payload.price;
            state.name = action.payload.name;
            }
            else {
                state.quantity += action.payload.quantity 
            }
            state.total += action.payload.price;
        },
        reset: (state: initialState, action: ActionOptional) => {
            return initialState
        }
    }
})

export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;