import { createApi } from "@reduxjs/toolkit/query/react";
import { GeneralResponse } from "../../interfaces/generalResponse.interface";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
import { PaginatedItems } from "../../interfaces/PaginatedItems.interface";

export interface ICompanyMembersQuizzesAnalitic {
  memberId: string;
  userId: string;
  userName: string;
  results: ICompanyMembersQuizzesAnaliticResult[];
}
interface ICompanyMembersQuizzesAnaliticResult {
  date: string;
  quizId: string;
  score: string;
  userName: string;
}
export interface ICompanyMembersQuizzesLastTryDate {
  lastTryDate: string;
  member_id: string;
}

export const companyAnatilicsApi = createApi({
  reducerPath: "api/companyAnalitics",
  baseQuery: baseQueryWithReauth,
  tagTypes: [""],
  endpoints: (builder) => ({
    getAllCompanyMembersQuizzesScoresList: builder.query<
      GeneralResponse<ICompanyMembersQuizzesAnalitic[]>,
      string
    >({
      query: (companyId: string) => ({
        url: `/analitics/company-members-results/${companyId}`,
        method: "GET",
      }),
    }),
    getAllCompanyMembersQuizzesLastTryDate: builder.query<
      GeneralResponse<ICompanyMembersQuizzesLastTryDate[]>,
      string
    >({
      query: (companyId: string) => ({
        url: `/analitics/company-members-last-tries/${companyId}`,
        method: "GET",
      }),
    }),
  }),
});
export const {
  useGetAllCompanyMembersQuizzesScoresListQuery,
  useGetAllCompanyMembersQuizzesLastTryDateQuery,
} = companyAnatilicsApi;
