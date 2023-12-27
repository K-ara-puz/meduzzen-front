import { useState } from "react";
import CustomBtn from "../CustomBtn";
import BasicPopup from "../popups/BasicPopup";
import AddCompanyForm from "../forms/AddCompanyForm";
import { useAddCompanyMutation } from "../../app/api/companiesApi";
import { CompaniesMainTabs } from "../../utils/constants";

interface CompaniesActionsPanelProps {
  showUserCompanies: () => void;
  showAllCompanies: () => void;
  showCompaniesWhereIMember: () => void;
  activeTab?: string;
}

export const CompaniesActionsPanel = (props: CompaniesActionsPanelProps) => {
  const [isPopupOpen, setPopupDisplay] = useState<boolean>(false);

  const [addCompany] = useAddCompanyMutation();

  const addMyCompany = async (values) => {
    addCompany({ ...values }).then(() => {
      setPopupDisplay(false);
    });
  };

  const closePopup = () => {
    setPopupDisplay(false)
  };
  return (
    <div>
      <div className="nav flex gap-5 h-10">
        <CustomBtn
          btnState="gray"
          title="Add Company"
          activeBtn={
            props.activeTab === CompaniesMainTabs.addCompany ? true : false
          }
          clickHandler={() => {
            setPopupDisplay(true)
          }}
        />
        <CustomBtn
          btnState="gray"
          title="My Companies"
          activeBtn={
            props.activeTab === CompaniesMainTabs.myCompanies ? true : false
          }
          clickHandler={() => {
            props.showUserCompanies();
          }}
        />
        <CustomBtn
          btnState="gray"
          title="All Companies"
          activeBtn={props.activeTab === CompaniesMainTabs.allCompanies ? true : false}
          clickHandler={() => {
            props.showAllCompanies()
          }}
        />
        <CustomBtn
          btnState="gray"
          title="I member C."
          activeBtn={props.activeTab === CompaniesMainTabs.whereIMember ? true : false}
          clickHandler={() => {
            props.showCompaniesWhereIMember()
          }}
        />
      </div>
      <BasicPopup
        shouldShow={isPopupOpen}
        title="Add Company"
        onRequestClose={() => closePopup()}
      >
        <AddCompanyForm onSubmit={addMyCompany} />
      </BasicPopup>
    </div>
  );
};
