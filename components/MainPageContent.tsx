"use client";
import { useLazyGetMainQuery } from "../app/api/api";
import CustomBtn from "./CustomBtn";

const MainPageContent = () => {
  const [trigger, resultData] = useLazyGetMainQuery();

  return (
    <div className="p-5 flex flex-col gap-5">
      <CustomBtn
        title="get Main!"
        btnState="success"
        clickHandler={() => trigger()}
      />
      {resultData.data && <div>{JSON.stringify(resultData.data)}</div>}
    </div>
  );
};
export default MainPageContent;
