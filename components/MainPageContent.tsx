"use client";
import CustomInput from "./CustomInput";
import { setTestString } from "../store/slices/globalData";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useLazyGetMainQuery } from "../app/api/api";
import CustomBtn from "./CustomBtn";

const MainPageContent = () => {
  const [trigger, resultData] = useLazyGetMainQuery();
  const dispatch = useAppDispatch();
  const { test: testString } = useAppSelector((state) => state.testStore);

  return (
    <div className="p-5 flex flex-col gap-5">
      <CustomBtn
        title="get Main!"
        btnState="success"
        clickHandler={() => trigger()}
      />
      {resultData.data && <div>{JSON.stringify(resultData.data)}</div>}
      <h2>
        String from Redux:
        <span className="underline"> {testString}</span>
      </h2>
      <div className="bg-red-500 max-w-prose mt-4">
        <CustomInput
          label="type new value for test string:"
          type="text"
          value={testString}
          afterChange={(e) => dispatch(setTestString(e.target.value))}
        />
      </div>
      <div className="pt-5"></div>
      <div></div>
    </div>
  );
};
export default MainPageContent;
