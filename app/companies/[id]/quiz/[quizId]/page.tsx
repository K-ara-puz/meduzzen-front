"use client";
import isAuth from "../../../../../utils/checkUserAuthentication";
import { QuizProfile } from "../../../../../components/company_profile/quizzes/QuizProfile";

function Home() {
  return <QuizProfile />;
}
export default isAuth(Home);
