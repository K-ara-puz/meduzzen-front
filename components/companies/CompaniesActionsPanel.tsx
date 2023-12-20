import { useState } from "react";
import CustomBtn from "../CustomBtn"
import BasicPopup from "../popups/BasicPopup";
import AddCompanyForm from "../forms/AddCompanyForm";
import { useAddCompanyMutation } from "../../app/api/companiesApi";
import { toast } from "react-toastify";

interface CompaniesActionsPanelProps {
  showUserCompanies: () => void,
  showAllCompanies: () => void
}

export const CompaniesActionsPanel = (props: CompaniesActionsPanelProps) => {
  const [isPopupOpen, setPopupDisplay] = useState<boolean>(false);
  const [addCompany] = useAddCompanyMutation();

  const addMyCompany = async (values) => {
    addCompany({ ...values })
      .unwrap()
      .then(() => {
        setPopupDisplay(false);
      })
      .catch((error) => {
        toast(error.data.message, { autoClose: 2000, type: "error" });
      });
  };

  const closePopup = () => setPopupDisplay(false)
  return (
    <div>
      <div className="nav flex gap-5 h-10">
        <CustomBtn
          btnState="success"
          title="Add Company"
          clickHandler={() => setPopupDisplay(true)}
        />
        <CustomBtn
          btnState="gray"
          title="My Companies"
          clickHandler={() => props.showUserCompanies()}
        />
        <CustomBtn
          btnState="gray"
          title="All Companies"
          clickHandler={() => props.showAllCompanies()}
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
