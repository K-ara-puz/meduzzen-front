import { GeneralResponse } from "@/interfaces/generalResponse.interface";
import { quizzesApi } from "./quizzesApi";
import { ICompanyMembersQuizzesAnalitic } from "./companyAnaliticApi";

interface IUserQuizzesLastTryDate {
  lastTryDate: string;
  company_id: string;
  quiz_id: string;
  quiz_name: string;
}

interface IUserScore {
  allQuestionsCount: number;
  rightQuestionsCount: number;
}

export const userAnatilicsApi = quizzesApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserQuizzesScoresList: builder.query<
      GeneralResponse<ICompanyMembersQuizzesAnalitic[]>,
      void
    >({
      query: () => ({
        url: `/analitics/all-user-results`,
        method: "GET",
      }),
    }),
    getUserScoreInApp: builder.query<GeneralResponse<IUserScore>, string>({
      query: (userId) => ({
        url: `/quizzes/average-score-in-app/${userId}`,
        method: "GET",
      }),
      providesTags: ["UserScore"],
    }),
    getAllUserQuizzesLastTries: builder.query<
      GeneralResponse<IUserQuizzesLastTryDate[]>,
      void
    >({
      query: () => ({
        url: `/analitics/all-user-last-tries`,
        method: "GET",
      }),
    }),
  }),
});
export const {
  useGetUserQuizzesScoresListQuery,
  useGetUserScoreInAppQuery,
  useGetAllUserQuizzesLastTriesQuery,
} = userAnatilicsApi;
