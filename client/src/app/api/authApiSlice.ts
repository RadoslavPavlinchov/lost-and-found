import { apiSlice } from "./apiSlice"
import { logout } from "./authSlice"

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: { ...credentials },
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled

                    dispatch(logout())

                    // TODO: if we get back to admin users, we continue to make requests to the server
                    dispatch(apiSlice.util.resetApiState())
                } catch (error) {
                    console.error("Error logging out", error)
                }
            },
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: "/auth/register",
                method: "POST",
                body: { ...credentials },
            }),
        }),
        refreshToken: builder.mutation({
            query: () => ({
                url: "/auth/refresh",
                method: "GET",
            }),
        }),
    }),
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useRefreshTokenMutation,
} = authApiSlice
