"use client";
import { Provider } from "react-redux"
import { store } from "../app/store/store";
import { PropsWithChildren } from "react";

export default function ReduxProvider({children}: PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
};