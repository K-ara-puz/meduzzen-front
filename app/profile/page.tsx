"use client";
import isAuth from "../../utils/checkUserAuthentication";
import { UserProfile } from "@/components/user/UserProfile";

function Home() {
  return <UserProfile />;
}
export default isAuth(Home);
