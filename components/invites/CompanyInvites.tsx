import {
  useAbortInviteToUserMutation,
  useGetInvitesQuery,
} from "../../app/api/companyApi";
import { InviteType } from "../../utils/constants";
import { CompanyInviteCard } from "./CompanyInviteCard";

interface CompanyInvitesProps {
  companyId: string;
}

export const CompanyInvites = (props: CompanyInvitesProps) => {
  const { data: invites } = useGetInvitesQuery(props.companyId);
  const [abortInviteToUser] = useAbortInviteToUserMutation();

  const abortInvite = (inviteData) => {
    abortInviteToUser({
      companyId: inviteData.companyId,
      targetUserId: inviteData.targetUserId,
    })
  };

  return (
    <div>
      {invites?.detail.length > 0 ? (
        <div>
          <div className="grid grid-cols-3 mt-6 md:grid-cols-5 mx-auto max-w-[1200px] gap-10">
            {invites.detail.map((el) => (
              <CompanyInviteCard
                key={el.id}
                data={el}
                type={InviteType.invite}
                abortMyInvite={abortInvite}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>You do not have invites yet!</div>
      )}
    </div>
  );
};
