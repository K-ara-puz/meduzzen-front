"use client";
import { ReactNode, useEffect, useState } from "react";
import { GetUsersProps } from "../../interfaces/GetUsersProps";
import { useGetUserCompaniesQuery } from "../../app/api/companiesApi";
import { CompanyCard } from "./CompanyCard";
import { CustomPaginator } from "../CustomPaginator";
import { CompanyCardProps } from "../../interfaces/CompanyCardProps.interface";

export const UserCompanies = () => {
  const standardLimit = 2;
  const [getCompaniesProps, setPropsForGetCompanies] = useState<GetUsersProps>({
    limit: standardLimit,
    page: 1,
  });
  const { data, refetch } = useGetUserCompaniesQuery({
    limit: getCompaniesProps.limit,
    page: getCompaniesProps.page,
  });
  const [companiesElems, setCompaniesElems] = useState<Array<ReactNode>>([]);

  const setCompanies = (companies) => {
    const arrayOfObjects = Object.values(companies);
    const companiesDivs: ReactNode[] = arrayOfObjects.map(
      (el: CompanyCardProps) => {
        const { id, role, company } = el;
        return (
          <CompanyCard
            key={el["id"]}
            companyData={{ id, role, ...company }}
          ></CompanyCard>
        );
      }
    );
    setCompaniesElems(companiesDivs);
  };

  const nextPage = async (page: number) => {
    setPropsForGetCompanies({ limit: standardLimit, page: page });
    refetch();
  };
  useEffect(() => {
    if (data) {
      setCompanies(data.detail["items"]);
    }
  }, [data]);

  return (
    <div>
      <div className="grid grid-cols-3 mt-6 md:grid-cols-5 mx-auto max-w-[1200px] gap-10">
        {companiesElems}
      </div>
      <div className="my-5 flex items-center justify-center">
        {data && (
          <CustomPaginator
            limit={getCompaniesProps.limit}
            totalItems={data.detail["totalItemsCount"]}
            onClick={nextPage}
          />
        )}
      </div>
    </div>
  );
};
