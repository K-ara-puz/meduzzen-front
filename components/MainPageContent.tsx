"use client";
import CustomInput from "./CustomInput";
import { setTestString } from "../store/slices/globalData";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { userFetcher } from "../utils/userFetcher";
import { logoutUser } from "../store/slices/authSlice";

const MainPageContent = () => {
  const dispatch = useAppDispatch();
  const { test: testString } = useAppSelector((state) => state.testStore);
  const { user: authUser } = useAppSelector((state) => state.auth);
  
  useEffect(() => {
    userFetcher()
  }, [])

  return (
    <div className="p-5">
      {authUser && <div>{JSON.stringify(authUser)}</div>}
      <button onClick={() => dispatch(logoutUser())} className="bg-red-500 px-5 py-2">Log out!</button>
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
        {/* {data && <h1>Data from RTK Query: {`${JSON.stringify(data)}`}</h1>} */}
      </div>
      <div></div>
    </div>
  );
};
export default MainPageContent;
