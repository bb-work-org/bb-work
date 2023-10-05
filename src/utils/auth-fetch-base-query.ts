import { type BaseQueryFn } from "@reduxjs/toolkit/query";
import { fetch, type FetchOptions, type HttpVerb, type Response } from "@tauri-apps/api/http";
import { type RootState } from "@/redux/store";

interface InternalFetchFn {
  baseUrl: string;
}

interface Meta {
  response: Response<unknown>;
}

export const authFetchBaseQuery =
  ({
    baseUrl = "",
  }: InternalFetchFn): BaseQueryFn<
    {
      url: string;
      method?: HttpVerb;
      options?: FetchOptions;
    },
    unknown,
    unknown,
    {},
    Meta
  > =>
  async ({ url, method = "GET", options }, { getState }) => {
    try {
      const { bbSession, xsrfToken } = (getState() as RootState).auth;

      const response = await fetch(`${baseUrl}${url}`, {
        method,
        ...options,
        headers: {
          ...options?.headers,
          Cookie: bbSession,
          "X-Blackboard-XSRF": xsrfToken,
        },
      });

      return {
        data: response.data,
        meta: {
          response,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          error: { status: 0, data: error.message },
        };
      }

      return {
        error: { status: 0, data: "Unknown error" },
      };
    }
  };
