import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
    },
    reducers: {
        setCredentials(state, action) {
            const { accessToken } = action.payload
            state.token = accessToken
        },
        logout(state) {
            state.token = null
        },
    },
})

export default authSlice.reducer
export const { setCredentials, logout } = authSlice.actions

export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentAuth = (state) => state.auth // check if this is correct and where to use it