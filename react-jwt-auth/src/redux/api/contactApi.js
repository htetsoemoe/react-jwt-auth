// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const contactApi = createApi({
    reducerPath: "contactApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'https://contact-app.mmsdev.site/api/v1' }),
    tagTypes: ["contact"], // for aut refetching
    endpoints: (builder) => ({
        getContacts: builder.query({
            query: (token) => ({
                url: '/contact',
                headers: { authorization: `Bearer ${token}` }
            }),
            providesTags: ['contact']
        }),
        createContact: builder.mutation({
            query: ({ token, contact }) => ({
                url: '/contact',
                method: 'POST',
                headers: {authorization: `Bearer ${token}`},
                body: contact
            }),
            invalidatesTags: ['contact']
        })
    })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetContactsQuery, useCreateContactMutation } = contactApi