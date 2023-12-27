import { createApi } from "@reduxjs/toolkit/query/react";
import { GeneralResponse } from "../../interfaces/generalResponse.interface";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
import { Invite } from "../../interfaces/Invite.interface";
import { CompanyMember } from "../../interfaces/CompanyMember.interface";
import { PaginatedItems } from "../../interfaces/PaginatedItems.interface";
import { toast } from "react-toastify";

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
        responseHandler: async (response) => {
          const res = await response.json()
          if (res.hasOwnProperty('error')) {
            toast(res.error.message, { autoClose: 2000, type: "error" });
            return res
          }
          toast("your invite was send", { autoClose: 2000, type: "success" });
          return res
        }
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
        responseHandler: async (response) => {
          const res = await response.json()
          if (res.hasOwnProperty('error')) {
            toast(res.error.message, { autoClose: 2000, type: "error" });
            return res
          }
          toast("your invite was aborted", { autoClose: 2000, type: "success" });
          return res
        }
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
        responseHandler: async (response) => {
          const res = await response.json()
          if (res.hasOwnProperty('error')) {
            toast(res.error.message, { autoClose: 2000, type: "error" });
            return res
          }
          toast("request was approved", { autoClose: 2000, type: "success" });
          return res
        }
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
        responseHandler: async (response) => {
          const res = await response.json()
          if (res.hasOwnProperty('error')) {
            toast(res.error.message, { autoClose: 2000, type: "error" });
            return res
          }
          toast("request was declined", { autoClose: 2000, type: "success" });
          return res
        }
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
        responseHandler: async (response) => {
          const res = await response.json()
          if (res.hasOwnProperty('error')) {
            toast(res.error.message, { autoClose: 2000, type: "error" });
            return res
          }
          toast("member was deleted", { autoClose: 2000, type: "success" });
          return res
        }
      }),
      invalidatesTags: ["Members"],
    }),
    leaveCompany: builder.mutation<
      GeneralResponse<string>,
      string
    >({
      query: (companyId) => ({
        url: `/companies-members/leave-company/${companyId}`,
        method: "DELETE",
        responseHandler: async (response) => {
          const res = await response.json()
          if (res.hasOwnProperty('error')) {
            toast(res.error.message, { autoClose: 2000, type: "error" });
            return res
          }
          toast("you successfully leaved company", { autoClose: 2000, type: "success" });
          return res
        }
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
