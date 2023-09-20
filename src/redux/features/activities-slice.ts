import { createSlice } from "@reduxjs/toolkit";
import { getActivities } from "@/redux/actions/activities-action";
import { Activity } from "@/@types/activities";

interface ActivitiesState {
    loading: boolean;
    activities: Activity[];
    chunks: any[]
}

const initialState: ActivitiesState = {
    loading: false,
    activities: [],
    chunks: [],
}

const activitiesSlice = createSlice({
    name: "activities",
    initialState,
    reducers: {
        clearActivities: (state) => {
            state.activities = [];
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getActivities.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getActivities.fulfilled, (state, action) => {
            state.loading = false;

            state.activities = [
                ...state.activities,
                ...(
                    action.payload.data.results
                        ?.filter((activity) => activity.contentHandler === "resource/x-bb-assignment") 
                        ?? []
                )
            ]
        });
        builder.addCase(getActivities.rejected, (state) => {
            state.loading = false;
        });
    }
});

export const { clearActivities } = activitiesSlice.actions;
export const activitiesReducer = activitiesSlice.reducer;