"use client";
import CustomBtn from "../CustomBtn";
import { Checkbox, TextField } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";

export const AddQuizForm = ({ handleSubmit }) => {
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
  const quizFormState = {
    name: "",
    description: "",
    attemptsPerDay: 0,
    questionCount: 2,
    questions: [],
  };
  const [state, setState] = useState<IQuizFormState>(quizFormState);
  useEffect(() => {
    let tempQuestions = state.questions;
    if (tempQuestions.length < 1) {
      for (let i = 0; i < state.questionCount; i++) {
        tempQuestions.push({
          name: "",
          answers: [
            { value: "", isRight: false },
            { value: "", isRight: false },
          ],
        });
      }
    }
    setState({ ...state, questions: tempQuestions });
  }, [state.questionCount]);
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
  const setQuestion = (
    event: FormEvent<HTMLDivElement>,
    questionIndex: number
  ) => {
    const updatedQuestions = state.questions;
    const target = event.target as HTMLInputElement;
    updatedQuestions[questionIndex].name = target.value;
    setState({ ...state, questions: updatedQuestions });
  };
  const setAnswer = (
    event: FormEvent<HTMLDivElement>,
    questionIndex: number,
    answerIndex: number
  ) => {
    let tempQuestions = state.questions;
    const target = event.target as HTMLInputElement;
    tempQuestions[questionIndex].answers[answerIndex].value = target.value;
    setState({ ...state, questions: tempQuestions });
  };
  const setRightAnswer = (
    isRightAnswer: boolean,
    questionIndex: number,
    answerIndex: number
  ) => {
    let tempQuestions = state.questions;
    tempQuestions[questionIndex].answers[answerIndex].isRight = isRightAnswer;
    setState({ ...state, questions: tempQuestions });
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

      <QuizQuestion
        questionCount={state.questionCount}
        addAnswer={addAnswer}
        setQuestion={setQuestion}
        setAnswer={setAnswer}
        setIsRightAnswer={setRightAnswer}
      />
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
  questionCount: number;
}
const QuizQuestion = (props: QuizQuestionProps) => {
  return (
    <div className="questions w-full my-5">
      <div className="mb-1">
        {Array.from(Array(props.questionCount).keys()).map((el) => {
          return (
            <div key={el} className="mb-3">
              <div className="flex items-center justify-start gap-3">
                <div>{++el}.</div>
                <div className="w-full mb-2">
                  <TextField
                    onInput={(e) => props.setQuestion(e, el)}
                    required
                    label="question"
                    variant="outlined"
                    className="w-full"
                  />
                </div>
              </div>
              <QuizAnswers
                questionNumber={el}
                addAnswer={props.addAnswer}
                setAnswer={props.setAnswer}
                questionIndex={--el}
                setRightAnswer={props.setIsRightAnswer}
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
  questionNumber: number;
  questionIndex: number;
}
const QuizAnswers = (props: QuizAnswersProps) => {
  const answersState = {
    answersCount: 2,
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
                  label="answer"
                  variant="outlined"
                  className="w-full"
                />
                <Checkbox
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
