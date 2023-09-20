import {fetch, ResponseType} from "@tauri-apps/api/http";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {getApi} from "@/utils/get-api";
import {enqueueSnackbar} from "notistack";
import {BBError} from "@/utils/handlers/bb-error";
import {ActivityResult} from "@/@types/activities";

export const getActivities = createAsyncThunk(
    "activities/getActivities",
    async (courseId: string, { rejectWithValue, getState }) => {
        try {
            const { bbSession } = (getState() as RootState).auth;
            
            if (!bbSession) {
                throw new BBError("Failed to get Session");
            }

            return fetch<ActivityResult>(getApi(`/learn/api/v1/courses/${courseId}/contents`), {
                query: {
                    recursive: "true"
                },
                headers: {
                    Cookie: bbSession,
                },
                responseType: ResponseType.JSON,
                method: "GET"
            });
        } catch(error) {
            if (error instanceof BBError) {
                enqueueSnackbar("Failed to get activities", {
                    variant: "error"
                });
            }

            return rejectWithValue(error);
        }
    }
)