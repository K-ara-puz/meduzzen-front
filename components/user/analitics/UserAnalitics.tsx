import { useGetUserQuizzesScoresListQuery } from "@/app/api/userAnaliticApi";
import { LineChart } from "@/components/Chart";

export const UserAnalitics = () => {
  const { data: userAnalitic } = useGetUserQuizzesScoresListQuery();

  return (
    <div className="max-h-[600px]">
      <h3 className="text-blue-500 mb-10">
        Quizzes scores analitic for last week
      </h3>
      {userAnalitic && <LineChart rawData={userAnalitic.detail} />}
    </div>
  );
};
