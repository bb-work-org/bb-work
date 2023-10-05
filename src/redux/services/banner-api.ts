import { createApi } from "@reduxjs/toolkit/query/react";
import { ResponseType } from "@tauri-apps/api/http";
import { authFetchBaseQuery } from "@/utils/auth-fetch-base-query";
import { getApi } from "@/utils/get-api";

export const bannerApi = createApi({
  reducerPath: "bannerApi",
  baseQuery: authFetchBaseQuery({ baseUrl: getApi() }),
  endpoints: (builder) => ({
    getCourseBanner: builder.query<string | null, string>({
      query: (courseId) => ({
        url: `/bannerthumbnail/${courseId}`,
        options: {
          responseType: ResponseType.Text,
          method: "GET",
        },
      }),
      transformResponse: (response: string, meta) => {
        if (meta?.response.status !== 200) return null;

        return meta?.response.url;
      },
    }),
    getCourseStaticBanner: builder.query<string | null, string>({
      query: (bannerName) => ({
        url: `/ultra/static/images/default-banners/${bannerName}.jpg`,
        options: {
          responseType: ResponseType.Binary,
          method: "GET",
        },
      }),
      transformResponse: (response: string, meta) => {
        if (meta?.response.status !== 200) return null;
        if (meta?.response.data === undefined) return null;

        const buffer = Buffer.from(meta.response.data as string, "binary");

        return `data:image/png;base64,${buffer.toString("base64")}`;
      },
    }),
  }),
});

export const { useGetCourseBannerQuery, useGetCourseStaticBannerQuery } = bannerApi;
