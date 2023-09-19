import { fetch, FetchOptions, HttpVerb, Response } from "@tauri-apps/api/http";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { RootState } from "@/redux/store";

type InternalFetchFn = {
	baseUrl: string;
};

type Meta = {
	response: Response<unknown>;
};

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
			const { bbSession } = (getState() as RootState).auth;

			const response = await fetch(`${baseUrl}${url}`, {
				method,
				...options,
				headers: {
					...options?.headers,
					Cookie: bbSession,
				},
			});

			return {
				data: response.data,
				meta: {
					response: response,
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
