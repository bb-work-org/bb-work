import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { signIn as signInApi } from "@/features/auth/auth-api";
import { type RootState } from "@/redux/store";
import { fetchWithoutRedirect } from "@/utils/fetch-without-redirect";
import { getApi } from "@/utils/get-api";
import { BBError } from "@/utils/handlers/bb-error";

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (data: { rgm: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await signInApi(data.rgm, data.password);
      enqueueSnackbar("Sign in success", {
        variant: "success",
      });

      return response;
    } catch (error) {
      if (error instanceof BBError) {
        enqueueSnackbar(error.message, {
          variant: "error",
        });
      }

      return rejectWithValue(error);
    }
  }
);

export const signOut = createAsyncThunk("auth/signOut", async (_, { rejectWithValue, getState }) => {
  try {
    const { bbSession } = (getState() as RootState).auth;

    await fetchWithoutRedirect(getApi("/webapps/login/?action=logout"), {
      method: "GET",
      headers: {
        Cookie: `BbRouter=${bbSession}`,
      },
    });

    enqueueSnackbar("Sign out success", {
      variant: "success",
    });

    return true;
  } catch (error) {
    if (error instanceof BBError) {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    }

    return rejectWithValue(error);
  }
});
