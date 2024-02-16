import CustomBtn from "../CustomBtn";
import { MenuItem, Select } from "@mui/material";
import { useGetAllCompanyMembersQuery } from "@/app/api/companyApi";
import { useState } from "react";
import {
  useLazyGetCompanyQuizzesResultsDataExportCSVQuery,
  useLazyGetCompanyQuizzesResultsDataExportJSONQuery,
  useLazyGetOneCompanyMemberResultsDataExportCSVQuery,
  useLazyGetOneCompanyMemberResultsDataExportJSONQuery,
  useLazyGetOneCompanyQuizResultsDataExportCSVQuery,
  useLazyGetOneCompanyQuizResultsDataExportJSONQuery,
} from "@/app/api/companyDataExportApi";
import { useGetCompanyQuizzesQuery } from "@/app/api/quizzesApi";

interface CompanyDataExportFormProps {
  closeForm: () => void;
  companyId: string;
}
interface CompanyDataExportFormState {
  limit: number;
  page: number;
  targetMemberDataExportId: string;
  targetQuizDataExportId: string;
}

export const CompanyDataExportForm = (props: CompanyDataExportFormProps) => {
  const standardLimit = 5;
  const [state, setState] = useState<CompanyDataExportFormState>({
    limit: standardLimit,
    page: 1,
    targetMemberDataExportId: "",
    targetQuizDataExportId: "",
  });
  const { data: members } = useGetAllCompanyMembersQuery({
    companyId: props.companyId,
    limit: state.limit,
    page: state.page,
  });

  const [getAllCompanyMembersDataExportCSV] =
    useLazyGetCompanyQuizzesResultsDataExportCSVQuery();
  const [getAllCompanyMembersDataExportJSON] =
    useLazyGetCompanyQuizzesResultsDataExportJSONQuery();
  const [getOneCompanyMemberDataExportCSV] =
    useLazyGetOneCompanyMemberResultsDataExportCSVQuery();
  const [getOneCompanyMemberDataExportJSON] =
    useLazyGetOneCompanyMemberResultsDataExportJSONQuery();
  const [getOneCompanyQuizDataExportCSV] =
    useLazyGetOneCompanyQuizResultsDataExportCSVQuery();
  const [getOneCompanyQuizDataExportJSON] =
    useLazyGetOneCompanyQuizResultsDataExportJSONQuery();
  const { data: quizzes } = useGetCompanyQuizzesQuery({
    companyId: props.companyId,
    page: 1,
    limit: 100,
  });

  return (
    <form className="w-80 min-[450px]:w-96 flex flex-col gap-5">
      <div className="flex justify-between items-center p-2 border-2 border-slate-600 rounded-md bg-blue-100">
        <p>Export quizzes score list</p>
        <div className="flex flex-col gap-3">
          <CustomBtn
            title="JSON"
            btnState="success"
            clickHandler={() => {
              getAllCompanyMembersDataExportJSON(props.companyId),
                props.closeForm();
            }}
          />
          <CustomBtn
            title="CSV"
            btnState="success"
            clickHandler={() => {
              getAllCompanyMembersDataExportCSV(props.companyId),
                props.closeForm();
            }}
          />
        </div>
      </div>
      {members && (
        <div className="flex gap-4 justify-between items-center p-2 border-2 border-slate-600 rounded-md bg-blue-100">
          <div>
            <p>Export quizzes score list of one user</p>
            <Select
              labelId="member-data-export-select"
              id="member-data-export-select"
              className="w-full text-blue-600 h-10 mt-2"
              MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
              defaultValue={""}
            >
              {members.detail.items.map((el) => (
                <MenuItem
                  onClick={() =>
                    setState({
                      ...state,
                      targetMemberDataExportId: el.id,
                    })
                  }
                  key={el.id}
                  value={el.user.id}
                >
                  {el.user.firstName}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-3">
            <CustomBtn
              title="JSON"
              btnState="success"
              clickHandler={() => {
                getOneCompanyMemberDataExportJSON({
                  companyId: props.companyId,
                  memberId: state.targetMemberDataExportId,
                }),
                  props.closeForm();
              }}
              disabled={state.targetMemberDataExportId === ""}
            />
            <CustomBtn
              title="CSV"
              btnState="success"
              clickHandler={() => {
                getOneCompanyMemberDataExportCSV({
                  companyId: props.companyId,
                  memberId: state.targetMemberDataExportId,
                }),
                  props.closeForm();
              }}
              disabled={state.targetMemberDataExportId === ""}
            />
          </div>
        </div>
      )}
      {quizzes && (
        <div className="flex gap-4 justify-between items-center p-2 border-2 border-slate-600 rounded-md bg-blue-100">
          <div>
            <p>Export quizzes score list of one quiz</p>
            <Select
              labelId="quiz-data-export-select"
              id="quiz-data-export-select"
              className="w-full text-blue-600 h-10 mt-2"
              MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
              defaultValue={""}
            >
              {quizzes.detail.items.map((el) => (
                <MenuItem
                  onClick={() =>
                    setState({
                      ...state,
                      targetQuizDataExportId: el.id,
                    })
                  }
                  key={el.id}
                  value={el.id}
                >
                  {el.name}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-3">
            <CustomBtn
              title="JSON"
              btnState="success"
              clickHandler={() => {
                getOneCompanyQuizDataExportJSON({
                  companyId: props.companyId,
                  quizId: state.targetQuizDataExportId,
                }),
                  props.closeForm();
              }}
              disabled={state.targetQuizDataExportId === ""}
            />
            <CustomBtn
              title="CSV"
              btnState="success"
              clickHandler={() => {
                getOneCompanyQuizDataExportCSV({
                  companyId: props.companyId,
                  quizId: state.targetQuizDataExportId,
                }),
                  props.closeForm();
              }}
              disabled={state.targetQuizDataExportId === ""}
            />
          </div>
        </div>
      )}
    </form>
  );
};
