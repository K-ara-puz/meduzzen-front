import { CompanyProfileMainTabs } from "../../utils/constants";
import CustomBtn from "../CustomBtn";

interface CompanyActionsPanelProps {
  showInvites?: () => void;
  showRequests?: () => void;
  showMembers?: () => void;
  showAdmins?: () => void;
  showQuizzes?: () => void;
  showAnalitic?: () => void;
  activeTab?: string;
}

export const CompanyActionsPanel = (props: CompanyActionsPanelProps) => {
  return (
    <div className="nav flex flex-wrap gap-5 border-t-2 border-blue-300 pt-3">
      {props.hasOwnProperty("showMembers") && (
        <div className="max-w-[200px]">
          <CustomBtn
            btnState="gray"
            title="Members"
            clickHandler={() => props.showMembers()}
            activeBtn={
              props.activeTab === CompanyProfileMainTabs.members ? true : false
            }
          />
        </div>
      )}
      {props.hasOwnProperty("showAdmins") && (
        <div className="max-w-[200px]">
          <CustomBtn
            btnState="gray"
            title="Admins"
            clickHandler={() => props.showAdmins()}
            activeBtn={
              props.activeTab === CompanyProfileMainTabs.admins ? true : false
            }
          />
        </div>
      )}
      {props.hasOwnProperty("showInvites") && (
        <div className="max-w-[200px]">
          <CustomBtn
            btnState="gray"
            title="Invites"
            clickHandler={() => props.showInvites()}
            activeBtn={
              props.activeTab === CompanyProfileMainTabs.invites ? true : false
            }
          />
        </div>
      )}
      {props.hasOwnProperty("showRequests") && (
        <div className="max-w-[200px]">
          <CustomBtn
            btnState="gray"
            title="Requests"
            clickHandler={() => props.showRequests()}
            activeBtn={
              props.activeTab === CompanyProfileMainTabs.requests ? true : false
            }
          />
        </div>
      )}
      {props.hasOwnProperty("showQuizzes") && (
        <div className="max-w-[200px]">
          <CustomBtn
            btnState="gray"
            title="Quizzes"
            clickHandler={() => props.showQuizzes()}
            activeBtn={
              props.activeTab === CompanyProfileMainTabs.quizzes ? true : false
            }
          />
        </div>
      )}
      {props.hasOwnProperty("showAnalitic") && (
        <div className="max-w-[200px]">
          <CustomBtn
            btnState="gray"
            title="Analitics"
            clickHandler={() => props.showAnalitic()}
            activeBtn={
              props.activeTab === CompanyProfileMainTabs.analitics
                ? true
                : false
            }
          />
        </div>
      )}
    </div>
  );
};
