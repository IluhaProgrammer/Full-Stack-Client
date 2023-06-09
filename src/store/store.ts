import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import { api } from "./services/api";
import { listenerMiddleware } from "../middlewares/auth";
import employeeSlice from "./reducers/employeeSlice";

const reducers = combineReducers({
    auth: authSlice,
    [api.reducerPath]: api.reducer,
    emploee: employeeSlice
})

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware).prepend(listenerMiddleware.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch