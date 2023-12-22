import { useState } from "react";
import { toast } from "react-toastify";
import { CustomPaginator } from "../CustomPaginator";
import { UserCard } from "../UserCard";
import {
  useDeleteUserFromCompanyMutation,
  useGetAllCompanyMembersQuery,
} from "../../app/api/companyApi";

interface CompanyMembersProps {
  companyId: string;
}
interface CompanyMembersState {
  limit: number;
  page: number;
  companyId: string;
}

export const CompanyMembers = (props: CompanyMembersProps) => {
  const standardLimit = 5;
  const [state, setState] = useState<CompanyMembersState>({
    limit: standardLimit,
    page: 1,
    companyId: "",
  });
  const { data: members } = useGetAllCompanyMembersQuery({
    companyId: props.companyId,
    limit: state.limit,
    page: state.page,
  });
  const [deleteUser] = useDeleteUserFromCompanyMutation();

  const nextPage = async (page: number) => {
    setState({ ...state, limit: standardLimit, page: page });
  };

  const deleteUserFromCompany = (userId: string) => {
    deleteUser({
      companyId: props.companyId,
      userId: userId,
    })
      .unwrap()
      .then(() => {
        toast("member was deleted", { autoClose: 2000, type: "success" });
      })
      .catch((error) => {
        toast(error.data.message, { autoClose: 2000, type: "error" });
      });
  };

  return (
    <div>
      {members && (
        <div>
          <div className="grid grid-cols-3 mt-6 md:grid-cols-5 mx-auto max-w-[1200px] gap-10">
            {members.detail.items.map((el) => (
              <UserCard
                key={el.id}
                userData={{ ...el.user }}
                companyMember={true}
                deleteMember={deleteUserFromCompany}
                role={el.role}
              ></UserCard>
            ))}
          </div>
          <div className="my-5 flex items-center justify-center">
            <CustomPaginator
              limit={state.limit}
              totalItems={members.detail["totalItemsCount"]}
              onClick={nextPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};
