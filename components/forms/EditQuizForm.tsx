"use client";
import CustomBtn from "../CustomBtn";
import { Checkbox, TextField } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import {
  IQuizAnswer,
  useGetCompanyQuizQuery,
  useGetCompanyQuizQuestionsAndAnswersQuery,
} from "../../app/api/quizzesApi";
import { useParams } from "next/navigation";
import Image from "next/image";

interface IAnswer {
  value: string;
  isRight: boolean;
}
interface IQuestion {
  name: string;
  answers: IAnswer[];
}
interface IQuizFormState {
  name: string;
  description: string;
  attemptsPerDay: number;
  questionCount: number;
  questions: IQuestion[];
}
export const EditQuizForm = ({ handleSubmit }) => {
  const quizFormState = {
    name: "",
    description: "",
    attemptsPerDay: 0,
    questionCount: 2,
    questions: [],
  };
  const params = useParams();
  const [state, setState] = useState<IQuizFormState>(quizFormState);
  const { data: quiz, isSuccess } = useGetCompanyQuizQuery({
    quizId: params.quizId as string,
    companyId: params.id as string,
  });
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
          isRight: answer.isRight,
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
          name: quiz.detail.name,
          description: quiz.detail.description,
          attemptsPerDay: quiz.detail.attemptsPerDay,
        });
      });
    }
  }, [quizAnswers]);

  const addQuestion = () => {
    const updatedQuestions = state.questions;
    updatedQuestions.push({
      name: "",
      answers: [
        { value: "", isRight: false },
        { value: "", isRight: false },
      ],
    });

    setState({
      ...state,
      questionCount: ++state.questionCount,
      questions: updatedQuestions,
    });
  };
  const addAnswer = (questionIndex: number) => {
    const updatedQuestions = state.questions;
    updatedQuestions[questionIndex].answers.push({ value: "", isRight: false });
    setState({ ...state, questions: updatedQuestions });
  };
  const setQuestion = (event: FormEvent<HTMLDivElement>, questionIndex: number) => {
    const updatedQuestions = state.questions;
    const target = event.target as HTMLInputElement;
    updatedQuestions[questionIndex].name = target.value;
    setState({ ...state, questions: updatedQuestions });
  };
  const setAnswer = (event: FormEvent<HTMLDivElement>, questionIndex: number, answerIndex: number) => {
    let tempQuestions = state.questions;
    const target = event.target as HTMLInputElement;
    tempQuestions[questionIndex].answers[answerIndex].value =
      target.value;
    setState({ ...state, questions: tempQuestions });
  };
  const setRightAnswer = (isRightAnswer: boolean, questionIndex: number, answerIndex: number) => {
    let tempQuestions = state.questions;
    tempQuestions[questionIndex].answers[answerIndex].isRight = isRightAnswer;
    setState({ ...state, questions: tempQuestions });
  };
  const deleteQuestion = (e: React.MouseEvent<HTMLButtonElement>, questionIndex: number) => {
    e.preventDefault();
    const updatedQuestions = state.questions;
    updatedQuestions.splice(questionIndex, 1);
    setState({
      ...state,
      questions: updatedQuestions,
      questionCount: --state.questionCount,
    });
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e, state)}
      className="flex flex-col w-96 items-center overflow-y-auto max-h-[80vh] pt-3 pr-2"
    >
      <div className="w-full">
        <div className="w-full mb-2">
          <TextField
            required
            label="Quiz name"
            onInput={(e) => {
              setState({ ...state, name: e.target["value"] });
            }}
            value={state.name}
            variant="outlined"
            className="w-full"
          />
        </div>
        <div className="w-full mb-2">
          <TextField
            required
            label="Description"
            onInput={(e) => {
              setState({ ...state, description: e.target["value"] });
            }}
            value={state.description}
            variant="outlined"
            className="w-full"
          />
        </div>
        <div className="w-full mb-2">
          <TextField
            required
            label="Attempts per day"
            onInput={(e) => {
              setState({ ...state, attemptsPerDay: Number(e.target["value"]) });
            }}
            value={state.attemptsPerDay}
            variant="outlined"
            type="number"
            className="w-full"
          />
        </div>
      </div>
      <h2 className="self-start">Questions</h2>
      <p className="self-start text-xs text-blue-500">
        * You must check right answers
      </p>
      {state.questions.length > 0 && (
        <QuizQuestions
          questionCount={state.questionCount}
          addAnswer={addAnswer}
          setQuestion={setQuestion}
          setAnswer={setAnswer}
          setIsRightAnswer={setRightAnswer}
          questions={state.questions}
          deleteQuestion={deleteQuestion}
        />
      )}
      <div className="w-full flex gap-5">
        <CustomBtn
          title="Add Question"
          type="button"
          btnState="purple"
          clickHandler={addQuestion}
        />
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
  addAnswer?: (index: number) => void;
  setAnswer?: (
    event: FormEvent<HTMLDivElement>,
    questionIndex: number,
    answerIndex: number
  ) => void;
  setIsRightAnswer?: (
    isRightAnswer: boolean,
    questionIndex: number,
    answerIndex: number
  ) => void;
  setQuestion: (event: FormEvent<HTMLDivElement>, index: number) => void;
  deleteQuestion: (event: React.MouseEvent<HTMLButtonElement>, index: number) => void;
  questionCount: number;
  questions: IQuestion[];

}
const QuizQuestions = (props: QuizQuestionProps) => {
  return (
    <div className="questions w-full my-5">
      <div className="mb-1">
        {Array.from(Array(props.questionCount).keys()).map((el) => {
          return (
            <div key={el} className="mb-3">
              <div className="flex items-center justify-start gap-3">
                <div>{++el}.</div>
                <div className="w-full flex items-center gap-5 mb-2">
                  <TextField
                    onInput={(e) => props.setQuestion(e, --el)}
                    value={props.questions[el - 1].name}
                    required
                    label="question"
                    variant="outlined"
                    className="w-full"
                  />
                  <button
                    onClick={(e) => props.deleteQuestion(e, --el)}
                    className=" w-5 h-8"
                  >
                    <Image
                      src="/trash.svg"
                      alt="delete"
                      width={20}
                      height={12}
                    />
                  </button>
                </div>
              </div>
              <QuizAnswers
                questionNumber={el}
                addAnswer={props.addAnswer}
                setAnswer={props.setAnswer}
                questionIndex={el - 1}
                setRightAnswer={props.setIsRightAnswer}
                answers={props.questions[el - 1].answers}
                answersCount={props.questions[el - 1].answers.length}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface QuizAnswersProps {
  addAnswer?: (index: number) => void;
  setAnswer?: (
    event: FormEvent<HTMLDivElement>,
    questionIndex: number,
    answerIndex: number
  ) => void;
  setRightAnswer?: (
    isRightAnswer: boolean,
    questionIndex: number,
    answerIndex: number
  ) => void;
  answers: IAnswer[];
  questionNumber: number;
  questionIndex: number;
  answersCount: number;
}
const QuizAnswers = (props: QuizAnswersProps) => {
  const answersState = {
    answersCount: props.answersCount,
  };
  const [state, setState] = useState(answersState);
  const addAnswer = () => {
    setState({ ...state, answersCount: ++state.answersCount });
    props.addAnswer(props.questionIndex);
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2 w-full">
        {Array.from(Array(state.answersCount).keys()).map((el) => {
          return (
            <div className="flex w-full" key={el}>
              <div className="w-full flex">
                <TextField
                  required
                  onInput={(e) => props.setAnswer(e, props.questionIndex, el)}
                  value={props.answers[el].value}
                  label="answer"
                  variant="outlined"
                  className="w-full"
                />
                <Checkbox
                  checked={props.answers[el].isRight}
                  onChange={(_, checked) =>
                    props.setRightAnswer(checked, props.questionIndex, el)
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
      <CustomBtn title="Add Answer" btnState="gray" clickHandler={addAnswer} />
    </div>
  );
};
