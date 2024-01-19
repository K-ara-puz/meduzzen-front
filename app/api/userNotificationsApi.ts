import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
import { GeneralResponse } from "@/interfaces/generalResponse.interface";

export interface UserNotification {
  created_at: string;
  id?: string;
  status: string;
  text: string;
}

export const userNotificationsApi = createApi({
  reducerPath: "api/userNotificationsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Notification"],
  endpoints: (builder) => ({
    getUserNotifications: builder.query<
      GeneralResponse<UserNotification[]>,
      void
    >({
      query: () => ({
        url: `/notifications`,
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),
    setViewedNotificationStatus: builder.mutation<
      GeneralResponse<UserNotification>,
      string
    >({
      query: (notificationId: string) => ({
        url: `/notifications/set-viewed-status/${notificationId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});
export const {
  useGetUserNotificationsQuery,
  useSetViewedNotificationStatusMutation,
} = userNotificationsApi;
