import { createSlice } from "@reduxjs/toolkit";
import { type Activity } from "@/@types/activities";
import { getActivities } from "@/redux/actions/activities-action";

interface ActivitiesState {
  loading: boolean;
  activities: Activity[];
  chunks: unknown[];
}

const initialState: ActivitiesState = {
  loading: false,
  activities: [],
  chunks: [],
};

const activitiesSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    clearActivities: (state) => {
      state.activities = [];
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getActivities.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getActivities.fulfilled, (state, action) => {
      state.loading = false;

      state.activities = [
        ...state.activities,
        ...(action.payload.data.results?.filter((activity) => activity.contentHandler === "resource/x-bb-assignment") ??
          []),
      ];
    });
    builder.addCase(getActivities.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { clearActivities } = activitiesSlice.actions;
export const activitiesReducer = activitiesSlice.reducer;
