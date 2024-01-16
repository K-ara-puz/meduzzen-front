import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ICompanyMembersQuizzesAnalitic } from "@/app/api/companyAnaliticApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const labels = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

interface IChart {
  rawData: ICompanyMembersQuizzesAnalitic[]
}

export function LineChart({ rawData }: IChart) {
  let initState = {
    chartDatasetsData: [],
  };
  const [state, setState] = useState(initState);
  useEffect(() => {
    const gruoppedData = groupByDate(rawData);
    getAverageScoreByWeekDay(gruoppedData);
  }, []);

  const data = {
    labels,
    datasets: state.chartDatasetsData.map((el) => {
      return {
        label: el.label,
        data: [...el.results],
        borderColor: getRandomColor(),
      };
    }),
  };

  function getRandomColor() {
    const letters = "0123456789ABCDEF".split("");
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const groupByDate = (data: ICompanyMembersQuizzesAnalitic[]) => {
    let resultData = [];
    data.forEach((member) => {
      let parsedResults = [];
      member.results.forEach((result) => {
        const resultWeekDay = new Date(result.date).getDay();
        const foundedResultForThisDay = parsedResults.find(
          (el) => el.dayIndex == resultWeekDay
        );
        if (!foundedResultForThisDay) {
          let parsedResult = {
            dayIndex: resultWeekDay,
            scores: [result.score],
            quizId: result.quizId,
            label: member.userName,
          };
          parsedResults.push(parsedResult);
          return;
        }
        let index = parsedResults.indexOf(foundedResultForThisDay);
        parsedResults[index].scores.push(result.score);
      });

      resultData.push({
        ...member,
        label: member.userName,
        results: parsedResults,
      });
    });
    return resultData;
  };

  const getAverageScoreByWeekDay = (data) => {
    let resultData = [];
    data.forEach((member) => {
      let memberScoresByWeek = [];
      Array.from(Array(7).keys()).forEach((day) => {
        const foundedDay = member.results.find((el) => el.dayIndex == day);
        let index = day < 1 ? 6 : day - 1;
        if (foundedDay) {
          let res = 0;
          foundedDay.scores.forEach((score) => (res += +score));
          memberScoresByWeek[index] = +(res / foundedDay.scores.length);
          return;
        }

        memberScoresByWeek[index] = ",";
      });
      resultData.push({ ...member, results: memberScoresByWeek });
    });
    setState({ ...state, chartDatasetsData: resultData });
  };

  return (
    <>
      <div className="relative min-h-[300px]">
        <Line options={options} data={data} />
      </div>
    </>
  );
}
