"use client";
import { Max1400Wrapper } from "@/components/wrappers/Max1400Wrapper";
import {
  UserNotification,
  useGetUserNotificationsQuery,
  useSetViewedNotificationStatusMutation,
} from "../api/userNotificationsApi";
import { Checkbox } from "@mui/material";
import { NotificationStatus } from "@/utils/constants";

export default function Home() {
  const { data: notifications } = useGetUserNotificationsQuery();
  const [setNotifyViewedStatus] = useSetViewedNotificationStatusMutation();

  return (
    <Max1400Wrapper>
      <div className="max-h-[80vh] overflow-y-scroll">
        {notifications && notifications.detail.length > 0 ? (
          <div className="flex flex-col gap-5">
            {notifications.detail.map((notify) => (
              <UserNotify
                key={notify.id}
                notification={notify}
                setViewedStatus={setNotifyViewedStatus}
              />
            ))}
          </div>
        ) : (
          <div>You have no notifications yet!</div>
        )}
      </div>
    </Max1400Wrapper>
  );
}

interface UserNotifyProps {
  notification: UserNotification;
  setViewedStatus: (id: string) => void;
}
const UserNotify = (props: UserNotifyProps) => (
  <div className="flex flex-col sm:flex-row justify-between bg-slate-300 items-center w-full">
    <div className="flex w-full p-2">
      <div className="details flex flex-col">
        <p>
          <span className="font-bold">Status: </span>
          {props.notification.status}
        </p>
        <p>
          <span className="font-bold">Date: </span>
          {new Date(props.notification.created_at)
            .toString()
            .split(" ")
            .slice(0, 5)
            .join(" ")}
        </p>
        <div className="text min-h[10px] bg-slate-100 my-3 w-full p-2 rounded-lg">
          <p>{props.notification.text}</p>
        </div>
      </div>
    </div>
    {props.notification.status === NotificationStatus.received && (
      <div className="viewed-checker bg-green-200 sm:bg-transparent mx-3 flex items-center">
        <span className="h-10 hidden sm:flex w-[2px] bg-slate-500 mr-2"></span>
        <div className="flex whitespace-nowrap">Mark as viewed</div>
        <Checkbox
          onClick={() => props.setViewedStatus(props.notification.id)}
        />
      </div>
    )}
  </div>
);
