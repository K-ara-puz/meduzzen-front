"use client";
import { useRouter } from "next/navigation";
import CustomBtn from "../CustomBtn";
import { CompanyData } from "../../interfaces/CompanyData.interface";
import { CompanyMemberRoles } from "../../utils/constants";
import { useGetMyCompanyMemberQuery } from "../../app/api/companyApi";
import BasicPopup from "../popups/BasicPopup";
import { CommonWarningForm } from "../forms/CommonWarningForm";
import { useState } from "react";

interface CompanyCard {
  companyData: Partial<CompanyData>;
  whereIMember?: boolean;
  leaveCompany?: (companyId: string) => void;
  role?: string;
}

export const CompanyCard = (props: CompanyCard) => {
  const router = useRouter();
  const { data: companyMember } = useGetMyCompanyMemberQuery(
    props.companyData.id
  );
  const [isLeaveCompanyPopupOpen, setIsLeaveCompanyPopupOpen] =
    useState<boolean>(false);

  const goToCompanyProfile = () => {
    router.push(`/companies/${props.companyData.id}`);
  };

  return (
    <div className="bg-slate-300 min-w-[150px] max-w-xs flex flex-col gap-5 text-center">
      <div className="flex-auto">
        {props.companyData.avatar ? (
          <div className="w-full h-36 relative">
            <img
              src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}/${props.companyData.avatar}`}
              className="absolute object-cover h-full w-full"
              alt="User background"
            />
          </div>
        ) : (
          <div className="w-full h-36 relative after:content-['C'] after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:text-4xl after:text-gray-00 after:-translate-y-1/2 after:absolute bg-blue-300"></div>
        )}
        <div className="break-all whitespace-pre-line p-2 text-left">
          <div className="mb-2">
            <span className="font-bold">Name:</span> {props.companyData.name}
          </div>
          <div className="mb-1">
            <span className="font-bold">Desc:</span>{" "}
            {props.companyData.description}
          </div>
          {props.role && (
            <div className="mb-1">
              <span className="font-bold">Role:</span> {props.role}
            </div>
          )}
        </div>
      </div>
      <div className="h-8">
        <div>
          {companyMember?.detail &&
          companyMember.detail.role === CompanyMemberRoles.owner ? (
            <CustomBtn
              title="My company"
              btnState="gray"
              clickHandler={goToCompanyProfile}
            />
          ) : (
            <CustomBtn
              title="Go to profile"
              btnState="success"
              clickHandler={goToCompanyProfile}
            />
          )}
          {companyMember?.detail && props.whereIMember && (
            <CustomBtn
              title="Leave company"
              btnState="error"
              clickHandler={() => setIsLeaveCompanyPopupOpen(true)}
            />
          )}
        </div>
      </div>
      <BasicPopup
        shouldShow={isLeaveCompanyPopupOpen}
        title=""
        onRequestClose={() => setIsLeaveCompanyPopupOpen(false)}
      >
        <CommonWarningForm
          title="Are you sure you want leave company?"
          apply={() => props.leaveCompany(props.companyData.id)}
          cancel={() => setIsLeaveCompanyPopupOpen(false)}
        />
      </BasicPopup>
    </div>
  );
};
