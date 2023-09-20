import {createApi} from "@reduxjs/toolkit/query/react";
import {authFetchBaseQuery} from "@/utils/auth-fetch-base-query";
import {getApi} from "@/utils/get-api";

export const activityApi = createApi({
	reducerPath: "activityApi",
	baseQuery: authFetchBaseQuery({ baseUrl: getApi() }),
	endpoints: (builder) => ({
		getAttempts: builder.query<{ lookup: { [key: string]: any } }, { courseId: string, activityId: string }>({
			query: (data) => ({
				url: `/learn/api/v1/courses/${data.courseId}/gradebook/columns/${data.activityId}/attempts`
			})
		})
	})
});

export const { useGetAttemptsQuery } = activityApi;