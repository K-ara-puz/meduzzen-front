import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
import { csvHandler, jsonHandler } from "./utils/export";

interface IGetCompanyMemberData {
  companyId: string;
  memberId: string;
}
interface IGetCompanyQuizData {
  companyId: string;
  quizId: string;
}

export const companyDataExportApi = createApi({
  reducerPath: "api/companyDataExport",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getCompanyQuizzesResultsDataExportCSV: builder.query<unknown, string>({
      query: (companyId) => {
        return {
          url: `/quizzes-data-export/members-results/csv/${companyId}`,
          method: "GET",
          responseHandler: async (response) => csvHandler(response),
        };
      },
    }),
    getCompanyQuizzesResultsDataExportJSON: builder.query<unknown, string>({
      query: (companyId) => ({
        url: `/quizzes-data-export/members-results/json/${companyId}`,
        method: "GET",
      }),
      transformResponse: async (response) => jsonHandler(response),
    }),
    getOneCompanyMemberResultsDataExportCSV: builder.query<
      unknown,
      IGetCompanyMemberData
    >({
      query: ({ memberId, companyId }) => ({
        url: `/quizzes-data-export/member-results/csv/${memberId}/${companyId}`,
        method: "GET",
        responseHandler: async (response) => csvHandler(response),
      }),
    }),
    getOneCompanyMemberResultsDataExportJSON: builder.query<
      unknown,
      IGetCompanyMemberData
    >({
      query: ({ memberId, companyId }) => ({
        url: `/quizzes-data-export/member-results/json/${memberId}/${companyId}`,
        method: "GET",
      }),
      transformResponse: async (response) => jsonHandler(response),
    }),
    getOneCompanyQuizResultsDataExportCSV: builder.query<
      unknown,
      IGetCompanyQuizData
    >({
      query: ({ quizId, companyId }) => ({
        url: `/quizzes-data-export/quiz-results/csv/${companyId}/${quizId}`,
        method: "GET",
        responseHandler: async (response) => csvHandler(response),
      }),
    }),
    getOneCompanyQuizResultsDataExportJSON: builder.query<
      unknown,
      IGetCompanyQuizData
    >({
      query: ({ quizId, companyId }) => ({
        url: `/quizzes-data-export/quiz-results/json/${companyId}/${quizId}`,
        method: "GET",
      }),
      transformResponse: async (response) => jsonHandler(response),
    }),
  }),
});
export const {
  useLazyGetCompanyQuizzesResultsDataExportCSVQuery,
  useLazyGetCompanyQuizzesResultsDataExportJSONQuery,
  useLazyGetOneCompanyMemberResultsDataExportCSVQuery,
  useLazyGetOneCompanyMemberResultsDataExportJSONQuery,
  useLazyGetOneCompanyQuizResultsDataExportCSVQuery,
  useLazyGetOneCompanyQuizResultsDataExportJSONQuery,
} = companyDataExportApi;
