import { useParams, useRouter } from "next/navigation";
import { PassQuizForm } from "../../forms/PassQuizForm";
import { PassQuizData, usePassCompanyQuizMutation } from "../../../app/api/quizzesApi";

export const PassQuizPage = () => {
  const params = useParams();
  const router = useRouter();
  const [passCompanyQuiz, result] = usePassCompanyQuizMutation();
  const passQuiz = (e: Event, quizData: PassQuizData) => {
    e.preventDefault();
    passCompanyQuiz({ quizId: params.quizId, companyId: params.id, ...quizData });
    router.push(`/companies/${params.id}`)
  };
  return (
    <div className="p-5">
      <PassQuizForm handleSubmit={passQuiz} />
    </div>
  );
};
