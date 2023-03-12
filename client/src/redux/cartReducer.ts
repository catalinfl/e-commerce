import { createSlice, PayloadAction, StateFromReducersMapObject } from "@reduxjs/toolkit"

type initialState = {
    products: [] | string[]
    quantity: number,
    total: number
}

type Action = {
    type: string
    payload: ActionPayload
}

type ActionPayload = {
    price: number
    _id: string
    quantity: number,
}

type ActionOptional = {
    type?: string,
    payload?: ActionPayload,
}


const initialState: initialState = {
    products: [],
    quantity: 0,
    total: 0
}


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state: initialState | any, action: Action) => {
            if (state.products.every((product: any) => product._id !== action.payload._id)) {
            state.quantity += action.payload.quantity;
            state.products?.push(action.payload)
            }
            else state.quantity += action.payload.quantity
            state.total += action.payload.price;
        },
        reset: (state: initialState, action: ActionOptional) => {
            state.quantity = 0;
            state.products = [];
            state.total = 0;
        }
    }
})

export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;