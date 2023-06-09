import { createSlice } from "@reduxjs/toolkit";
import {Emploee} from '@prisma/client'
import { emploeeApi } from "../services/employee";
import { RootState } from "../store";

interface INS {
    employees: Emploee[] | null
}

const initialState: INS = {
    employees: null
}

export const employee = createSlice({
    name: "employee",
    initialState,
    reducers: {
        logOut: () => initialState
    },
    extraReducers: (builder) => {
        builder.addMatcher(emploeeApi.endpoints.getAll.matchFulfilled, (state, {payload}) => {
            state.employees = payload
        })
    }
})

export default employee.reducer

export const {logOut} = employee.actions

export const selectEmployees = (state: RootState) => state.emploee