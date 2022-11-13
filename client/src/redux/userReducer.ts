import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialState = {
    currentUser?: void | null | string,
    isFetching?: false | boolean,
    error?: false | boolean
}

const initialState: initialState = {
    currentUser: null,
    isFetching: false,
    error: false
} 


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state: initialState, action: PayloadAction) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        }
    }
})

export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;
export default userSlice.reducer;