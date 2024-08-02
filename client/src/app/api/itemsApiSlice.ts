import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "./apiSlice"

const itemAdapter = createEntityAdapter({})
const initialState = itemAdapter.getInitialState()

export const itemsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getItems: builder.query({
            query: () => "items",
            validateStatus: (response, result) =>
                response.status === 200 && !result.error,
            transformResponse: (responseData) => {
                const loadedItems = responseData.map((item) => {
                    item.id = item._id

                    return item
                })

                return itemAdapter.setAll(initialState, loadedItems)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Item", id: "LIST" },
                        ...result.ids.map((id) => ({ type: "Item", id })),
                    ]
                } else {
                    return [{ type: "Item", id: "LIST" }]
                }
            },
        }),
        createItem: builder.mutation({
            query: (initialItemData) => ({
                url: "items",
                method: "POST",
                body: {
                    ...initialItemData,
                },
            }),
            invalidatesTags: [{ type: "Item", id: "LIST" }],
        }),
        updateItem: builder.mutation({
            query: (initialItemData) => ({
                url: "items",
                method: "PATCH",
                body: {
                    ...initialItemData,
                },
            }),
            invalidatesTags: (result, error, { itemId }) => [
                { type: "Item", id: itemId },
            ],
        }),
        deleteItem: builder.mutation({
            query: ({ itemId }) => ({
                url: `items`,
                method: "DELETE",
                body: {
                    itemId,
                },
            }),
            invalidatesTags: (result, error, itemId) => [
                { type: "Item", id: itemId },
            ],
        }),
    }),
})

export const {
    useGetItemsQuery,
    useCreateItemMutation,
    useUpdateItemMutation,
    useDeleteItemMutation,
} = itemsApiSlice

export const selectItemsResult = itemsApiSlice.endpoints.getItems.select()

const selectItemsData = createSelector(
    selectItemsResult,
    (result) => result.data
)

export const {
    selectAll: selectAllItems,
    selectById: selectItemById,
    selectIds: selectItemIds,
} = itemAdapter.getSelectors((state) => selectItemsData(state) ?? initialState)
