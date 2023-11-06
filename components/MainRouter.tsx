"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import Link from "next/link";
import CustomInput from "./CustomInput";
import { setTestString } from "@/app/store/features/globalData";
import { useGetMainQuery } from "../api/api";

export const MainRouter = () => {
  const { test: testString } = useAppSelector((state) => state.testStore);
  const dispatch = useAppDispatch();

  const data = useGetMainQuery("");
  console.log(data, "!!!!!");
  return (
    <main className="p-5">
      {/* <div>
        {data.data != undefined || null
          ? data.data.map((theData: any, i: any) => <h1 key={i}>{theData}</h1>)
          : null}
      </div> */}
      <nav className="bg-red-500 w-w p-5 mb-4 flex justify-between flex-wrap">
        <Link href="/about" className="underline">
          About
        </Link>
        <Link href="/profile" className="underline">
          Profile
        </Link>
        <Link href="/users" className="underline">
          Users
        </Link>
        <Link href="/companies" className="underline">
          Companies
        </Link>
        <Link href="/login" className="underline">
          Login
        </Link>
        <Link href="/registration" className="underline">
          Register
        </Link>
      </nav>
      <h2>
        String from Redux:
        <span className="underline">{testString}</span>
      </h2>
      <div className="bg-red-500 w-80 mt-4">
        <CustomInput
          label="type new value for test string:"
          type="text"
          value={testString}
          afterChange={(e) => dispatch(setTestString(e.target.value))}
        />
      </div>
    </main>
  );
};
