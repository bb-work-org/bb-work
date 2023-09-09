import {createSlice} from "@reduxjs/toolkit";
import {signIn} from "@/redux/actions/auth-action";

type AuthState = {
    loading: boolean,
    loggedIn: boolean,
    cookies: string[]
}

const initialState: AuthState = {
    loading: false,
    loggedIn: false,
    cookies: []
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(signIn.pending, (state) => {
            state.loading = true
        })
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.loading = false
            state.loggedIn = true
            state.cookies = action.payload?.cookie ?? []
        })
        builder.addCase(signIn.rejected, (state) => {
            state.loading = false
        })
    }
})

export const {} = authSlice.actions
export const authReducer = authSlice.reducer