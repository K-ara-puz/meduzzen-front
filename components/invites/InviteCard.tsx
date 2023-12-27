"use client";
import { Invite } from "../../interfaces/Invite.interface";
import CustomBtn from "../CustomBtn";
import { InviteStatus, InviteType } from "../../utils/constants";
import BasicPopup from "../popups/BasicPopup";
import { useState } from "react";
import { CommonWarningForm } from "../forms/CommonWarningForm";

interface InviteCardProps {
  data: Invite;
  abortMyRequest?: (companyId: string, userFrom: string) => void;
  declineMyInvite?: (inviteData) => void;
  approveMyInvite?: (inviteData) => void;
  type: string;
}

export const InviteCard = (props: InviteCardProps) => {
  const [isWarningPopupOpen, setWarningPopupState] = useState<boolean>(false);

  return (
    <div className="bg-slate-300 max-w-xs flex flex-col gap-5 text-center">
      <div className="flex flex-auto flex-col justify-between">
        {props.data.company.avatar ? (
          <div className="w-full h-36 relative">
            <img
              src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}/${props.data.company.avatar}`}
              className="absolute object-cover h-full w-full"
              alt="User background"
            />
          </div>
        ) : (
          <div className="w-full h-36 relative after:content-['R'] after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:text-4xl after:text-gray-00 after:-translate-y-1/2 after:absolute bg-blue-300"></div>
        )}
        <div className="flex-auto break-all whitespace-pre-line p-2 text-left">
          <div className="mb-2">
            <span className="font-bold">To company:</span>{" "}
            {props.data.company.name}
          </div>
          <div className="mb-2">
            <span className="font-bold">Status:</span> {props.data.status}
          </div>
        </div>
        <div>
          {props.type === InviteType.invite
            ? inviteActions(props.declineMyInvite, props.approveMyInvite, {
                companyId: props.data.company.id,
                userFromId: props.data.userFrom.id,
                status: props.data.status,
              })
            : requestActions(props.data.status)}
        </div>
      </div>
      <BasicPopup
        shouldShow={isWarningPopupOpen}
        title=""
        onRequestClose={() => setWarningPopupState(false)}
      >
        <CommonWarningForm
          title="Are you sure you want abort this invite?"
          apply={() => {
            props.abortMyRequest(props.data.company.id, props.data.userFrom.id);
            setWarningPopupState(false);
          }}
          cancel={() => setWarningPopupState(false)}
        />
      </BasicPopup>
    </div>
  );
};

const inviteActions = (declineCallback, approveCallback, inviteData) => {
  return (
    <div>
      {inviteData.status === InviteStatus.pending ? (
        <div>
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
const requestActions = (requestStatus: string) => {
  return (
    <div>
      {requestStatus === InviteStatus.pending ? (
        <CustomBtn title="Abort" btnState="error" clickHandler={() => {}} />
      ) : null}
    </div>
  );
};
