"use client";
import isAuth from "../../utils/checkUserAuthentication";
import { useState } from "react";
import { InvitesActionsPanel } from "../../components/invites/InvitesActionsPanel";
import { Requests } from "../../components/invites/Requests";
import { Invites } from "../../components/invites/Invites";

enum mainTabs {
  requests = "requests",
  invites = "invites",
}

function Home() {
  const [isRequests, setInvitesState] = useState<boolean>(true);

  return (
    <div className="p-5 w-full">
      <div className="w-[98%] my-4 flex pb-2 border-b-2 border-blue-900 border-opacity-50">
        <InvitesActionsPanel
          mainTabsState={isRequests ? mainTabs.requests : mainTabs.invites}
          showRequests={() => setInvitesState(true)}
          showInvites={() => setInvitesState(false)}
        />
      </div>
      {isRequests ? <Requests /> : <Invites />}
    </div>
  );
}
export default isAuth(Home);
