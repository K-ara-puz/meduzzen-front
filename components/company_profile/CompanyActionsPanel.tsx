import { CompanyProfileMainTabs } from "../../utils/constants";
import CustomBtn from "../CustomBtn";

interface CompanyActionsPanelProps {
  showInvites: () => void;
  showRequests: () => void;
  showMembers: () => void;
  showAdmins: () => void;
  activeTab?: string;
}

export const CompanyActionsPanel = (props: CompanyActionsPanelProps) => {
  return (
    <div>
      <div className="nav flex gap-5 h-10">
        <CustomBtn
          btnState="gray"
          title="Members"
          clickHandler={() => props.showMembers()}
          activeBtn={
            props.activeTab === CompanyProfileMainTabs.members ? true : false
          }
        />
        <CustomBtn
          btnState="gray"
          title="Admins"
          clickHandler={() => props.showAdmins()}
          activeBtn={
            props.activeTab === CompanyProfileMainTabs.admins ? true : false
          }
        />
        <CustomBtn
          btnState="gray"
          title="Invites"
          clickHandler={() => props.showInvites()}
          activeBtn={
            props.activeTab === CompanyProfileMainTabs.invites ? true : false
          }
        />
        <CustomBtn
          btnState="gray"
          title="Requests"
          clickHandler={() => props.showRequests()}
          activeBtn={
            props.activeTab === CompanyProfileMainTabs.requests ? true : false
          }
        />
      </div>
    </div>
  );
};
