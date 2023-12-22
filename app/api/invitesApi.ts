import { createApi } from "@reduxjs/toolkit/query/react";
import { GeneralResponse } from "../../interfaces/generalResponse.interface";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
import { Invite } from "../../interfaces/Invite.interface";

interface sendInviteToCompanyDto {
  companyId: string;
}
interface abortInviteToCompanyDto {
  companyId: string;
  userFromId: string;
}

export const invitesApi = createApi({
  reducerPath: "api/invites",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Requests", "Invites"],
  endpoints: (builder) => ({
    getRequests: builder.query<GeneralResponse<Invite[]>, void>({
      query: () => ({
        url: `/companies-invites/get-user-requests-to-company`,
        method: "GET",
      }),
      providesTags: ["Requests"],
    }),
    getInvites: builder.query<GeneralResponse<Invite[]>, void>({
      query: () => ({
        url: `/companies-invites/get-user-invites-to-company`,
        method: "GET",
      }),
      providesTags: ["Invites"],
    }),
    sendInviteToCompany: builder.mutation<
      GeneralResponse<Invite[]>,
      sendInviteToCompanyDto
    >({
      query: (body) => ({
        url: `/companies-invites/invite-request-to-company`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Requests"],
    }),
    abortInviteToCompany: builder.mutation<
      GeneralResponse<Invite[]>,
      abortInviteToCompanyDto
    >({
      query: (body) => ({
        url: `/companies-invites/abort-invite-request-to-company`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Requests"],
    }),
    approveInviteToCompany: builder.mutation<
      GeneralResponse<Invite[]>,
      abortInviteToCompanyDto
    >({
      query: (body) => ({
        url: `/companies-invites/approve-invite-request-to-company`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Invites"],
    }),
    declineInviteToCompany: builder.mutation<
      GeneralResponse<Invite[]>,
      abortInviteToCompanyDto
    >({
      query: (body) => ({
        url: `/companies-invites/decline-invite-request-to-company`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Invites"],
    }),
  }),
});
export const {
  useGetRequestsQuery,
  useSendInviteToCompanyMutation,
  useAbortInviteToCompanyMutation,
  useGetInvitesQuery,
  useApproveInviteToCompanyMutation,
  useDeclineInviteToCompanyMutation,
} = invitesApi;
