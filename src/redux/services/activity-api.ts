import { createApi } from "@reduxjs/toolkit/query/react";
import { authFetchBaseQuery } from "@/utils/auth-fetch-base-query";
import { getApi } from "@/utils/get-api";

export const activityApi = createApi({
  reducerPath: "activityApi",
  baseQuery: authFetchBaseQuery({ baseUrl: getApi() }),
  endpoints: (builder) => ({
    getAttempts: builder.query<{ lookup: Record<string, unknown> }, { courseId?: string; activityId?: string }>({
      query: ({ courseId, activityId }) => ({
        url: `/learn/api/v1/courses/${courseId ?? ""}/gradebook/columns/${activityId ?? ""}/attempts`,
      }),
    }),
  }),
});

export const { useGetAttemptsQuery } = activityApi;
