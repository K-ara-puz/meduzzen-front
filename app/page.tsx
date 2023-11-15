"use client"
import { useGetMainQuery } from "./api/api";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useSession } from "next-auth/react";
import { setAuthData } from "../store/slices/authSlice";
import { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { setTestString } from "../store/slices/globalData";

function Home() {
  const {test: testString} = useAppSelector((state) => state.testStore);
  const {user} = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const { data } = useGetMainQuery();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session && Object.keys(user).length < 1) {
      dispatch(setAuthData(session.user))
    }
  })

  return (
    <main className="p-5">
      {user && JSON.stringify(user)}
      <h2>
        String from Redux:
        <span className="underline"> {testString}</span>
      </h2>
      <div className="bg-red-500 w-80 mt-4">
        <CustomInput
          label="type new value for test string:"
          type="text"
          value={testString}
          afterChange={(e) => dispatch(setTestString(e.target.value))}
        />
      </div>
      <div className="pt-5">
        {data && <h1>Data from RTK Query: {`${JSON.stringify(data)}`}</h1>}
      </div>
    </main>
  )
}
export default Home;