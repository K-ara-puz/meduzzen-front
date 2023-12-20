import { useState } from "react";
import CustomBtn from "../CustomBtn";
import CompanyDataEditForm from "../forms/CompanyDataEditForm";
import {
  useDeleteCompanyMutation,
  useEditCompanyMutation,
  useGetCompanyQuery,
} from "../../app/api/companiesApi";
import BasicPopup from "../popups/BasicPopup";
import { CommonWarningForm } from "../forms/CommonWarningForm";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

interface CompanyState {
  isCompanyEditPanelOpen: boolean;
  isPopupOpen: boolean;
}

interface CompanyProfileProps {
  companyData: {
    role: string;
  };
}

const initialCompanyState = {
  isCompanyEditPanelOpen: false,
  isPopupOpen: false,
};

export const CompanyProfile = (props: CompanyProfileProps) => {
  const { id } = useParams();
  const companyId = id as string;
  const [state, setState] = useState<CompanyState>(initialCompanyState);
  const [editCompany, result] = useEditCompanyMutation();
  const [deleteCompany] = useDeleteCompanyMutation();
  const { data: company } = useGetCompanyQuery(companyId);
  const router = useRouter();

  const editCompanyData = (values) => {
    editCompany({
      id: company.detail.id,
      name: values.name,
      description: values.description
        ? values.description
        : company.detail.description,
    })
      .unwrap()
      .then(() => {
        setState({ ...state, isCompanyEditPanelOpen: false });
      })
      .catch((error) => {
        toast(error.data.message, { autoClose: 2000, type: "error" });
      });
  };

  const deleteMyCompany = () => {
    deleteCompany(company.detail.id);
    router.push("/companies");
  };

  const closePopup = () => {
    setState({ ...state, isPopupOpen: false });
  };

  return (
    <React.Fragment>
      {company && (
        <div>
          <div className="company w-full flex gap-5">
            <div className="company-card">
              {company.detail.avatar ? (
                <div className="w-full h-36 relative">
                  <img
                    src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}/${company.detail.avatar}`}
                    className="absolute object-cover h-full w-full"
                  />
                </div>
              ) : (
                <div className="w-36 h-36 relative after:content-['C'] after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:text-4xl after:text-gray-00 after:-translate-y-1/2 after:absolute bg-blue-300"></div>
              )}
            </div>
            <div>
              <ul>
                <li>
                  <span className="font-bold">CompanyId: </span>
                  {company.detail.id}
                </li>
                <li>
                  <span className="font-bold">Name: </span>
                  {company.detail.name}
                </li>
                <li>
                  <span className="font-bold">Description: </span>
                  {company.detail.description}
                </li>
                {props.companyData.role != "undefined" ? (
                  <li>
                    <span className="font-bold">Role: </span>
                    {props.companyData.role}
                  </li>
                ) : null}
              </ul>
              {props.companyData.role != "undefined" && (
                <div className="h-8 flex gap-3 mt-3">
                  <CustomBtn
                    btnState="error"
                    title="Delete Company"
                    clickHandler={() =>
                      setState({ ...state, isPopupOpen: true })
                    }
                  />
                  <CustomBtn
                    btnState="success"
                    title="Edit Company"
                    clickHandler={() =>
                      setState({ ...state, isCompanyEditPanelOpen: true })
                    }
                  />
                </div>
              )}
            </div>
          </div>
          {state.isCompanyEditPanelOpen && (
            <div className="w-full max-w-[400px] mt-5">
              <CompanyDataEditForm onSubmit={editCompanyData} />
            </div>
          )}

          <BasicPopup
            shouldShow={state.isPopupOpen}
            title=""
            onRequestClose={() => closePopup()}
          >
            <CommonWarningForm
              apply={deleteMyCompany}
              cancel={closePopup}
              title={`Are you sure you want to delete company ${company.detail.id}?`}
            />
          </BasicPopup>
        </div>
      )}
    </React.Fragment>
  );
};
