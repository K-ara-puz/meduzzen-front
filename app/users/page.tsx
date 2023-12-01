"use client";
import { UserCard } from "@/components/UserCard";
import { UsersMockData } from "../../interfaces/users.mock.interface";
import { users } from "../../mockData";
import isAuth from "../../utils/checkUserAuthentication";
function Home() {
  let usersDivs = users.map((el: UsersMockData) => (
    <UserCard key={el.id}></UserCard>
  ));
  return (
    <div className="p-5">
      <div className="flex gap-10">{usersDivs}</div>
    </div>
  );
}
export default isAuth(Home);
