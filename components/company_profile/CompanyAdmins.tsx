import { useState } from "react";
import { CustomPaginator } from "../CustomPaginator";
import { UserCard } from "../UserCard";
import { useGetCompanyAdminsQuery } from "../../app/api/companyApi";
import BasicPopup from "../popups/BasicPopup";
import { CompanyMemberRoles } from "../../utils/constants";
import { SelectRolesForm } from "../forms/CompanyMemberRoleEditForm";

interface CompanyAdminsProps {
  companyId: string;
}
interface CompanyAdminsState {
  limit: number;
  page: number;
  companyId: string;
  isSetRolePopupOpen: boolean;
  targetSetRoleUserId: string;
}

export const CompanyAdmins = (props: CompanyAdminsProps) => {
  const standardLimit = 5;
  const [state, setState] = useState<CompanyAdminsState>({
    limit: standardLimit,
    page: 1,
    companyId: "",
    isSetRolePopupOpen: false,
    targetSetRoleUserId: "",
  });
  const { data: admins } = useGetCompanyAdminsQuery({
    companyId: props.companyId,
    limit: state.limit,
    page: state.page,
  });
  const nextPage = async (page: number) => {
    setState({ ...state, limit: standardLimit, page: page });
  };

  return (
    <div>
      {admins && (
        <div>
          <div className="grid grid-cols-3 mt-6 md:grid-cols-5 mx-auto max-w-[1200px] gap-10">
            {admins.detail.items.map((el) => (
              <UserCard
                key={el.user.id}
                userData={{ ...el.user }}
                addRole={() => {
                  setState({
                    ...state,
                    isSetRolePopupOpen: true,
                    targetSetRoleUserId: el.user.id,
                  });
                }}
                role={el.role}
              ></UserCard>
            ))}
          </div>
          <div className="my-5 flex items-center justify-center">
            <CustomPaginator
              limit={state.limit}
              totalItems={admins.detail["totalItemsCount"]}
              onClick={nextPage}
            />
          </div>
        </div>
      )}
      {admins?.detail.items.length < 1 && (
        <div>Your company does not have admins yet!</div>
      )}
      <BasicPopup
        shouldShow={state.isSetRolePopupOpen}
        title="Roles"
        onRequestClose={() => {
          setState({ ...state, isSetRolePopupOpen: false });
        }}
      >
        <SelectRolesForm
          companyId={props.companyId}
          userId={state.targetSetRoleUserId}
          closePopup={() => {
            setState({ ...state, isSetRolePopupOpen: false });
          }}
          role={CompanyMemberRoles.admin}
        />
      </BasicPopup>
    </div>
  );
};
