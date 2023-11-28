"use client";
import { useParams } from "next/navigation";
import isAuth from "../../../utils/checkUserAuthentication";
function Home() {
  const { id } = useParams();
  return (
    <div>
      <h1 className="text-3xl mb-3">Company profile!</h1>
      <ul className="flex flex-col gap-3">
        <li className="bg-red-500">Company id: {id}</li>
      </ul>
    </div>
  );
}
export default isAuth(Home);
