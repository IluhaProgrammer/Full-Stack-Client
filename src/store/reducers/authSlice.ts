import { createSlice } from "@reduxjs/toolkit";
import {User} from '@prisma/client'
import { authApi } from "../services/auth"; 
import { RootState } from "../store";

interface IS {
    user: User & {token: string} | null
    isAuthenthicated: boolean
}

const initialState: IS = {
     user: null,
     isAuthenthicated: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, {payload}) => {
            state.user = payload
            state.isAuthenthicated = true
        }),
        builder.addMatcher(authApi.endpoints.registration.matchFulfilled, (state, {payload}) => {
            state.user = payload
            state.isAuthenthicated = true
        }),
        builder.addMatcher(authApi.endpoints.current.matchFulfilled, (state, {payload}) => {
            state.user = payload
            state.isAuthenthicated = true
        })
    }
})

export default authSlice.reducer
export const {logout} = authSlice.actions

export const selectorAuthenthicated = (state: RootState) => state.auth.isAuthenthicated 
export const selectorUser = (state: RootState) => state.auth.user