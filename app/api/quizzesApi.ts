import { createApi } from "@reduxjs/toolkit/query/react";
import { GeneralResponse } from "../../interfaces/generalResponse.interface";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
import { PaginatedItems } from "../../interfaces/PaginatedItems.interface";
import { toast } from "react-toastify";
import { CompanyData } from "../../interfaces/CompanyData.interface";
import { GetPaginatedItems } from "../../interfaces/GetPaginatedItems.interface";

export interface IQuiz {
  id: string;
  name: string;
  description: string;
  attemptsPerDay: number;
  company: Partial<CompanyData>;
}
export interface IQuizAnswer {
  id: string;
  isRight: boolean;
  value: string;
  question: { id: string; name: string };
}
export interface GetQuizzesProps extends GetPaginatedItems {
  companyId: string;
}
interface GetQuiz {
  quizId: string;
  companyId: string;
}
export interface IQuizAnswerCreate {
  value: string;
  isRight: boolean;
}

export interface IQuizQuestionCreate {
  name: string;
  answers: IQuizAnswerCreate[];
}

export interface CreateQuizDto {
  name: string;
  description: string;
  attemptsPerDay: number;
  questions: IQuizQuestionCreate[];
  companyId: string;
}

export interface UpdateQuizDto {
  quiz: {
    id?: string;
    name?: string;
    description?: string;
    attemptsPerDay?: number;
    questions?: IQuizQuestionUpdate[];
  };
  companyId: string;
}
export interface IQuizQuestionUpdate extends IQuizQuestionCreate {
  id: string;
  answers: IQuizAnswerUpdate[];
}
export interface IQuizAnswerUpdate extends IQuizAnswerCreate {
  id: string;
}
export interface PassQuizAnswer {
  questionId: string,
  answersId: String[]
}
export interface PassQuizData {
  answers: PassQuizAnswer[],
  quizId: string,
  companyId: string
}
export interface PassQuizResult {
  allQuestionsCount: number,
  rightQuestionsCount: number
}

export const quizzesApi = createApi({
  reducerPath: "api/quizzes",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Quiz", "Quizzes"],
  endpoints: (builder) => ({
    getCompanyQuizzes: builder.query<
      GeneralResponse<PaginatedItems<IQuiz[]>>,
      GetQuizzesProps
    >({
      query: ({ limit, page, companyId }) => ({
        url: `/quizzes/all/${companyId}?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Quizzes"],
    }),
    getCompanyQuiz: builder.query<GeneralResponse<IQuiz>, GetQuiz>({
      query: ({ quizId, companyId }) => ({
        url: `/quizzes/one/${quizId}/${companyId}`,
        method: "GET",
      }),
      providesTags: ["Quiz"],
    }),
    getCompanyQuizQuestionsAndAnswers: builder.query<
      GeneralResponse<IQuizAnswer[]>,
      GetQuiz
    >({
      query: ({ quizId, companyId }) => ({
        url: `/quizzes/quiz-questions-and-answers/${quizId}/${companyId}`,
        method: "GET",
      }),
      providesTags: ["Quiz"],
    }),
    getCompanyQuizQuestions: builder.query<
      GeneralResponse<IQuizAnswer[]>,
      GetQuiz
    >({
      query: ({ quizId, companyId }) => ({
        url: `/quizzes/quiz-questions/${quizId}/${companyId}`,
        method: "GET",
      }),
      providesTags: ["Quiz"],
    }),
    makeCompanyQuiz: builder.mutation<GeneralResponse<IQuiz>, CreateQuizDto>({
      query: ({ companyId, ...quiz }) => ({
        url: `/quizzes/${companyId}`,
        method: "POST",
        body: quiz,
        responseHandler: async (response) => {
          const res = await response.json();
          if (res.hasOwnProperty("error")) {
            toast(res.error.message, { autoClose: 2000, type: "error" });
            return res;
          }
          toast("quiz was created", { autoClose: 2000, type: "success" });
          return res;
        },
      }),
      invalidatesTags: ["Quiz", "Quizzes"],
    }),
    passCompanyQuiz: builder.mutation<GeneralResponse<PassQuizResult>, PassQuizData>({
      query: ({ quizId, companyId, ...quiz }) => ({
        url: `/quizzes/start/${quizId}/${companyId}`,
        method: "POST",
        body: {...quiz},
        responseHandler: async (response) => {
          const res = await response.json();
          if (res.hasOwnProperty("error")) {
            toast(res.error.message, { autoClose: 2000, type: "error" });
            return res;
          }
          toast(`quiz result: ${res.detail.rightQuestionsCount} / ${res.detail.allQuestionsCount}`, { autoClose: 2000, type: "success" });
          return res;
        },
      }),
    }),
    editCompanyQuiz: builder.mutation<GeneralResponse<IQuiz>, UpdateQuizDto>({
      query: ({ quiz, companyId }) => ({
        url: `/quizzes/${companyId}`,
        method: "PATCH",
        body: quiz,
        responseHandler: async (response) => {
          const res = await response.json();
          if (res.hasOwnProperty("error")) {
            toast(res.error.message, { autoClose: 2000, type: "error" });
            return res;
          }
          toast("quiz was edited", { autoClose: 2000, type: "success" });
          return res;
        },
      }),
      invalidatesTags: ["Quiz", "Quizzes"],
    }),
    deleteCompanyQuiz: builder.mutation<GeneralResponse<IQuiz>, GetQuiz>({
      query: ({ quizId, companyId }) => ({
        url: `/quizzes`,
        method: "DELETE",
        body: { quizId, companyId },
        responseHandler: async (response) => {
          const res = await response.json();
          if (res.hasOwnProperty("error")) {
            toast(res.error.message, { autoClose: 2000, type: "error" });
            return res;
          }
          toast("quiz was deleted", { autoClose: 2000, type: "success" });
          return res;
        },
      }),
      invalidatesTags: ["Quizzes"],
    }),
  }),
});
export const {
  useGetCompanyQuizzesQuery,
  useMakeCompanyQuizMutation,
  useGetCompanyQuizQuery,
  useGetCompanyQuizQuestionsQuery,
  useGetCompanyQuizQuestionsAndAnswersQuery,
  useEditCompanyQuizMutation,
  useDeleteCompanyQuizMutation,
  usePassCompanyQuizMutation
} = quizzesApi;
