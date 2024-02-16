import { useState } from "react";
import {
  useAddAdminRoleMutation,
  useEditCompanyMemberRoleMutation,
} from "../../app/api/companyApi";
import { CompanyMemberRoles } from "../../utils/constants";
import { Checkbox } from "@mui/material";
import CustomBtn from "../CustomBtn";

interface SelectRolesFormState {
  activeRole: string;
}
interface SelectRoleFormProps {
  companyId: string;
  userId: string;
  closePopup: () => void;
  role?: string;
}
export const SelectRolesForm = (props: SelectRoleFormProps) => {
  const [state, setState] = useState<SelectRolesFormState>({
    activeRole: props.role,
  });
  const [addAdminRole] = useAddAdminRoleMutation();
  const [editCompanyMemberRole] = useEditCompanyMemberRoleMutation();

  const setRole = () => {
    if (state.activeRole === CompanyMemberRoles.admin) {
      addAdminRole({
        companyId: props.companyId,
        role: CompanyMemberRoles.admin,
        userId: props.userId,
      }).then(() => props.closePopup());
      return;
    }
    editCompanyMemberRole({
      companyId: props.companyId,
      role: CompanyMemberRoles.simpleUser,
      userId: props.userId,
    }).then(() => props.closePopup());
    return;
  };

  return (
    <form className="w-96">
      <div>
        <Checkbox
          checked={state.activeRole === CompanyMemberRoles.admin}
          onChange={() =>
            setState({ ...state, activeRole: CompanyMemberRoles.admin })
          }
        />
        <label>Admin</label>
      </div>
      <div>
        <Checkbox
          checked={state.activeRole === CompanyMemberRoles.simpleUser}
          onChange={() =>
            setState({ ...state, activeRole: CompanyMemberRoles.simpleUser })
          }
        />
        <label>User</label>
      </div>
      <CustomBtn title="Submit" btnState="success" clickHandler={setRole} />
    </form>
  );
};
