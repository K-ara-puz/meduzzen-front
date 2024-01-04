import { useState } from "react";
import { GetUsersProps } from "../../interfaces/GetUsersProps";
import {
  useGetUserCompaniesWhereIMemberQuery,
} from "../../app/api/companiesApi";
import { CompanyCard } from "./CompanyCard";
import { CustomPaginator } from "../CustomPaginator";
import { useLeaveCompanyMutation } from "../../app/api/companyApi";

export const CompaniesWhereIMember = () => {
  const standardLimit = 5;
  const [getCompaniesProps, setPropsForGetCompanies] = useState<GetUsersProps>({
    limit: standardLimit,
    page: 1,
  });
  const { data: companies, refetch } = useGetUserCompaniesWhereIMemberQuery({
    limit: getCompaniesProps.limit,
    page: getCompaniesProps.page,
  });
  const [leave] = useLeaveCompanyMutation();
  const nextPage = async (page: number) => {
    setPropsForGetCompanies({ limit: standardLimit, page: page });
  };

  const leaveCompany = (companyId: string) => {
    leave(companyId).then(() => refetch());
  };
  return (
    <div>
      {companies && (
        <div>
          <div className="grid grid-cols-3 mt-6 md:grid-cols-5 mx-auto max-w-[1200px] gap-10">
            {companies.detail.items.map((el) => (
              <CompanyCard
                key={el.id}
                role={el.role}
                companyData={el["company"]}
                whereIMember={true}
                leaveCompany={leaveCompany}
              ></CompanyCard>
            ))}
          </div>
          <div className="my-10 flex items-center justify-center">
            <CustomPaginator
              limit={getCompaniesProps.limit}
              totalItems={companies.detail["totalItemsCount"]}
              onClick={nextPage}
            />
          </div>
        </div>
      )}
      {companies?.detail.items.length < 1 && (
        <div>You do not have companies yet!</div>
      )}
    </div>
  );
};
