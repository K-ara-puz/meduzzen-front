"use client";
import isAuth from "../../../utils/checkUserAuthentication";
import { CompanyProfile } from "../../../components/company_profile/CompanyProfile";

function Home() {
  return (
    <div className="p-5">
      <CompanyProfile />
    </div>
  );
}
export default isAuth(Home);
