import { createSlice, PayloadAction, StateFromReducersMapObject } from "@reduxjs/toolkit"

interface cartPayload {
    price: number,
    products: Array<string>,
    quantity: number,
}

type initialState = {
    products: Array<string>,
    quantity: number,
    total: number
}


const initialState: initialState = {
    products: [],
    quantity: 0,
    total: 0
}

type ActionOptions = {
    price: number,
    quantity: number,
} & string


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.quantity += action.payload.quantity;
            state.products.push(action.payload);
            state.total += action.payload.price  * action.payload.quantity;
        }
    }
})

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;