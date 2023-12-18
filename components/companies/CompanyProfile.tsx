import { ReactNode, useEffect, useState } from "react";
import CustomBtn from "../CustomBtn";
import CompanyDataEditForm from "../forms/CompanyDataEditForm";
import {
  useDeleteCompanyMutation,
  useEditCompanyMutation,
  useGetCompanyQuery,
} from "../../app/api/companiesApi";
import { CompanyData } from "../../interfaces/CompanyData.interface";
import BasicPopup from "../popups/BasicPopup";
import { CommonWarningForm } from "../forms/CommonWarningForm";
import { useRouter } from "next/navigation";

interface CompanyState {
  isCompanyEditPanelOpen: boolean;
  isPopupOpen: boolean;
  company: Partial<CompanyData>;
  companyInfo: { title: string; value: string }[];
  userCompanyInfo: { title: string; value: string }[];
}

const initialCompanyState = {
  isCompanyEditPanelOpen: false,
  isPopupOpen: false,
  company: null,
  companyInfo: null,
  userCompanyInfo: null,
};

export const CompanyProfile = ({ companyData }) => {
  const [state, setState] = useState<CompanyState>(initialCompanyState);
  const [editCompany, result] = useEditCompanyMutation();
  const [deleteCompany] = useDeleteCompanyMutation();
  const { data } = useGetCompanyQuery(companyData.id);
  const router = useRouter();

  useEffect(() => {
    if (data) {
      setState({
        ...state,
        company: { ...data.detail, role: companyData.role },
        companyInfo: [
          { title: "CompanyId", value: data.detail.id },
          { title: "Name", value: data.detail.name },
          { title: "Description", value: data.detail.description },
        ],
        userCompanyInfo: [
          { title: "CompanyId", value: data.detail.id },
          { title: "Name", value: data.detail.name },
          { title: "Description", value: data.detail.description },
          { title: "Role", value: companyData.role },
        ],
      });
    }
  }, [data]);
  const editCompanyData = (values) => {
    setState({ ...state, isCompanyEditPanelOpen: false });
    editCompany({
      id: companyData.id,
      name: values.name,
      description: values.description
        ? values.description
        : state.company.description,
    });
  };

  const deleteMyCompany = () => {
    deleteCompany(state.company.id);
    router.push('/companies')
  };

  const closePopup = () => {
    setState({ ...state, isPopupOpen: false });
  };

  if (!state.company) return null;

  if (state.company.role && state.company.role === "owner") {
    return (
      <div className="company flex flex-col gap-5">
        <div className="w-full flex gap-5">
          <div className="company-card">
            {state.company.avatar ? (
              <div className="w-full h-full relative">
                <img
                  src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}/${state.company.avatar}`}
                  className="absolute object-cover h-full w-full"
                />
              </div>
            ) : (
              <div className="w-40 h-full relative after:content-['C'] after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:text-4xl after:text-gray-00 after:-translate-y-1/2 after:absolute bg-blue-300"></div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <CompanyInfoUl elements={state.userCompanyInfo} />
            <div className="h-8 flex gap-3">
              <CustomBtn
                btnState="error"
                title="Delete Company"
                clickHandler={() => setState({ ...state, isPopupOpen: true })}
              />
              <CustomBtn
                btnState="success"
                title="Edit Company"
                clickHandler={() =>
                  setState({ ...state, isCompanyEditPanelOpen: true })
                }
              />
            </div>
          </div>
        </div>

        {state.isCompanyEditPanelOpen && (
          <div className="w-full max-w-[400px]">
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
            title={`Are you sure you want to delete company ${state.company.id}?`}
          />
        </BasicPopup>
      </div>
    );
  }

  return (
    <div className="company w-full flex gap-5">
      <div className="company-card">
        {companyData.avatar ? (
          <div className="w-full h-36 relative">
            <img
              src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}/${companyData.avatar}`}
              className="absolute object-cover h-full w-full"
            />
          </div>
        ) : (
          <div className="w-36 h-36 relative after:content-['C'] after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:text-4xl after:text-gray-00 after:-translate-y-1/2 after:absolute bg-blue-300"></div>
        )}
      </div>
      <CompanyInfoUl elements={state.companyInfo} />
    </div>
  );
};

const CompanyInfoUl = ({ elements }) => {
  const elems: ReactNode[] = elements.map((el) => (
    <li key={el.title}>
      <span className="font-bold">{el.title}: </span>
      {el.value}
    </li>
  ));
  return <ul className="flex flex-col gap-2">{elems}</ul>;
};
