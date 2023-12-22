import { createApi } from "@reduxjs/toolkit/query/react";
import { GeneralResponse } from "../../interfaces/generalResponse.interface";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
import { Invite } from "../../interfaces/Invite.interface";
import { CompanyMember } from "../../interfaces/CompanyMember.interface";
import { PaginatedItems } from "../../interfaces/PaginatedItems.interface";

interface InviteToCompanyDto {
  companyId: string;
  userFromId?: string;
  targetUserId?: string;
}

interface getAllCompanyMembers {
  limit: string | number;
  page: string | number;
  companyId: string;
}
interface deleteUserFromCompany {
  companyId: string;
  userId?: string;
}

export const companyApi = createApi({
  reducerPath: "api/company",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Requests", "Invites", "Members"],
  endpoints: (builder) => ({
    getRequests: builder.query<GeneralResponse<Invite[]>, string>({
      query: (companyId) => ({
        url: `/companies-invites/get-company-requests/${companyId}`,
        method: "GET",
      }),
      providesTags: ["Requests"],
    }),
    getInvites: builder.query<GeneralResponse<Invite[]>, string>({
      query: (companyId) => ({
        url: `/companies-invites/get-company-invites/${companyId}`,
        method: "GET",
      }),
      providesTags: ["Invites"],
    }),
    sendInviteToUser: builder.mutation<
      GeneralResponse<Invite[]>,
      InviteToCompanyDto
    >({
      query: (body) => ({
        url: `/companies-invites/invite-user-to-company`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Invites"],
    }),
    abortInviteToUser: builder.mutation<
      GeneralResponse<Invite[]>,
      InviteToCompanyDto
    >({
      query: (body) => ({
        url: `/companies-invites/abort-invitation-user-to-company`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Invites"],
    }),
    approveUserRequest: builder.mutation<
      GeneralResponse<Invite[]>,
      InviteToCompanyDto
    >({
      query: (body) => ({
        url: `/companies-invites/approve-invitation-user-to-company`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Requests", "Members"],
    }),
    declineUserRequest: builder.mutation<
      GeneralResponse<Invite[]>,
      InviteToCompanyDto
    >({
      query: (body) => ({
        url: `/companies-invites/decline-user-request-to-company`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Requests"],
    }),
    getMyCompanyMember: builder.query<GeneralResponse<CompanyMember>, string>({
      query: (companyId) => ({
        url: `/companies-members/${companyId}`,
        method: "GET",
      }),
    }),
    getAllCompanyMembers: builder.query<
      GeneralResponse<PaginatedItems<CompanyMember[]>>,
      getAllCompanyMembers
    >({
      query: ({ companyId, page, limit }) => ({
        url: `/companies-members/all/${companyId}?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Members"],
    }),
    deleteUserFromCompany: builder.mutation<
      GeneralResponse<string>,
      deleteUserFromCompany
    >({
      query: ({ companyId, userId }) => ({
        url: `/companies-members/delete/${userId}`,
        method: "DELETE",
        body: { companyId },
      }),
      invalidatesTags: ["Members"],
    }),
    leaveCompany: builder.mutation<
      GeneralResponse<string>,
      deleteUserFromCompany
    >({
      query: ({ companyId }) => ({
        url: `/companies-members/leave-company/${companyId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Members"],
    }),
  }),
});
export const {
  useSendInviteToUserMutation,
  useGetRequestsQuery,
  useGetInvitesQuery,
  useAbortInviteToUserMutation,
  useApproveUserRequestMutation,
  useDeclineUserRequestMutation,
  useGetMyCompanyMemberQuery,
  useGetAllCompanyMembersQuery,
  useDeleteUserFromCompanyMutation,
  useLeaveCompanyMutation,
} = companyApi;
