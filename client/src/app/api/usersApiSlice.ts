import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "./apiSlice"

const userAdapter = createEntityAdapter({})
const initialState = userAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "/users",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: (responseData) => {
                const loadedUsers = responseData.map((user) => {
                    user.id = user._id

                    return user
                })

                return userAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "User", id: "LIST" },
                        ...result.ids.map((id) => ({ type: "User", id })),
                    ]
                } else {
                    return [{ type: "User", id: "LIST" }]
                }
            },
        }),
        getUserItems: builder.query({
            query: () => "/users/items",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: (responseData) => {
                console.log("Transforming response data", responseData)
                const loadedUserItems = responseData.map((item) => {
                    item.id = item._id

                    return item
                })

                return userAdapter.setAll(initialState, loadedUserItems)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    console.log("Providing tags for user items", [
                        { type: "Item", id: "LIST" },
                        ...result.ids.map((id) => ({ type: "Item", id })),
                    ])
                    return [
                        { type: "Item", id: "LIST" },
                        ...result.ids.map((id) => ({ type: "Item", id })),
                    ]
                } else {
                    return [{ type: "Item", id: "LIST" }]
                }
            },
        }),
        addNewUser: builder.mutation({
            query: (initialUserData) => ({
                url: "users",
                method: "POST",
                body: {
                    ...initialUserData,
                },
            }),
            invalidatesTags: [{ type: "User", id: "LIST" }],
        }),
        updateUser: builder.mutation({
            query: (initialUserData) => ({
                url: "users",
                method: "PATCH",
                body: {
                    ...initialUserData,
                },
            }),
            invalidatesTags: (result, error, { userId }) => [
                { type: "User", id: userId },
            ],
        }),
        deleteUser: builder.mutation({
            query: ({ userId }) => ({
                url: `users`,
                method: "DELETE",
                body: {
                    userId,
                },
            }),
            invalidatesTags: (result, error, userId) => [
                { type: "User", id: userId },
            ],
        }),
    }),
})

export const {
    useGetUsersQuery,
    useGetUserItemsQuery,
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
    selectIds: selectUserIds,
    // selectUserItemsById: selectUserItemsById,
} = userAdapter.getSelectors((state) => selectUsersData(state) ?? initialState)
