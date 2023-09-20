import {createApi} from "@reduxjs/toolkit/query/react";
import {authFetchBaseQuery} from "@/utils/auth-fetch-base-query";
import {getApi} from "@/utils/get-api";
import {Body, HttpVerb} from "@tauri-apps/api/http";
import {ActivityResult} from "@/@types/activities";

interface ActivityRequest {
	method: HttpVerb;
	relativeUrl: string;
}

interface ActivityResponse extends ActivityRequest {
	body: ActivityResult;
	statusCode: number;
	headers: {
		[key: string]: string[];
	}
}

export const activityApi = createApi({
	reducerPath: "activityApi",
	baseQuery: authFetchBaseQuery({ baseUrl: getApi() }),
	endpoints: (builder) => ({
		getAttempts: builder.query<{ lookup: { [key: string]: any } }, { courseId: string, activityId: string }>({
			query: (data) => ({
				url: `/learn/api/v1/courses/${data.courseId}/gradebook/columns/${data.activityId}/attempts`
			})
		}),
		getActivities: builder.query<ActivityResponse[], ActivityRequest[]>({
			query: (activitiesRequests) => ({
				url: "/learn/api/v1/utilities/batch",
				options: {
					body: Body.json(activitiesRequests),
					method: "PUT"
				}
			})
		})
	})
});

export const { useGetAttemptsQuery, useGetActivitiesQuery } = activityApi;