import {
  useLazyGetUserQuizzesResultsDataExportCSVQuery,
  useLazyGetUserQuizzesResultsDataExportJSONQuery,
} from "@/app/api/userDataExportApi.ts";
import CustomBtn from "../CustomBtn";

interface UserDataExportFormProps {
  closeForm: () => void;
}

export const UserDataExportForm = (props: UserDataExportFormProps) => {
  const [getUserQuizDataExportJSON] =
    useLazyGetUserQuizzesResultsDataExportJSONQuery();
  const [getUserQuizDataExportCSV] =
    useLazyGetUserQuizzesResultsDataExportCSVQuery();

  return (
    <form className="w-80 min-[450px]:w-96">
      <div className="flex justify-between items-center p-2 border-2 border-slate-600 rounded-md bg-blue-100">
        <p>Export quizzes score list</p>
        <div className="flex flex-col gap-3">
          <CustomBtn
            title="JSON"
            btnState="success"
            clickHandler={() => {
              getUserQuizDataExportJSON(), props.closeForm();
            }}
          />
          <CustomBtn
            title="CSV"
            btnState="success"
            clickHandler={() => {
              getUserQuizDataExportCSV(), props.closeForm();
            }}
          />
        </div>
      </div>
    </form>
  );
};
