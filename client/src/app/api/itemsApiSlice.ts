import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "./apiSlice"

const itemAdapter = createEntityAdapter({})
const initialState = itemAdapter.getInitialState()

export const itemsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getItems: builder.query({
            query: (params) => ({
                url: `items`,
                params,
            }),
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: (responseData) => {
                const loadedItems = responseData.map((item) => {
                    item.id = item._id

                    return item
                })

                return itemAdapter.setAll(initialState, loadedItems)
            },
            providesTags: (result, error, arg) => [
                { type: "Item", id: "LIST" },
                ...result.ids.map((id) => ({ type: "Item", id })),
            ],
        }),
        getItemsByUserId: builder.query({
            query: (userId) => `items/user/${userId}`,
            transformResponse: (responseData) => {
                const loadedItems = responseData.map((item) => {
                    item.id = item._id

                    return item
                })

                return itemAdapter.setAll(initialState, loadedItems)
            },
            providesTags: (result, error, arg) => [
                { type: "Item", id: "LIST" },
                ...result.ids.map((id) => ({ type: "Item", id })),
            ],
        }),
        createItem: builder.mutation({
            query: (initialItemData) => ({
                url: "/items",
                method: "POST",
                body: {
                    ...initialItemData,
                },
            }),
            invalidatesTags: [{ type: "Item", id: "LIST" }],
        }),
        updateItem: builder.mutation({
            query: ({ formData, id }) => {
                return {
                    url: `/items/${id}`,
                    method: "PATCH",
                    body: {
                        ...formData,
                    },
                }
            },
            invalidatesTags: (result, error, { itemId }) => [
                { type: "Item", id: itemId },
            ],
        }),
        deleteItem: builder.mutation({
            query: (itemId) => {
                console.log("Deleting item with ID:", itemId)
                return {
                    url: `/items/${itemId}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: (result, error, { itemId }) => {
                return [{ type: "Item", id: itemId }]
            },
        }),
    }),
})

export const {
    useGetItemsQuery,
    useGetItemsByUserIdQuery,
    useCreateItemMutation,
    useUpdateItemMutation,
    useDeleteItemMutation,
} = itemsApiSlice

export const selectItemsResult = itemsApiSlice.endpoints.getItems.select()

const selectItemsData = createSelector(
    selectItemsResult,
    (itemsResult) => itemsResult.data
)

// export const selectItemById = (state, itemId) => {
//     console.log("Selecting item by ID", state, itemId)
//     return state.items.items.find((item) => item._id === itemId)
// }

export const {
    selectAll: selectAllItems,
    selectById: selectItemById,
    selectIds: selectItemIds,
} = itemAdapter.getSelectors((state) => selectItemsData(state) ?? initialState)
