'use client'
import { UsersMockData } from "../../interfaces/users.mock.interface";
import { users } from "../../mockData";
import isAuth from "../../utils/checkUserAuthentication";
function Home() {
  let usersDivs = users.map((el: UsersMockData) => (
    <div key={el.id} className="bg-slate-600 mb-2">
      Name: {el.name}, age: {el.age}
    </div>
  ));
  return (
    <div>
      <h1 className="text-3xl">Users!</h1>
      {usersDivs}
    </div>
  );
}
export default isAuth(Home);
