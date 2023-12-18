'use client'
import { useRouter } from "next/navigation";
import CustomBtn from "../CustomBtn";

export const CompanyCard = ({ companyData }) => {
  const router = useRouter();

  const goToCompanyProfile = () => {
    router.push(
      `/companies/${companyData.id}?companyData=${JSON.stringify(companyData)}`
    )
  };

  return (
    <div className="bg-slate-300 max-w-xs flex flex-col gap-5 text-center">
      <div className="flex-auto">
        {companyData.avatar ? (
          <div className="w-full h-36 relative">
            <img
              src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}/${companyData.avatar}`}
              className="absolute object-cover h-full w-full"
              alt="User background"
            />
          </div>
        ) : (
          <div className="w-full h-36 relative after:content-['C'] after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:text-4xl after:text-gray-00 after:-translate-y-1/2 after:absolute bg-blue-300"></div>
        )}
        <div className="break-all whitespace-pre-line p-2 text-left">
          <div className="mb-2">
            <span className="font-bold">Name:</span> {companyData.name}
          </div>
          <div className="mb-1">
            <span className="font-bold">Desc:</span> {companyData.description}
          </div>
        </div>
      </div>
      <div className="h-8">
        <CustomBtn
          title="Go to profile"
          btnState="success"
          clickHandler={goToCompanyProfile}
        />
      </div>
    </div>
  );
};
