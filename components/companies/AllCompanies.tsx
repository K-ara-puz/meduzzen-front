import { ReactNode, useEffect, useState } from "react";
import { GetUsersProps } from "../../interfaces/GetUsersProps";
import { useGetCompaniesQuery } from "../../app/api/companiesApi";
import { CompanyCard } from "./CompanyCard";
import { CustomPaginator } from "../CustomPaginator";
import { CompanyData } from "../../interfaces/CompanyData.interface";

export const AllCompanies = () => {
  const standardLimit = 5
  const [getCompaniesProps, setPropsForGetCompanies] = useState<GetUsersProps>({
    limit: standardLimit,
    page: 1,
  });
  const { data, refetch } = useGetCompaniesQuery({
    limit: getCompaniesProps.limit,
    page: getCompaniesProps.page,
  });
  const [companiesElems, setCompaniesElems] = useState<Array<ReactNode>>([]);

  const setCompanies = (companies: CompanyData[]) => {
    const arrayOfObjects = Object.values(companies);
    const companiesDivs: ReactNode[] = arrayOfObjects.map((el) => (
      <CompanyCard
        key={el["id"]}
        companyData={el}
      ></CompanyCard>
    ));
    setCompaniesElems(companiesDivs);
  };

  const nextPage = async (page: number) => {
    setPropsForGetCompanies({ limit: standardLimit, page: page });
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
