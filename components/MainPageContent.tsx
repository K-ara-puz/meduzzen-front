"use client";
import CustomInput from "./CustomInput";
import { setTestString } from "../store/slices/globalData";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useLogoutUserMutation } from "../app/api/authApi";
import { useLazyGetMainQuery } from "../app/api/api";
import { setTokens } from "../store/slices/authSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { GlobalAuthContext } from "./providers/GlobalAuthProviderContext";
import CustomBtn from "./CustomBtn";

const MainPageContent = () => {
  const [trigger, resultData] = useLazyGetMainQuery()
  const dispatch = useAppDispatch();
  const { test: testString } = useAppSelector((state) => state.testStore);
  const [logoutUser] = useLogoutUserMutation();
  const {logout} = useAuth0();
  const authUser = useContext(GlobalAuthContext);

  const logoutUserHandler = async () => {
    await logoutUser();
    await dispatch(setTokens({}));
    await logout();
  }

  return (
    <div className="p-5 flex flex-col gap-5">
      {authUser && <div>{JSON.stringify(authUser)}</div>}
      <CustomBtn title="get Main!" btnState="success" clickHandler={() => trigger()}/>
      {resultData.data && <div>{JSON.stringify(resultData.data)}</div>}
      {Object.keys(authUser).length > 0 && <CustomBtn title="logout!" btnState="error" clickHandler={logoutUserHandler}/>}      
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
      </div>
      <div></div>
    </div>
  );
};
export default MainPageContent;
