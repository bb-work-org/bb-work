import {createAsyncThunk} from "@reduxjs/toolkit";
import {enqueueSnackbar} from "notistack";
import {signIn as signInApi} from "@/features/auth/auth-api";

export const signIn = createAsyncThunk(
    "auth/signIn",
    async (data: { rgm: string, password: string }, {rejectWithValue}) => {
        try {
            const response = await signInApi(data.rgm, data.password);
            enqueueSnackbar("Sign in success", {
                variant: "success"
            });

            return response;
        } catch (e: any) {
            enqueueSnackbar(e, {
                variant: "error"
            });

            rejectWithValue(e);
        }

        return null;
    }
)