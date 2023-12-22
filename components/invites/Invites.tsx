import { toast } from "react-toastify";
import {
  useApproveInviteToCompanyMutation,
  useDeclineInviteToCompanyMutation,
  useGetInvitesQuery,
} from "../../app/api/invitesApi";
import { InviteType } from "../../utils/constants";
import { InviteCard } from "./InviteCard";

export const Invites = () => {
  const { data: invites } = useGetInvitesQuery();
  const [approveInviteToCompany] = useApproveInviteToCompanyMutation();
  const [declineInviteToCompany] = useDeclineInviteToCompanyMutation();

  const declineMyInvite = (inviteData) => {
    declineInviteToCompany({
      companyId: inviteData.companyId,
      userFromId: inviteData.userFromId,
    })
      .unwrap()
      .then(() => {
        toast("your invite was declined", { autoClose: 2000, type: "success" });
      })
      .catch((error) => {
        toast(error.data.message, { autoClose: 2000, type: "error" });
      });
  };

  const approveMyInvite = (inviteData) => {
    approveInviteToCompany({
      companyId: inviteData.companyId,
      userFromId: inviteData.userFromId,
    })
      .unwrap()
      .then(() => {
        toast("your invite was approved", { autoClose: 2000, type: "success" });
      })
      .catch((error) => {
        toast(error.data.message, { autoClose: 2000, type: "error" });
      });
  };

  return (
    <div>
      {invites?.detail.length > 0 ? (
        <div>
          <div className="grid grid-cols-3 mt-6 md:grid-cols-5 mx-auto max-w-[1200px] gap-10">
            {invites.detail.map((el) => (
              <InviteCard
                key={el.company.id}
                data={el}
                declineMyInvite={declineMyInvite}
                approveMyInvite={approveMyInvite}
                type={InviteType.invite}
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
