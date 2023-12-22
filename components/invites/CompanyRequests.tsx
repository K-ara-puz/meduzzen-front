import { toast } from "react-toastify";
import {
  useApproveUserRequestMutation,
  useDeclineUserRequestMutation,
  useGetRequestsQuery,
} from "../../app/api/companyApi";
import { InviteType } from "../../utils/constants";
import { CompanyInviteCard } from "./CompanyInviteCard";

interface CompanyInvitesProps {
  companyId: string;
}

export const CompanyRequests = (props: CompanyInvitesProps) => {
  const { data: requests } = useGetRequestsQuery(props.companyId);
  const [approveUserRequest] = useApproveUserRequestMutation();
  const [declineUserRequest] = useDeclineUserRequestMutation();

  const declineRequest = (inviteData) => {
    declineUserRequest({
      companyId: inviteData.companyId,
      userFromId: inviteData.userFromId,
    })
      .unwrap()
      .then(() => {
        toast("request was declined", { autoClose: 2000, type: "success" });
      })
      .catch((error) => {
        toast(error.data.message, { autoClose: 2000, type: "error" });
      });
  };

  const approveRequest = (inviteData) => {
    approveUserRequest({
      companyId: inviteData.companyId,
      userFromId: inviteData.userFromId,
    })
      .unwrap()
      .then(() => {
        toast("request was approved", { autoClose: 2000, type: "success" });
      })
      .catch((error) => {
        toast(error.data.message, { autoClose: 2000, type: "error" });
      });
  };

  return (
    <div>
      {requests?.detail.length > 0 ? (
        <div>
          <div className="grid grid-cols-3 mt-6 md:grid-cols-5 mx-auto max-w-[1200px] gap-10">
            {requests.detail.map((el) => (
              <CompanyInviteCard
                key={el.id}
                data={el}
                type={InviteType.request}
                approveRequest={approveRequest}
                declineRequest={declineRequest}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>You do not have requests yet!</div>
      )}
    </div>
  );
};
