"use client";
import { Invite } from "../../interfaces/Invite.interface";
import CustomBtn from "../CustomBtn";
import { InviteStatus, InviteType } from "../../utils/constants";
import { useState } from "react";

interface InviteCardProps {
  data: Invite;
  abortMyInvite?: (companyId: string, userFrom: string) => void;
  declineRequest?: (inviteData) => void;
  approveRequest?: (inviteData) => void;
  type: string;
}

export const CompanyInviteCard = (props: InviteCardProps) => {
  return (
    <div className="bg-slate-300 max-w-xs flex flex-col gap-5 text-center">
      <div className="flex flex-auto flex-col justify-between">
        {props.data.type === InviteType.request ? (
          <div>
            {props.data.userFrom.avatar ? (
              <div className="w-full h-36 relative">
                <img
                  src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}/${props.data.userFrom.avatar}`}
                  className="absolute object-cover h-full w-full"
                  alt="User background"
                />
              </div>
            ) : (
              <div className="w-full h-36 relative after:content-['R'] after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:text-4xl after:text-gray-00 after:-translate-y-1/2 after:absolute bg-blue-300"></div>
            )}
          </div>
        ) : (
          <div>
            {props.data.targetUser.avatar ? (
              <div className="w-full h-36 relative">
                <img
                  src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}/${props.data.targetUser.avatar}`}
                  className="absolute object-cover h-full w-full"
                  alt="User background"
                />
              </div>
            ) : (
              <div className="w-full h-36 relative after:content-['R'] after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:text-4xl after:text-gray-00 after:-translate-y-1/2 after:absolute bg-blue-300"></div>
            )}
          </div>
        )}

        <div className="flex-auto break-all whitespace-pre-line p-2 text-left">
          <div className="mb-2">
            <span className="font-bold">To company:</span>{" "}
            {props.data.company.name}
          </div>
          <div className="mb-2">
            <span className="font-bold">Status:</span> {props.data.status}
          </div>
          {props.type === InviteType.invite ? (
            <div className="mb-2">
              <span className="font-bold">User: </span>
              {props.data.targetUser.email}
            </div>
          ) : (
            <div className="mb-2">
              <span className="font-bold">User: </span>{" "}
              {props.data.userFrom.email}
            </div>
          )}
        </div>
        <div>
          {props.type === InviteType.invite
            ? inviteActions(props.abortMyInvite, {
                companyId: props.data.company.id,
                targetUserId: props.data.targetUser.id,
                status: props.data.status,
              })
            : requestActions(props.declineRequest, props.approveRequest, {
                requestStatus: props.data.status,
                companyId: props.data.company.id,
                userFromId: props.data.userFrom.id,
              })}
        </div>
      </div>
    </div>
  );
};

const inviteActions = (abortCallback, inviteData) => {
  return (
    <div>
      {inviteData.status === InviteStatus.pending ? (
        <CustomBtn
          title="Abort"
          btnState="error"
          clickHandler={() => abortCallback(inviteData)}
        />
      ) : null}
    </div>
  );
};
const requestActions = (declineCallback, approveCallback, inviteData) => {
  return (
    <div>
      {inviteData.requestStatus === InviteStatus.pending ? (
        <div className="flex flex-col gap-1">
          <CustomBtn
            title="Approve"
            btnState="success"
            clickHandler={() => approveCallback(inviteData)}
          />
          <CustomBtn
            title="Decline"
            btnState="error"
            clickHandler={() => declineCallback(inviteData)}
          />
        </div>
      ) : null}
    </div>
  );
};
