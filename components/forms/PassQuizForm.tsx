"use client";
import CustomBtn from "../CustomBtn";
import { Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetCompanyQuizQuestionsAndAnswersQuery } from "../../app/api/quizzesApi";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

interface IAnswer {
  value: string;
  isRight: boolean;
}
interface IQuestion {
  name: string;
  answers: IAnswer[];
}
interface IQuizFormState {
  questionCount: number;
  questions: IQuestion[];
  userQuizData: {
    answers: IPassQuizAnswer[];
  };
}
interface IPassQuizAnswer {
  questionId: string;
  answersId?: String[];
}
export const PassQuizForm = ({ handleSubmit }) => {
  const quizFormState = {
    questionCount: 2,
    questions: [],
    userQuizData: {
      answers: [],
    },
  };
  const [state, setState] = useState<IQuizFormState>(quizFormState);
  const params = useParams();
  const { data: quizAnswers } = useGetCompanyQuizQuestionsAndAnswersQuery({
    quizId: params.quizId as string,
    companyId: params.id as string,
  });
  useEffect(() => {
    if (quizAnswers && state.questions.length < 1) {
      let questions = [];
      quizAnswers?.detail.forEach((answer) => {
        let question = {
          id: answer.question.id,
          name: answer.question.name,
          answers: [],
        };
        let newAnswer = {
          id: answer.id,
          value: answer.value,
        };
        const matchedQuestion = questions.find(
          (el) => el.name === answer.question.name
        );
        if (matchedQuestion) {
          matchedQuestion.answers.push(newAnswer);
        } else {
          question.answers.push(newAnswer);
          questions.push(question);
        }
        setState({
          ...state,
          questions: questions,
          questionCount: questions.length,
        });
      });
    }
  }, [quizAnswers]);
  const setRightAnswer = (
    isRightAnswer: boolean,
    answerId: string,
    questionId: string
  ) => {
    if (isRightAnswer) {
      setTrueAnswer(answerId, questionId);
      return;
    }
    setFalseAnswer(answerId, questionId);
  };
  const setTrueAnswer = (answerId: string, questionId: string) => {
    const questionIndex = state.userQuizData.answers.findIndex(
      (el) => el.questionId === questionId
    );
    if (questionIndex === -1) {
      let question: IPassQuizAnswer = {
        questionId,
        answersId: [],
      };
      question.answersId.push(answerId);
      let tempQuizData = {
        answers: [],
      };
      tempQuizData.answers.push(question);
      setState({
        ...state,
        userQuizData: {
          answers: [...state.userQuizData.answers, question],
        },
      });
      return;
    }
    const tempAnswers = state.userQuizData.answers;
    tempAnswers[questionIndex].answersId.push(answerId);
    setState({
      ...state,
      userQuizData: {
        answers: [...tempAnswers],
      },
    });
  };
  const setFalseAnswer = (answerId: string, questionId: string) => {
    const questionIndex = state.userQuizData.answers.findIndex(
      (el) => el.questionId === questionId
    );
    const tempAnswersOfOneQuestion = state.userQuizData.answers[questionIndex];
    const answerIndex = tempAnswersOfOneQuestion.answersId.findIndex(
      (el) => el === answerId
    );
    const tempAnswersOfAllQuestions = state.userQuizData.answers;
    if (tempAnswersOfOneQuestion.answersId.length < 2) {
      toast("min count of answers is 1", { autoClose: 2000, type: "error" });
    }
    tempAnswersOfOneQuestion.answersId.splice(answerIndex, 1);
    tempAnswersOfAllQuestions[questionIndex] = tempAnswersOfOneQuestion;

    setState({
      ...state,
      userQuizData: { answers: tempAnswersOfAllQuestions },
    });
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e, state.userQuizData)}
      className="flex flex-col w-96 items-center overflow-y-auto max-h-[80vh] pt-3 pr-2"
    >
      <QuizQuestion
        setIsRightAnswer={setRightAnswer}
        questions={state.questions}
      />
      <div className="w-full flex gap-5">
        <CustomBtn
          title="Submit"
          type="submit"
          btnState="success"
          clickHandler={() => {}}
        />
      </div>
    </form>
  );
};

interface QuizQuestionProps {
  setIsRightAnswer?: (
    isRightAnswer: boolean,
    answerId: string,
    questionId: string
  ) => void;
  questions: IQuestion[];
}
const QuizQuestion = (props: QuizQuestionProps) => {
  return (
    <div className="questions w-full my-5">
      {props.questions.length > 0 && (
        <div className="mb-1">
          {props.questions.map((el, index) => {
            return (
              <div key={index} className="mb-3">
                <div className="flex items-center justify-start gap-3 mb-2">
                  <div className="text-red-500">{++index}.</div>
                  <div className="w-full text-blue-700">{el.name}</div>
                </div>
                <QuizAnswers
                  questionId={el["id"]}
                  setRightAnswer={props.setIsRightAnswer}
                  answers={el.answers}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

interface QuizAnswersProps {
  setRightAnswer?: (
    isRightAnswer: boolean,
    answerId: string,
    questionId: string
  ) => void;
  questionId: string;
  answers?: IAnswer[];
}
const QuizAnswers = (props: QuizAnswersProps) => {
  return (
    <div className="flex flex-col border-b-2 border-gray-500 pl-4">
      <div className="flex flex-col gap-2 w-full">
        {props.answers.map((answer) => {
          return (
            <div className="flex w-full" key={answer.value}>
              <div className="w-full flex h-8 items-center">
                <div className="w-full">{answer.value}</div>
                <Checkbox
                  onChange={(_, checked) =>
                    props.setRightAnswer(
                      checked,
                      answer["id"],
                      props.questionId
                    )
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
