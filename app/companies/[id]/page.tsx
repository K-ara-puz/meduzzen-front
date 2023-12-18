"use client";
import isAuth from "../../../utils/checkUserAuthentication";
import { CompanyProfile } from "../../../components/companies/CompanyProfile";
function Home({ searchParams }) {
  return (
    <div className="p-5">
      <CompanyProfile companyData={JSON.parse(searchParams.companyData)} />
    </div>
  );
}
export default isAuth(Home);
