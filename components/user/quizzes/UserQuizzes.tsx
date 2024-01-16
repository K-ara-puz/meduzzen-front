import { QuizCard } from "@/components/company_profile/quizzes/QuizCard";
import { useGetAllUserQuizzesLastTriesQuery } from "@/app/api/userAnaliticApi";

export const UserQuizzes = () => {
  const { data: quizzes } = useGetAllUserQuizzesLastTriesQuery();
  return (
    <div>
      {quizzes && (
        <div>
          <div className="grid grid-cols-2 min-[600px]:grid-cols-3 mt-6 min-[700px]:grid-cols-4 mx-auto max-w-[1200px] gap-10">
            {quizzes.detail.map((el) => (
              <QuizCard
                key={el.quiz_id}
                quizData={{
                  ...el,
                  company: { id: el.company_id },
                  id: el.quiz_id,
                  name: el.quiz_name,
                }}
              ></QuizCard>
            ))}
          </div>
        </div>
      )}
      {quizzes?.detail.length < 1 && (
        <div>You do not have passed quizzes yet!</div>
      )}
    </div>
  );
};
