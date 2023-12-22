"use client";
import { useState } from "react";
import { GetUsersProps } from "../../interfaces/GetUsersProps";
import { useGetUserCompaniesQuery } from "../../app/api/companiesApi";
import { CompanyCard } from "./CompanyCard";
import { CustomPaginator } from "../CustomPaginator";

export const UserCompanies = () => {
  const standardLimit = 2;
  const [getCompaniesProps, setPropsForGetCompanies] = useState<GetUsersProps>({
    limit: standardLimit,
    page: 1,
  });
  const { data: companies } = useGetUserCompaniesQuery({
    limit: getCompaniesProps.limit,
    page: getCompaniesProps.page,
  });

  const nextPage = async (page: number) => {
    setPropsForGetCompanies({ limit: standardLimit, page: page });
  };

  return (
    <div>
      {companies && (
        <div>
          <div className="grid grid-cols-3 mt-6 md:grid-cols-5 mx-auto max-w-[1200px] gap-10">
            {companies.detail.items.map((el) => (
              <CompanyCard key={el.id} companyData={{role: el.role, ...el['company']}}></CompanyCard>
            ))}
          </div>
          <div className="my-5 flex items-center justify-center">
            <CustomPaginator
              limit={getCompaniesProps.limit}
              totalItems={companies.detail["totalItemsCount"]}
              onClick={nextPage}
            />
          </div>
        </div>
      )}
      {companies?.detail.items.length < 1 && <div>You do not have companies yet!</div>}
    </div>
  );
};
