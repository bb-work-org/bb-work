import { createApi } from "@reduxjs/toolkit/query/react";
import { authFetchBaseQuery } from "@/utils/auth-fetch-base-query";
import { getApi } from "@/utils/get-api";
import { CourseRoot } from "@/@types/courses";

export const coursesApi = createApi({
	reducerPath: "coursesApi",
	baseQuery: authFetchBaseQuery({ baseUrl: getApi() }),
	endpoints: (builder) => ({
		getCourses: builder.query<CourseRoot[], string>({
			query: (userid) => ({
				url: `/learn/api/v1/users/${userid}/memberships`,
				options: {
					query: {
						expand: "course.effectiveAvailability,course.permissions,courseRole",
						includeCount: true,
						limit: 10000,
					},
					method: "GET",
				},
			})
		}),
	}),
});

export const { useGetCoursesQuery } = coursesApi;
