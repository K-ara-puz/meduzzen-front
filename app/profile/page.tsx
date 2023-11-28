'use client'
import isAuth from "../../utils/checkUserAuthentication";

function Home() {
  return (
    <div>
      <h1 className="text-3xl">Profile!</h1>
    </div>
  );
}
export default isAuth(Home);
