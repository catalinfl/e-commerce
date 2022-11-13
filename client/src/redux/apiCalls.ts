import { loginFailure, loginStart, loginSuccess } from './userReducer'
import { publicRequest } from '../requestMethods'


export const login = async (dispatch: any, user: any) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post('/auth/login', user);
        dispatch(() => {loginSuccess()});
    }
    catch(err) {
        dispatch(loginFailure());
    }
}