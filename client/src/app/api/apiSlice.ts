import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from './authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token

        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }

        return headers
    }
})

const baseQueryWithRefreshAuth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 403) {
        const refreshResult = await baseQuery("/auth/refresh", api, extraOptions)

        if (refreshResult?.data) {
            api.dispatch(setCredentials({ ...refreshResult.data }))

            result = await baseQuery(args, api, extraOptions)
        } else {
            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = "Session expired. Please log in again. "
            }

            return refreshResult
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithRefreshAuth,
    tagTypes: ["User", "Item"],
    endpoints: () => ({})
})