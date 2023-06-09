import {createApi, fetchBaseQuery, retry} from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

const API_URL = 'http://localhost:5100/api'

const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).auth.user?.token || localStorage.getItem('token')

        if(token && token !== null) {
            headers.set('authorization', `Bearer ${token}`)
        }
    }
})

const baseQueryWithRetry = retry(baseQuery, {maxRetries: 1})

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithRetry,
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({

    })
})