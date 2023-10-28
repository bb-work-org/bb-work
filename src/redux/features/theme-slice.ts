import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Theme } from "@/@types/theme";

type ThemeSliceState = {
  theme: Theme;
};

const initialState: ThemeSliceState = {
  theme: "system",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
});

export const themeReducer = themeSlice.reducer;
export const { setTheme } = themeSlice.actions;
