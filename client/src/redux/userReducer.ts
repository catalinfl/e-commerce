import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";

type initialState = {
    currentUser: any,
    isFetching: any,
    error: any
}

const initialState: initialState = {
    currentUser: null,
    isFetching: false,
    error: false
} 

export interface PayloadActionForDispatch extends PayloadAction {
   dispatch?: (p: object) => void;
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state: initialState, action: any) => {
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