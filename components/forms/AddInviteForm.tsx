"use client";
import CustomBtn from "../CustomBtn";
import { MenuItem, Select } from "@mui/material";
import { useGetUserCompaniesQuery } from "../../app/api/companiesApi";
import { useState } from "react";
import { CustomPaginator } from "../CustomPaginator";

interface AddInviteFormProps {
  handleSubmit: (companyId: string) => void;
}

export const AddInviteForm = (props: AddInviteFormProps) => {
  const standardLimit = 3;
  const [getCompaniesProps, setPropsForGetCompanies] = useState({
    limit: standardLimit,
    page: 1,
    inviteCompany: null,
  });
  const { data: companies } = useGetUserCompaniesQuery({
    limit: getCompaniesProps.limit,
    page: getCompaniesProps.page,
  });

  const nextPage = async (page: number) => {
    setPropsForGetCompanies({
      ...getCompaniesProps,
      limit: standardLimit,
      page: page,
    });
  };

  const setCompany = (companyId: string) => {
    setPropsForGetCompanies({ ...getCompaniesProps, inviteCompany: companyId });
  };

  return (
    <form className="flex flex-col items-center">
      {companies &&
        companies.detail.items.map((el) => <span key={el.id}>{el.name}</span>)}
      {companies && (
        <div className="w-full mb-10">
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            className="w-full text-blue-600 h-10"
            MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
            defaultValue={"null"}
          >
            {companies.detail.items.map((el) => (
              <MenuItem
                onClick={() => setCompany(el["company"].id)}
                key={el.id}
                value={el["company"].name}
              >
                {el["company"].name}
              </MenuItem>
            ))}
            <div className="my-5 flex items-center justify-center">
              <CustomPaginator
                limit={standardLimit}
                totalItems={companies.detail["totalItemsCount"]}
                onClick={nextPage}
              />
            </div>
          </Select>
        </div>
      )}

      <div className="w-full flex gap-5">
        <CustomBtn
          title="Submit"
          type="submit"
          btnState="success"
          clickHandler={(e) => {
            e.preventDefault(),
              props.handleSubmit(getCompaniesProps.inviteCompany);
          }}
        />
      </div>
    </form>
  );
};
