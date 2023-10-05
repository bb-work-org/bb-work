import { createApi } from "@reduxjs/toolkit/query/react";
import { ResponseType } from "@tauri-apps/api/http";
import { type ActivityResult } from "@/@types/activities";
import { type CourseResponse } from "@/@types/courses";
import { authFetchBaseQuery } from "@/utils/auth-fetch-base-query";
import { getApi } from "@/utils/get-api";

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
      }),
    }),
    getCourseContents: builder.query<ActivityResult, string>({
      query: (courseId) => ({
        url: `/learn/api/v1/courses/${courseId}/contents`,
        options: {
          query: {
            recursive: "true",
          },
          responseType: ResponseType.JSON,
          method: "GET",
        },
      }),
    }),
  }),
});

export const { useGetCoursesQuery, useGetCourseContentsQuery } = courseApi;
