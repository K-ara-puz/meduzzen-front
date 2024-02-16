"use client";
import isAuth from "../../../../../../utils/checkUserAuthentication";
import { PassQuizPage } from "../../../../../../components/company_profile/quizzes/PassQuizPage";

function Home() {
  return <PassQuizPage />
}
export default isAuth(Home);
