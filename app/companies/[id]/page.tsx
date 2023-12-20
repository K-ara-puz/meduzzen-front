"use client";
import isAuth from "../../../utils/checkUserAuthentication";
import { CompanyProfile } from "../../../components/companies/CompanyProfile";

interface CompanyPageProps {
  searchParams: {
    role?: string
  }
}

function Home({ searchParams }: CompanyPageProps) {
  return (
    <div className="p-5">
      <CompanyProfile companyData={{role: searchParams.role}} />
    </div>
  );
}
export default isAuth(Home);
