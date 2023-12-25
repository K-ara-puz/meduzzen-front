import { useState } from "react";
import { CustomPaginator } from "../CustomPaginator";
import { UserCard } from "../UserCard";
import {
  useDeleteUserFromCompanyMutation,
  useGetAllCompanyMembersQuery,
} from "../../app/api/companyApi";
import BasicPopup from "../popups/BasicPopup";
import { CommonWarningForm } from "../forms/CommonWarningForm";
import { SelectRolesForm } from "./CompanyMemberRoleEditForm";

interface CompanyMembersProps {
  companyId: string;
}
interface CompanyMembersState {
  limit: number;
  page: number;
  companyId: string;
  isAddRolePopupOpen: boolean;
  isWarningPopupOpen: boolean;
  targetSetRoleUser: {
    id: string;
    currentRole?: string;
  };
  targetDeleteMemberId: string;
}

export const CompanyMembers = (props: CompanyMembersProps) => {
  const standardLimit = 5;
  const [state, setState] = useState<CompanyMembersState>({
    limit: standardLimit,
    page: 1,
    companyId: "",
    isAddRolePopupOpen: false,
    targetSetRoleUser: {
      id: "",
      currentRole: "",
    },
    targetDeleteMemberId: "",
    isWarningPopupOpen: false,
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

  const deleteUserFromCompany = () => {
    deleteUser({
      companyId: props.companyId,
      userId: state.targetDeleteMemberId,
    }).then(() => setState({ ...state, isWarningPopupOpen: false }));
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
                deleteMember={() =>
                  setState({
                    ...state,
                    isWarningPopupOpen: true,
                    targetDeleteMemberId: el.user.id,
                  })
                }
                addRole={() => {
                  setState({
                    ...state,
                    isAddRolePopupOpen: true,
                    targetSetRoleUser: { id: el.user.id, currentRole: el.role },
                  });
                }}
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
      <BasicPopup
        shouldShow={state.isAddRolePopupOpen}
        title="Add role"
        onRequestClose={() => {
          setState({ ...state, isAddRolePopupOpen: false });
        }}
      >
        <SelectRolesForm
          companyId={props.companyId}
          userId={state.targetSetRoleUser.id}
          closePopup={() => {
            setState({ ...state, isAddRolePopupOpen: false });
          }}
          role={state.targetSetRoleUser.currentRole}
        />
      </BasicPopup>
      <BasicPopup
        shouldShow={state.isWarningPopupOpen}
        title=""
        onRequestClose={() => {
          setState({ ...state, isWarningPopupOpen: false });
        }}
      >
        <CommonWarningForm
          apply={deleteUserFromCompany}
          cancel={() => setState({ ...state, isWarningPopupOpen: false })}
          title={`Are you sure you want to delete member?`}
        />
      </BasicPopup>
    </div>
  );
};
