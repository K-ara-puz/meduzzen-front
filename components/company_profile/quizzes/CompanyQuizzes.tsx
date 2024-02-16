import { useState } from "react";
import { CustomPaginator } from "../../CustomPaginator";
import BasicPopup from "../../popups/BasicPopup";
import {
  CreateQuizDto,
  useGetCompanyQuizzesQuery,
  useMakeCompanyQuizMutation,
} from "../../../app/api/quizzesApi";
import { CompanyData } from "../../../interfaces/CompanyData.interface";
import { QuizCard } from "./QuizCard";
import { AddQuizForm } from "../../forms/AddQuizForm";
import { CompanyMemberRoles } from "@/utils/constants";

interface CompanyQuizzesProps {
  companyId: string;
  companyMemberRole?: string;
}
interface CompanyQuizzesState {
  limit: number;
  page: number;
  companyId: string;
  isAddQuizPopupOpen: boolean;
}

interface CompanyQuiz {
  id: string;
  attemptsPerDay: number;
  name: string;
  description: string;
  company: Partial<CompanyData>;
}

export const CompanyQuizzes = (props: CompanyQuizzesProps) => {
  const standardLimit = 5;
  const [state, setState] = useState<CompanyQuizzesState>({
    limit: standardLimit,
    page: 1,
    companyId: "",
    isAddQuizPopupOpen: false,
  });
  const { data: quizzes } = useGetCompanyQuizzesQuery({
    companyId: props.companyId,
    limit: state.limit,
    page: state.page,
  });
  const [makeQuiz] = useMakeCompanyQuizMutation();
  const nextPage = async (page: number) => {
    setState({ ...state, limit: standardLimit, page: page });
  };

  const addQuiz = (e: React.MouseEvent<HTMLElement>, quiz: CreateQuizDto) => {
    e.preventDefault();
    makeQuiz({ companyId: props.companyId, ...quiz }).then((res) => {
      if (res.hasOwnProperty("error")) {
        return;
      }
      setState({ ...state, isAddQuizPopupOpen: false });
    });
  };

  return (
    <div>
      {props.companyMemberRole === CompanyMemberRoles.owner ||
      props.companyMemberRole === CompanyMemberRoles.admin ? (
        <div>
          <button
            onClick={() => setState({ ...state, isAddQuizPopupOpen: true })}
            className="w-8 h-8 rounded-full bg-green-500 hover:bg-blue-500 hover:scale-110 text-white"
          >
            +
          </button>
          <label className="uppercase ml-2 text-green-800">Add Quiz</label>
        </div>
      ) : null}

      {quizzes && (
        <div>
          <div className="grid grid-cols-2 min-[500px]:grid-cols-3 mt-6 md:grid-cols-5 mx-auto max-w-[1200px] gap-10">
            {quizzes.detail.items.map((el: CompanyQuiz) => (
              <QuizCard key={el.id} quizData={{ ...el }}></QuizCard>
            ))}
          </div>
          <div className="my-5 flex items-center justify-center">
            <CustomPaginator
              limit={state.limit}
              totalItems={quizzes.detail["totalItemsCount"]}
              onClick={nextPage}
            />
          </div>
        </div>
      )}
      {quizzes?.detail.items.length < 1 && (
        <div>Company does not have quizzes yet!</div>
      )}
      <BasicPopup
        shouldShow={state.isAddQuizPopupOpen}
        title="Add Quiz"
        onRequestClose={() => {
          setState({ ...state, isAddQuizPopupOpen: false });
        }}
      >
        <div className="min-w-96">
          <AddQuizForm handleSubmit={addQuiz} />
        </div>
      </BasicPopup>
    </div>
  );
};
