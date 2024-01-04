import { CompanyData } from "../../../interfaces/CompanyData.interface";
import CustomBtn from "../../CustomBtn";
import { useParams, useRouter } from "next/navigation";

interface QuizCardProps {
  quizData: {
    id: string;
    attemptsPerDay?: number;
    name: string;
    description: string;
    company?: Partial<CompanyData>;
  };
}

export const QuizCard = (props: QuizCardProps) => {
  const router = useRouter();
  const params = useParams();
  const openQuiz = (quizId: string) => {
    router.push(`/companies/${params.id}/quiz/${quizId}`);
  };
  return (
    <div className="bg-slate-300 text-xs max-w-xs flex flex-col gap-5 text-center">
      <div className="flex-auto">
        <div className="w-full h-36 relative after:content-['Q'] after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:text-4xl after:text-gray-00 after:-translate-y-1/2 after:absolute bg-blue-300"></div>
        <div className="break-all whitespace-pre-line p-2 text-start">
          <div className="mb-2">
            <span className="font-bold">Name:</span> {props.quizData.name}{" "}
          </div>
          {props.quizData.description && (
            <div>
              <span className="font-bold">Description:</span>{" "}
              {props.quizData.description}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <CustomBtn
          title="Open quiz"
          btnState="success"
          clickHandler={() => openQuiz(props.quizData.id)}
        />
      </div>
    </div>
  );
};
