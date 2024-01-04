import { CompanyProfileMainTabs } from "../../utils/constants";
import CustomBtn from "../CustomBtn";

interface CompanyActionsPanelProps {
  showInvites?: () => void;
  showRequests?: () => void;
  showMembers?: () => void;
  showAdmins?: () => void;
  showQuizzes?: () => void;
  activeTab?: string;
}

export const CompanyActionsPanel = (props: CompanyActionsPanelProps) => {
  return (
    <div>
      <div className="nav flex gap-5 h-10">
        {props.hasOwnProperty("showMembers") && (
          <CustomBtn
            btnState="gray"
            title="Members"
            clickHandler={() => props.showMembers()}
            activeBtn={
              props.activeTab === CompanyProfileMainTabs.members ? true : false
            }
          />
        )}
        {props.hasOwnProperty("showAdmins") && (
          <CustomBtn
            btnState="gray"
            title="Admins"
            clickHandler={() => props.showAdmins()}
            activeBtn={
              props.activeTab === CompanyProfileMainTabs.admins ? true : false
            }
          />
        )}
        {props.hasOwnProperty("showInvites") && (
          <CustomBtn
            btnState="gray"
            title="Invites"
            clickHandler={() => props.showInvites()}
            activeBtn={
              props.activeTab === CompanyProfileMainTabs.invites ? true : false
            }
          />
        )}
        {props.hasOwnProperty("showRequests") && (
          <CustomBtn
            btnState="gray"
            title="Requests"
            clickHandler={() => props.showRequests()}
            activeBtn={
              props.activeTab === CompanyProfileMainTabs.requests ? true : false
            }
          />
        )}
        {props.hasOwnProperty("showQuizzes") && (
          <CustomBtn
            btnState="purple"
            title="Quizzes"
            clickHandler={() => props.showQuizzes()}
            activeBtn={
              props.activeTab === CompanyProfileMainTabs.quizzes ? true : false
            }
          />
        )}
      </div>
    </div>
  );
};
