import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
import { csvHandler, jsonHandler } from "./utils/export";

export const userDataExportApi = createApi({
  reducerPath: "api/userDataExport",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUserQuizzesResultsDataExportCSV: builder.query<unknown, void>({
      query: () => {
        return {
          url: `/quizzes-data-export/user-results/csv`,
          method: "GET",
          responseHandler: async (response) => csvHandler(response),
        };
      },
    }),
    getUserQuizzesResultsDataExportJSON: builder.query<unknown, void>({
      query: () => ({
        url: `/quizzes-data-export/user-results/json`,
        method: "GET",
      }),
      transformResponse: async (response) => jsonHandler(response),
    }),
  }),
});
export const {
  useLazyGetUserQuizzesResultsDataExportJSONQuery,
  useLazyGetUserQuizzesResultsDataExportCSVQuery,
} = userDataExportApi;
