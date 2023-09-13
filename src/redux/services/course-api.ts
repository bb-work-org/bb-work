import { createApi } from "@reduxjs/toolkit/query/react";
import { authFetchBaseQuery } from "@/utils/auth-fetch-base-query";
import { getApi } from "@/utils/get-api";
import { CourseResponse } from "@/@types/courses";

export const courseApi = createApi({
	reducerPath: "courseApi",
	baseQuery: authFetchBaseQuery({ baseUrl: getApi() }),
	endpoints: (builder) => ({
		getCourses: builder.query<CourseResponse, string>({
			query: (userid) => ({
				url: `/learn/api/v1/users/${userid}/memberships`,
				options: {
					query: {
						expand: "course.effectiveAvailability,course.permissions,courseRole",
						includeCount: "true",
						limit: "10000",
					},
					method: "GET",
				},
			})
		}),
	}),
});

export const { useGetCoursesQuery } = courseApi;
