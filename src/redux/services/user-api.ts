import { createApi } from "@reduxjs/toolkit/query/react";
import { ResponseType } from "@tauri-apps/api/http";
import { type UserMe } from "@/@types/user-me";
import { authFetchBaseQuery } from "@/utils/auth-fetch-base-query";
import { getApi } from "@/utils/get-api";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: authFetchBaseQuery({ baseUrl: getApi() }),
  endpoints: (builder) => ({
    authenticated: builder.query<{ status: number; message: string }, void>({
      query: () => ({
        url: "/learn/api/v1/utilities/keepBbSessionActive",
        options: {
          method: "POST",
          responseType: ResponseType.JSON,
        },
      }),
      keepUnusedDataFor: 0,
    }),
    getMe: builder.query<UserMe, void>({
      query: () => ({
        url: "/learn/api/v1/users/me",
        options: {
          method: "GET",
          responseType: ResponseType.JSON,
        },
      }),
    }),
  }),
});

export const { useAuthenticatedQuery, useGetMeQuery } = userApi;
