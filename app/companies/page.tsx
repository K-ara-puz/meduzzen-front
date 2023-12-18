"use client";
import isAuth from "../../utils/checkUserAuthentication";
import { useState } from "react";
import { CompaniesActionsPanel } from "../../components/companies/CompaniesActionsPanel";
import { UserCompanies } from "../../components/companies/UserCompanies";
import { AllCompanies } from "../../components/companies/AllCompanies";

function Home() {
  const [isAllCompanies, setCompaniesState] = useState<boolean>(true);
  const showUserCompanies = async () => {
    setCompaniesState(false);
  };

  const showAllCompanies = async () => {
    setCompaniesState(true);
  };
  return (
    <div className="p-5 w-full">
      <div className="w-[98%] my-4 flex pb-2 border-b-2 border-blue-900 border-opacity-50">
        <CompaniesActionsPanel
          showUserCompanies={showUserCompanies}
          showAllCompanies={showAllCompanies}
        />
      </div>
      {isAllCompanies ? <AllCompanies /> : <UserCompanies />}
    </div>
  );
}
export default isAuth(Home);
