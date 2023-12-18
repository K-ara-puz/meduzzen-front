import { createApi } from "@reduxjs/toolkit/query/react";
import { GeneralResponse } from "../../interfaces/generalResponse.interface";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
import { GetCompaniesProps } from "../../interfaces/GetCompaniesProps";
import { CreateCompanyData } from "../../interfaces/CreateCompanyData.interface";
import { CompanyData } from "../../interfaces/CompanyData.interface";
import { PaginatedItems } from "../../interfaces/PaginatedItems.interface";

export const companiesApi = createApi({
  reducerPath: "api/companies",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["AllCompanies", "UserCompany", "UserCompanies"],
  endpoints: (builder) => ({
    getCompanies: builder.query<GeneralResponse<PaginatedItems<CompanyData[]>>, GetCompaniesProps>({
      query: ({ limit, page }) => ({
        url: `/companies?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["AllCompanies"],
      keepUnusedDataFor: 0,
    }),
    addCompany: builder.mutation<GeneralResponse<CompanyData>, CreateCompanyData>({
      query: (body) => {
        return {
          url: `/companies`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["AllCompanies", "UserCompanies"],
    }),
    editCompany: builder.mutation<GeneralResponse<CompanyData>, Partial<CompanyData>>({
      query: (body) => {
        return {
          url: `/companies/${body['id']}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["UserCompany", "UserCompanies"],
    }),
    getUserCompanies: builder.query<GeneralResponse<PaginatedItems<CompanyData[]>>, GetCompaniesProps>({
      query: ({ limit, page }) => ({
        url: `/companies/user-companies?page=${page}&limit=${limit}`,
        method: "GET",
        keepUnusedDataFor: 0,
      }),
      providesTags: ["UserCompanies"],
    }),
    getCompany: builder.query<GeneralResponse<Partial<CompanyData>>, string>({
      query: (id) => ({
        url: `/companies/${id}`,
        method: "GET",
        keepUnusedDataFor: 0,
        refetchOnMountOrArgChange: true,
      }),
      providesTags: ["UserCompany", "UserCompanies"],
    }),
    deleteCompany: builder.mutation<GeneralResponse<string>, string>({
      query: (id) => ({
        url: `/companies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserCompanies", "AllCompanies"],
    }),
  }),
});
export const {
  useGetCompaniesQuery,
  useLazyGetCompaniesQuery,
  useAddCompanyMutation,
  useGetUserCompaniesQuery,
  useLazyGetUserCompaniesQuery,
  useEditCompanyMutation,
  useLazyGetCompanyQuery,
  useGetCompanyQuery,
  useDeleteCompanyMutation
} = companiesApi;
