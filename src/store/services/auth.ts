import {User} from '@prisma/client'
import {api} from './api'

export type UserData = Omit<User, "id">
type ResponseLoginData = User & {token: string}
export type LoginData = Omit<UserData, "name">

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ResponseLoginData, LoginData>({
            query: (user) => ({
                url: '/user/login',
                method: "POST",
                body: user
            })
        }),
        registration: builder.mutation<ResponseLoginData, UserData>({
            query: (newUser) => ({
                url: '/user/registration',
                body: newUser,
                method: "POST"
            })
        }),
        current: builder.query<ResponseLoginData, void>({
            query: () => '/user/current'
        }),
    })
})

export const {useLoginMutation, useRegistrationMutation, useCurrentQuery } = authApi

export const {endpoints: {login, registration, current} } = authApi