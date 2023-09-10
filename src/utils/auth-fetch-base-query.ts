import {fetch, FetchOptions, HttpVerb} from "@tauri-apps/api/http";
import {BaseQueryFn} from "@reduxjs/toolkit/query";
import {RootState} from "@/redux/store";

type InternalFetchFn = {
    baseUrl: string
}

export const authFetchBaseQuery = ({baseUrl = ''}: InternalFetchFn): BaseQueryFn<
    { url: string, method?: HttpVerb, options?: FetchOptions }
> => async ({url, method = 'GET', options}, {getState}) => {
    try {
        const {bbSession} = (getState() as RootState).auth;

        const response = await fetch(`${baseUrl}${url}`, {
            ...options,
            method,
            headers: {
                ...options?.headers,
                "Cookie": bbSession
            }
        });

        return {
            data: response.data,
            status: response.status,
            headers: response.headers,
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                error: {status: 0, data: error.message},
                status: 0,
                headers: {},
            };
        }

        return {
            error: {status: 0, data: 'Unknown error'},
        }
    }
};