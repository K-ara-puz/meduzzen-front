import {
  useAbortInviteToCompanyMutation,
  useGetRequestsQuery,
} from "../../app/api/invitesApi";
import { InviteType } from "../../utils/constants";
import { InviteCard } from "./InviteCard";

export const Requests = () => {
  const { data: requests } = useGetRequestsQuery();
  const [abortMyRequest] = useAbortInviteToCompanyMutation();

  const abortRequest = (companyId: string, userFrom: string) => {
    abortMyRequest({ companyId, userFromId: userFrom })
  };

  return (
    <div>
      {requests?.detail.length > 0 ? (
        <div>
          <div className="grid grid-cols-3 mt-6 md:grid-cols-5 mx-auto max-w-[1200px] gap-10">
            {requests.detail.map((el) => (
              <InviteCard
                key={el.company.id}
                data={el}
                abortMyRequest={abortRequest}
                type={InviteType.request}
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
