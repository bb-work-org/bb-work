import {createApi} from "@reduxjs/toolkit/query/react";
import {authFetchBaseQuery} from "@/utils/auth-fetch-base-query";
import {getApi} from "@/utils/get-api";
import {ResponseType} from "@tauri-apps/api/http";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: authFetchBaseQuery({baseUrl: getApi()}),
    endpoints: (builder) => ({
        getMe: builder.query<any, void>({
            query: () => ({
                url: "/learn/api/v1/users/me",
                options: {
                    method: "GET",
                    responseType: ResponseType.JSON
                }
            }),
        }),
    })
});

export const {useGetMeQuery} = userApi;