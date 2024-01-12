import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  UpdateQuizDto,
  useDeleteCompanyQuizMutation,
  useEditCompanyQuizMutation,
  useGetCompanyQuizQuery,
} from "../../../app/api/quizzesApi";
import { useGetMyCompanyMemberQuery } from "../../../app/api/companyApi";
import { CompanyMemberRoles } from "../../../utils/constants";
import CustomBtn from "../../CustomBtn";
import BasicPopup from "../../popups/BasicPopup";
import { EditQuizForm } from "../../forms/EditQuizForm";
import { CommonWarningForm } from "../../forms/CommonWarningForm";

export const QuizProfile = () => {
  const params = useParams();
  interface QuizProfileState {
    isEditQuizPopupOpen: boolean;
    isDeleteQuizPopupOpen: boolean;
  }

  const initialQuizProfileState = {
    isEditQuizPopupOpen: false,
    isDeleteQuizPopupOpen: false,
  };
  const router = useRouter();
  const [state, setState] = useState<QuizProfileState>(initialQuizProfileState);
  const { data: quiz, isSuccess } = useGetCompanyQuizQuery({
    quizId: params.quizId as string,
    companyId: params.id as string,
  });

  const { data: companyMember, refetch } = useGetMyCompanyMemberQuery(
    params.id as string
  );
  const [editCompanyQuiz] = useEditCompanyQuizMutation();
  const [deleteCompanyQuiz] = useDeleteCompanyQuizMutation();
  const editQuiz = (e: Event, quiz: UpdateQuizDto) => {
    e.preventDefault();
    editCompanyQuiz({
      quiz: { ...quiz, id: params.quizId as string },
      companyId: params.id as string,
    }).then(() => setState({ ...state, isEditQuizPopupOpen: false }));
  };
  const deleteQuiz = () => {
    deleteCompanyQuiz({
      quizId: params.quizId as string,
      companyId: params.id as string,
    }).then(() => {
      setState({ ...state, isDeleteQuizPopupOpen: false });
      router.back();
    });
  };
  return (
    <div className="p-5">
      {quiz && companyMember && (
        <div className="company w-full flex gap-5">
          <div className="company-card">
            <div className="w-36 h-36 relative after:content-['Q'] after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:text-4xl after:text-gray-00 after:-translate-y-1/2 after:absolute bg-blue-300"></div>
          </div>
          <div className="flex flex-col">
            <ul className="flex-auto">
              <li>
                <span className="font-bold">Name: </span>
                {quiz.detail.name}
              </li>
              <li>
                <span className="font-bold">Description: </span>
                {quiz.detail.description}
              </li>
            </ul>
            {(companyMember?.detail &&
              companyMember.detail.role === CompanyMemberRoles.owner) ||
            companyMember.detail.role === CompanyMemberRoles.admin ? (
              <div className="w-56 flex mt-4 flex-col gap-1">
                <CustomBtn
                  btnState="gray"
                  title="edit quiz"
                  clickHandler={() =>
                    setState({ ...state, isEditQuizPopupOpen: true })
                  }
                />
                <CustomBtn
                  btnState="error"
                  title="delete quiz"
                  clickHandler={() =>
                    setState({ ...state, isDeleteQuizPopupOpen: true })
                  }
                />
              </div>
            ) : null}
            <div className="w-56 flex flex-col mt-1">
              <CustomBtn
                btnState="success"
                title="PASS QUIZ"
                clickHandler={() =>
                  router.push(
                    `/companies/${params.id}/quiz/pass/${params.quizId}`
                  )
                }
              />
            </div>
          </div>
        </div>
      )}
      <BasicPopup
        shouldShow={state.isEditQuizPopupOpen}
        title="Edit Quiz"
        onRequestClose={() =>
          setState({ ...state, isEditQuizPopupOpen: false })
        }
      >
        <EditQuizForm handleSubmit={editQuiz} />
      </BasicPopup>
      <BasicPopup
        shouldShow={state.isDeleteQuizPopupOpen}
        title="Delete Quiz"
        onRequestClose={() =>
          setState({ ...state, isDeleteQuizPopupOpen: false })
        }
      >
        <CommonWarningForm
          title="Are you sure you want to delete quiz?"
          apply={deleteQuiz}
          cancel={() => setState({ ...state, isDeleteQuizPopupOpen: false })}
        />
      </BasicPopup>
    </div>
  );
};
