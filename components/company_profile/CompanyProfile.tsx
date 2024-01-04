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
import {
  CompanyMemberRoles,
  CompanyProfileMainTabs,
} from "../../utils/constants";
import { useSendInviteToCompanyMutation } from "../../app/api/invitesApi";
import { CompanyActionsPanel } from "./CompanyActionsPanel";
import { CompanyMembers } from "./CompanyMembers";
import { CompanyInvites } from "../invites/CompanyInvites";
import { CompanyRequests } from "../invites/CompanyRequests";
import {
  useGetMyCompanyMemberQuery,
  useLeaveCompanyMutation,
} from "../../app/api/companyApi";
import { CompanyAdmins } from "./CompanyAdmins";
import { CompanyQuizzes } from "./quizzes/CompanyQuizzes";
import { CompanyData } from "../../interfaces/CompanyData.interface";
import { FormSubmitHandler } from "redux-form";

export const CompanyProfile = () => {
  const { id } = useParams();
  const companyId = id as string;
  const { data: company } = useGetCompanyQuery(companyId);
  const { data: companyMember, refetch } =
    useGetMyCompanyMemberQuery(companyId);

  return (
    <React.Fragment>
      {company && companyMember && (
        <div>
          {companyMember.detail?.role === CompanyMemberRoles.owner ? (
            <OwnerContent
              company={company.detail}
              role={CompanyMemberRoles.owner}
            />
          ) : companyMember.detail?.role === CompanyMemberRoles.admin ? (
            <AdminContent
              company={company.detail}
              role={CompanyMemberRoles.admin}
            />
          ) : companyMember.detail?.role === CompanyMemberRoles.simpleUser ? (
            <SimpleUserContent
              company={company.detail}
              role={CompanyMemberRoles.simpleUser}
            />
          ) : (
            <NotAMemberContent company={company.detail} />
          )}
        </div>
      )}
    </React.Fragment>
  );
};

interface OwnerContentProps {
  company: Partial<CompanyData>,
  role: string
}

const OwnerContent = ({ company, role }: OwnerContentProps) => {
  interface OwnerContentState {
    isCompanyEditPanelOpen: boolean;
    isDeleteCompanyPopupOpen: boolean;
    mainTabsState: string;
  }

  const initialOwnerContentState = {
    isCompanyEditPanelOpen: false,
    isDeleteCompanyPopupOpen: false,
    mainTabsState: CompanyProfileMainTabs.members,
  };
  const [state, setState] = useState<OwnerContentState>(
    initialOwnerContentState
  );
  const [editCompany, result] = useEditCompanyMutation();
  const [deleteCompany] = useDeleteCompanyMutation();
  const router = useRouter();

  const editCompanyData = (values) => {
    editCompany({
      id: company.id,
      name: values.name,
      description: values.description
        ? values.description
        : company.description,
    }).then(() => {
      setState({ ...state, isCompanyEditPanelOpen: false });
    });
  };
  const deleteMyCompany = () => {
    deleteCompany(company.id);
    router.push("/companies");
  };

  const closePopup = () => {
    setState({ ...state, isDeleteCompanyPopupOpen: false });
  };
  return (
    <React.Fragment>
      {company && (
        <div>
          <div className="company w-full flex gap-5">
            <div className="company-card">
              {company.avatar ? (
                <div className="w-full h-36 relative">
                  <img
                    src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}/${company.avatar}`}
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
                  {company.id}
                </li>
                <li>
                  <span className="font-bold">Name: </span>
                  {company.name}
                </li>
                <li>
                  <span className="font-bold">Description: </span>
                  {company.description}
                </li>

                <li>
                  <span className="font-bold">Role: </span>
                  {role}
                </li>
              </ul>
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
            </div>
          </div>
          {state.isCompanyEditPanelOpen && (
            <div className="w-full max-w-[400px] mt-5">
              <CompanyDataEditForm onSubmit={editCompanyData} />
            </div>
          )}
          <div className="w-full">
            <div className="my-5 w-[50%]">
              <CompanyActionsPanel
                showMembers={() =>
                  setState({
                    ...state,
                    mainTabsState: CompanyProfileMainTabs.members,
                  })
                }
                showInvites={() =>
                  setState({
                    ...state,
                    mainTabsState: CompanyProfileMainTabs.invites,
                  })
                }
                showRequests={() =>
                  setState({
                    ...state,
                    mainTabsState: CompanyProfileMainTabs.requests,
                  })
                }
                showAdmins={() =>
                  setState({
                    ...state,
                    mainTabsState: CompanyProfileMainTabs.admins,
                  })
                }
                showQuizzes={() =>
                  setState({
                    ...state,
                    mainTabsState: CompanyProfileMainTabs.quizzes,
                  })
                }
                activeTab={state.mainTabsState}
              />
            </div>
            <div className="w-full">
              <MakeContent
                mainTabsState={state.mainTabsState}
                companyId={company.id}
              ></MakeContent>
            </div>
          </div>

          <BasicPopup
            shouldShow={state.isDeleteCompanyPopupOpen}
            title=""
            onRequestClose={() => closePopup()}
          >
            <CommonWarningForm
              apply={deleteMyCompany}
              cancel={closePopup}
              title={`Are you sure you want to delete company ${company.id}?`}
            />
          </BasicPopup>
        </div>
      )}
    </React.Fragment>
  );
};

interface AdminContentProps {
  company: Partial<CompanyData>,
  role: string
}
const AdminContent = ({ company, role }: AdminContentProps) => {
  interface AdminContentState {
    mainTabsState: string;
  }
  const initialAdminContentState = {
    mainTabsState: CompanyProfileMainTabs.quizzes,
  };
  const [state, setState] = useState<AdminContentState>(
    initialAdminContentState
  );
  return (
    <React.Fragment>
      {company && (
        <div>
          <div className="company w-full flex gap-5">
            <div className="company-card">
              {company.avatar ? (
                <div className="w-full h-36 relative">
                  <img
                    src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}/${company.avatar}`}
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
                  {company.id}
                </li>
                <li>
                  <span className="font-bold">Name: </span>
                  {company.name}
                </li>
                <li>
                  <span className="font-bold">Description: </span>
                  {company.description}
                </li>

                <li>
                  <span className="font-bold">Role: </span>
                  {role}
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full">
            <div className="my-5 w-[50%]">
              <CompanyActionsPanel
                showMembers={() =>
                  setState({
                    ...state,
                    mainTabsState: CompanyProfileMainTabs.members,
                  })
                }
                showInvites={() =>
                  setState({
                    ...state,
                    mainTabsState: CompanyProfileMainTabs.invites,
                  })
                }
                showRequests={() =>
                  setState({
                    ...state,
                    mainTabsState: CompanyProfileMainTabs.requests,
                  })
                }
                showQuizzes={() =>
                  setState({
                    ...state,
                    mainTabsState: CompanyProfileMainTabs.quizzes,
                  })
                }
                activeTab={state.mainTabsState}
              />
            </div>
            <div className="w-full">
              <MakeContent
                mainTabsState={state.mainTabsState}
                companyId={company.id}
              ></MakeContent>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

interface SimpleUserContentProps {
  company: Partial<CompanyData>,
  role: string
}
const SimpleUserContent = ({ company, role }: SimpleUserContentProps) => {
  interface SimpleUserContentState {
    mainTabsState: string;
  }
  const initialSimpleUserContentState = {
    mainTabsState: CompanyProfileMainTabs.quizzes,
  };
  const [state, setState] = useState<SimpleUserContentState>(
    initialSimpleUserContentState
  );
  const { data: companyMember, refetch } = useGetMyCompanyMemberQuery(
    company.id
  );
  const [leave] = useLeaveCompanyMutation();

  const leaveCompany = () => {
    leave(company.id).then(() => refetch());
  };
  return (
    <React.Fragment>
      {company && (
        <div>
          <div className="company w-full flex gap-5">
            <div className="company-card">
              {company.avatar ? (
                <div className="w-full h-36 relative">
                  <img
                    src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}/${company.avatar}`}
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
                  {company.id}
                </li>
                <li>
                  <span className="font-bold">Name: </span>
                  {company.name}
                </li>
                <li>
                  <span className="font-bold">Description: </span>
                  {company.description}
                </li>
                <li>
                  <span className="font-bold">Role: </span>
                  {role}
                </li>
              </ul>
              <div className="h-8 flex gap-3 mt-3">
                <CustomBtn
                  btnState="error"
                  title="Leave company"
                  clickHandler={leaveCompany}
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="my-5 w-36">
              <CompanyActionsPanel
                showQuizzes={() =>
                  setState({
                    ...state,
                    mainTabsState: CompanyProfileMainTabs.quizzes,
                  })
                }
                activeTab={state.mainTabsState}
              />
            </div>
            <div className="w-full">
              <MakeContent
                mainTabsState={state.mainTabsState}
                companyId={company.id}
              ></MakeContent>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

interface NotAMemberContentProps {
  company: Partial<CompanyData>
}
const NotAMemberContent = ({ company }: NotAMemberContentProps) => {
  const [sendInviteToCompany] = useSendInviteToCompanyMutation();

  const sendInvite = () => {
    sendInviteToCompany({ companyId: company.id });
  };
  return (
    <React.Fragment>
      {company && (
        <div>
          <div className="company w-full flex gap-5">
            <div className="company-card">
              {company.avatar ? (
                <div className="w-full h-36 relative">
                  <img
                    src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}/${company.avatar}`}
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
                  {company.id}
                </li>
                <li>
                  <span className="font-bold">Name: </span>
                  {company.name}
                </li>
                <li>
                  <span className="font-bold">Description: </span>
                  {company.description}
                </li>
              </ul>
              <div className="h-8 flex gap-3 mt-3">
                <CustomBtn
                  btnState="success"
                  title="Send invite to company"
                  clickHandler={sendInvite}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

interface MakeContentProps {
  mainTabsState: string;
  companyId: string;
}

const MakeContent = ({ mainTabsState, companyId }: MakeContentProps) => {
  switch (mainTabsState) {
    case CompanyProfileMainTabs.members:
      return <CompanyMembers companyId={companyId} />;
    case CompanyProfileMainTabs.invites:
      return <CompanyInvites companyId={companyId} />;
    case CompanyProfileMainTabs.requests:
      return <CompanyRequests companyId={companyId} />;
    case CompanyProfileMainTabs.admins:
      return <CompanyAdmins companyId={companyId} />;
    case CompanyProfileMainTabs.quizzes:
      return <CompanyQuizzes companyId={companyId} />;
  }
};
