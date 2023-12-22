"use client";
import isAuth from "../../utils/checkUserAuthentication";
import { useState } from "react";
import { CompaniesActionsPanel } from "../../components/companies/CompaniesActionsPanel";
import { UserCompanies } from "../../components/companies/UserCompanies";
import { AllCompanies } from "../../components/companies/AllCompanies";
import { CompaniesWhereIMember } from "../../components/companies/CompaniesWhereIMember";
import { CompaniesMainTabs } from "../../utils/constants";

function Home() {
  const [mainTabsState, setTabsState] = useState<string>(CompaniesMainTabs.allCompanies);

  const showUserCompanies = async () => {
    setTabsState(CompaniesMainTabs.myCompanies)
  };

  const showAllCompanies = async () => {
    setTabsState(CompaniesMainTabs.allCompanies)
  };

  const showCompaniesWhereIMember = async () => {
    setTabsState(CompaniesMainTabs.whereIMember)
  };

  return (
    <div className="p-5 w-full">
      <div className="w-[98%] my-4 flex pb-2 border-b-2 border-blue-900 border-opacity-50">
        <CompaniesActionsPanel
          showUserCompanies={showUserCompanies}
          showAllCompanies={showAllCompanies}
          activeTab={mainTabsState}
          showCompaniesWhereIMember={showCompaniesWhereIMember}
        />
      </div>
      <MakeContent mainTabsState={mainTabsState} />
    </div>
  );
}
export default isAuth(Home);

interface MakeContentProps {
  mainTabsState: string
}

const MakeContent = (props: MakeContentProps) => {
  switch (props.mainTabsState) {
    case `${CompaniesMainTabs.myCompanies}`:
      return <UserCompanies/>;
    case `${CompaniesMainTabs.allCompanies}`:
      return <AllCompanies />;
    case `${CompaniesMainTabs.whereIMember}`:
      return <CompaniesWhereIMember />;
  }
};

