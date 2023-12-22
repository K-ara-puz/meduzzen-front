import { useState } from "react";
import CustomBtn from "../CustomBtn";
import BasicPopup from "../popups/BasicPopup";

interface InvitesActionsPanelProps {
  showRequests: () => void;
  showInvites: () => void;
}

export const InvitesActionsPanel = (props: InvitesActionsPanelProps) => {
  const [isPopupOpen, setPopupDisplay] = useState<boolean>(false);

  const closePopup = () => setPopupDisplay(false);
  return (
    <div>
      <div className="nav flex gap-5 h-10">
        <CustomBtn
          btnState="gray"
          title="Requests"
          clickHandler={props.showRequests}
        />
        <CustomBtn
          btnState="gray"
          title="Invites"
          clickHandler={props.showInvites}
        />
      </div>
      <BasicPopup
        shouldShow={isPopupOpen}
        title="Add Request"
        onRequestClose={() => closePopup()}
      >
        add form
      </BasicPopup>
    </div>
  );
};
