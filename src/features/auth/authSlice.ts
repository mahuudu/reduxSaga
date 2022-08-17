import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './../../models/user';

export interface LoginPayLoad{
    username : string;
    password: string;
}

export interface AuthState{
    token : string | null;
    isLoggedIn : boolean;
    logging? : boolean;
    currentUser? : User;
    msg : string | null;
}

const initialState: AuthState = {
    token : null,
    isLoggedIn: false,
    logging : false,
    currentUser : undefined,
    msg : null,
}


const authSlice = createSlice({
    name: 'auth',
    initialState : initialState,
    reducers : {
        login(state, action: PayloadAction<LoginPayLoad>){
            state.logging = true;
        },
        loginSuccess(state, action: PayloadAction<User>){
            state.isLoggedIn = true;
            state.logging = false;
            state.currentUser = action.payload;
        },
        loginFailed(state, action: PayloadAction<string>){
            state.msg = action.payload;
        },
        logout(state){
            state.isLoggedIn = false;
            state.currentUser = undefined;
        },
    },
})

//action
export const authAction = authSlice.actions;

//selector
export const selectIsloggedIn = (state: any) => state.auth.isLoggedIn;
export const selectIsLogging = (state: any) => state.auth.logging;
//reuducer
const authReducer = authSlice.reducer;


export default authReducer;