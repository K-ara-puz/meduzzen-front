import { UsersMockData } from "../../interfaces/Users.mock.interface";
import { users } from "../../mockData";
export default function Home() {
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
