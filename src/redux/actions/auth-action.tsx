import {createAsyncThunk} from "@reduxjs/toolkit";
import {enqueueSnackbar} from "notistack";
import {signIn as signInApi} from "@/features/auth/auth-api";

export const signIn = createAsyncThunk(
    "auth/signIn",
    async (data: { rgm: string, password: string }) => {
        try {
            await signInApi(data.rgm, data.password);
            enqueueSnackbar("Sign in success", {
                variant: "success"
            });
        } catch (e: string) {
            enqueueSnackbar(e, {
                variant: "error"
            });
        }
    }
)