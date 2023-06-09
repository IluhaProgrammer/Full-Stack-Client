import {Emploee} from '@prisma/client'
import {api} from './api'

export const emploeeApi = api.injectEndpoints({
    endpoints:(builder) => ({
        getAll: builder.query<Emploee[], void>({
            query: () => '/employee/all'
        }),
        getOne: builder.query<Emploee, string>({
            query: (id) => `/employee/${id}`
        }),
        editOne: builder.mutation<string, Emploee>({
            query: (employee) => ({
                url: `/employee/edit/${employee.id}`,
                method: "PUT",
                body: employee
            })
        }),
        removeOne: builder.mutation<string, number | undefined>({
            query: (id) => ({
                url: `/employee/remove/${id}`,
                method: 'DELETE'
            })
        }),
        createOne: builder.mutation<Emploee, Emploee>({
            query: (emploee) => ({
                url: "/employee/add",
                method: "POST",
                body: emploee
            })
        }),
    })
})

export const {useCreateOneMutation, useEditOneMutation, useGetAllQuery, useGetOneQuery, useRemoveOneMutation} = emploeeApi

export const {endpoints: {
    getAll, 
    getOne,
    editOne,
    removeOne,
    createOne
}} = emploeeApi