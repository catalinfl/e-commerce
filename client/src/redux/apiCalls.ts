import { loginFailure, loginStart, loginSuccess } from './userReducer'
import { publicRequest } from '../requestMethods'
import { addProduct } from './cartReducer';
import { compose } from '@reduxjs/toolkit';



export const login = async (user: any, dispatch: any) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post('/auth/login', user);
        dispatch(loginSuccess(res.data));
    }
    catch(err) {
        dispatch(loginFailure());
    }
}