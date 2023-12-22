import CustomBtn from "../CustomBtn";

interface CompanyActionsPanelProps {
  showInvites: () => void;
  showRequests: () => void;
  showMembers: () => void;
}

export const CompanyActionsPanel = (props: CompanyActionsPanelProps) => {
  return (
    <div>
      <div className="nav flex gap-5 h-10">
        <CustomBtn
          btnState="success"
          title="Members"
          clickHandler={() => props.showMembers()}
        />
        <CustomBtn
          btnState="gray"
          title="Invites"
          clickHandler={() => props.showInvites()}
        />
        <CustomBtn
          btnState="gray"
          title="Requests"
          clickHandler={() => props.showRequests()}
        />
      </div>
    </div>
  );
};
