import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "./apiSlice"

const userAdapter = createEntityAdapter({});
const initialState = userAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "users",
            validateStatus: (response, result) => response.status === 200 && !result.error,
            transformResponse: (responseData) => {
                const loadedUsers = responseData.map(user => {
                    user.id = user._id

                    return user
                })

                return userAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "User", id: "LIST" },
                        ...result.ids.map((id) => ({ type: "User", id }))
                    ]
                } else {
                    return [{ type: "User", id: "LIST" }]
                }
            }
        }),
        addNewUser: builder.mutation({
            query: (initialUserData) => ({
                url: "users",
                method: "POST",
                body: {
                    ...initialUserData
                }
            }),
            invalidatesTags: [{ type: "User", id: "LIST" }]
        }),
        updateUser: builder.mutation({
            query: (initialUserData) => ({
                url: "users",
                method: "PATCH",
                body: {
                    ...initialUserData
                }
            }),
            invalidatesTags: (result, error, { userId }) => [{ type: "User", id: userId }]
        }),
        deleteUser: builder.mutation({
            query: ({ userId }) => ({
                url: `users`,
                method: "DELETE",
                body: {
                    userId
                }
            }),
            invalidatesTags: (result, error, userId) => [{ type: "User", id: userId }]
        })
    }),
})

export const {
    useGetUsersQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersApiSlice

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

const selectUsersData = createSelector(
    selectUsersResult,
    (result) => result.data
)

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = userAdapter.getSelectors((state) => selectUsersData(state) ?? initialState)
