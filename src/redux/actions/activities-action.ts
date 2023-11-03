import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { getCourseContent } from "@/utils/getCourseContent";
import { BBError } from "@/utils/handlers/bb-error";

export const getActivities = createAsyncThunk("activities/getActivities", (courseId: string, { rejectWithValue }) => {
  try {
    return getCourseContent(courseId);
  } catch (error) {
    if (error instanceof BBError) {
      enqueueSnackbar("Failed to get activities", {
        variant: "error",
      });
    }

    return rejectWithValue(error);
  }
});
