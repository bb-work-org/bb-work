import { createApi } from "@reduxjs/toolkit/query/react";
import { ResponseType } from "@tauri-apps/api/http";
import { ActivityResult } from "@/@types/activities";
import { CourseResponse } from "@/@types/courses";
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
    getCourseContentAttachments: builder.query<
      { results: { id: string; fileName: string; mimeType: string }[] },
      { courseId: string; contentId: string }
    >({
      query: ({ courseId, contentId }) => ({
        url: `/learn/api/public/v1/courses/${courseId}/contents/${contentId}/attachments`,
        options: {
          responseType: ResponseType.JSON,
          method: "GET",
        },
      }),
    }),
    downloadCourseContent: builder.query<string | null, { courseId: string; contentId: string; attachmentId: string }>({
      query: ({ courseId, contentId, attachmentId }) => ({
        url: `/learn/api/public/v1/courses/${courseId}/contents/${contentId}/attachments/${attachmentId}/download`,
        options: {
          responseType: ResponseType.Binary,
          method: "GET",
        },
      }),
      transformResponse: (response, meta) => {
        if (meta?.response.status !== 200) return null;

        return meta.response.url;
      },
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseContentsQuery,
  useGetCourseContentAttachmentsQuery,
  useDownloadCourseContentQuery,
} = courseApi;
