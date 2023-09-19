import { createSlice } from "@reduxjs/toolkit";
import { signIn, signOut } from "@/redux/actions/auth-action";

type AuthState = {
	loading: boolean;
	loggedIn: boolean;
	bbSession?: string;
	xsrfToken?: string;
};

const initialState: AuthState = {
	loading: false,
	loggedIn: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		clearAuth: (state) => {
			state.loading = false;
			state.loggedIn = false;
			state.bbSession = undefined;
			state.xsrfToken = undefined;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(signIn.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(signIn.fulfilled, (state, action) => {
			state.loading = false;
			state.loggedIn = true;
			state.bbSession = action.payload?.bbSession;
			state.xsrfToken = action.payload?.xsrfToken;
		});
		builder.addCase(signIn.rejected, (state, action) => {
			state.loading = false;
		});
		builder.addCase(signOut.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(signOut.fulfilled, (state) => {
			state.loading = false;
			state.loggedIn = false;
			state.bbSession = undefined;
		});
		builder.addCase(signOut.rejected, (state, action) => {
			state.loading = false;
		});
	},
});

export const { clearAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
