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
import { CompanyMemberRoles } from "../../utils/constants";
import { useSendInviteToCompanyMutation } from "../../app/api/invitesApi";
import { CompanyActionsPanel } from "./CompanyActionsPanel";
import { CompanyMembers } from "./CompanyMembers";
import { CompanyInvites } from "../invites/CompanyInvites";
import { CompanyRequests } from "../invites/CompanyRequests";
import { useGetMyCompanyMemberQuery } from "../../app/api/companyApi";

enum MainTabsState {
  members = "members",
  invites = "invites",
  requests = "requests",
}

interface CompanyState {
  isCompanyEditPanelOpen: boolean;
  isDeleteCompanyPopupOpen: boolean;
  mainTabsState: string;
}

const initialCompanyState = {
  isCompanyEditPanelOpen: false,
  isDeleteCompanyPopupOpen: false,
  mainTabsState: MainTabsState.members,
};

export const CompanyProfile = () => {
  const { id } = useParams();
  const companyId = id as string;
  const [state, setState] = useState<CompanyState>(initialCompanyState);
  const [editCompany, result] = useEditCompanyMutation();
  const [deleteCompany] = useDeleteCompanyMutation();
  const { data: company } = useGetCompanyQuery(companyId);
  const { data: companyMember } = useGetMyCompanyMemberQuery(companyId);
  const [sendInviteToCompany] = useSendInviteToCompanyMutation();
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
    setState({ ...state, isDeleteCompanyPopupOpen: false });
  };

  const sendInvite = () => {
    sendInviteToCompany({ companyId: company.detail.id })
      .unwrap()
      .then(() => {
        toast("your request was send", { autoClose: 2000, type: "success" });
      })
      .catch((error) => {
        toast(error.data.message, { autoClose: 2000, type: "error" });
      });
  };

  const makeContent = () => {
    switch (state.mainTabsState) {
      case MainTabsState.members:
        return <CompanyMembers companyId={companyId} />;
      case MainTabsState.invites:
        return <CompanyInvites companyId={companyId} />;
      case MainTabsState.requests:
        return <CompanyRequests companyId={companyId} />;
    }
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
            <div className="flex flex-col">
              <ul className="flex-auto">
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
                {companyMember?.detail &&
                companyMember.detail.role === CompanyMemberRoles.owner ? (
                  <li>
                    <span className="font-bold">Role: </span>
                    {companyMember?.detail?.role}
                  </li>
                ) : null}
              </ul>
              {companyMember?.detail &&
              companyMember.detail.role === CompanyMemberRoles.owner ? (
                <div className="h-8 flex gap-3 mt-3">
                  <CustomBtn
                    btnState="error"
                    title="Delete Company"
                    clickHandler={() =>
                      setState({ ...state, isDeleteCompanyPopupOpen: true })
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
              ) : (
                <div className="w-56 mt-5">
                  <CustomBtn
                    btnState="success"
                    title="Send invite to company"
                    clickHandler={() => sendInvite()}
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
          {companyMember?.detail &&
          companyMember.detail.role === CompanyMemberRoles.owner ? (
            <div className="w-full">
              <div className="my-5 w-[50%]">
                <CompanyActionsPanel
                  showMembers={() =>
                    setState({ ...state, mainTabsState: MainTabsState.members })
                  }
                  showInvites={() =>
                    setState({ ...state, mainTabsState: MainTabsState.invites })
                  }
                  showRequests={() =>
                    setState({
                      ...state,
                      mainTabsState: MainTabsState.requests,
                    })
                  }
                />
              </div>
              <div className="w-full">{makeContent()}</div>
            </div>
          ) : null}

          <BasicPopup
            shouldShow={state.isDeleteCompanyPopupOpen}
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
