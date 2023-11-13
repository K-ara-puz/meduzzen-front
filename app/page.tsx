"use client"
import { useGetMainQuery } from "./api/api";
import CustomInput from "../components/CustomInput";
import { setTestString } from "../store/slices/globalData";
import { useAppDispatch, useAppSelector } from "../store/hooks";

function Home() {
  const { test: testString } = useAppSelector((state) => state.testStore);
  const dispatch = useAppDispatch();

  const { data } = useGetMainQuery();

  return (
    <main className="p-5">
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