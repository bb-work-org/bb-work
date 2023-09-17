import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SettingsState = {
	locale: string;
};

const initialState: SettingsState = {
	locale: "en",
};

const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		setSettings: (state, action: PayloadAction<SettingsState>) => {
			state.locale = action.payload.locale;
		},
	},
});

export const { setSettings } = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;
