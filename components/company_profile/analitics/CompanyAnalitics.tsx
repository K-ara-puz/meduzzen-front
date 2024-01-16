import { useGetAllCompanyMembersQuizzesScoresListQuery } from "@/app/api/companyAnaliticApi";
import { LineChart } from "../../Chart";

interface CompanyAnaliticsProps {
  companyId: string;
}

export const CompanyAnalitics = (props: CompanyAnaliticsProps) => {
  const { data: companyAnalitic } = useGetAllCompanyMembersQuizzesScoresListQuery(
    props.companyId
  );

  return (
    <div>
      <h3 className="text-blue-500">All analitics for last week</h3>
      {companyAnalitic && (
        <LineChart rawData={companyAnalitic.detail}/>
      )}
    </div>
  );
};
