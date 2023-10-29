import { createApi } from "@reduxjs/toolkit/query/react";
import { ResponseType } from "@tauri-apps/api/http";
import { ActivityResult } from "@/@types/activities";
import { authFetchBaseQuery } from "@/utils/auth-fetch-base-query";
import { getApi } from "@/utils/get-api";

export const courseContentApi = createApi({
  reducerPath: "courseContentApi",
  baseQuery: authFetchBaseQuery({ baseUrl: getApi() }),
  endpoints: (builder) => ({
    content: builder.query<
      ActivityResult,
      Partial<{ courseId: string; contentId: string; query: { [key: string]: string } }>
    >({
      query: ({ courseId, contentId, query }) => ({
        url: `/learn/api/v1/courses/${courseId}/contents/${contentId ?? ""}`,
        options: {
          method: "GET",
          query: {
            ...query,
          },
        },
      }),
    }),
    contentAttachments: builder.query<
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
    contentDownload: builder.query<string | null, { courseId: string; contentId: string; attachmentId: string }>({
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

export const { useContentQuery, useContentAttachmentsQuery, useContentDownloadQuery } = courseContentApi;
