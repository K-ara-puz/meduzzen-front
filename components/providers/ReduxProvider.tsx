"use client";
import { Provider } from "react-redux"
import { PropsWithChildren } from "react";
import { store } from "../../store/store";
import { injectStore } from "../../utils/userFetcher";

export default function ReduxProvider({children}: PropsWithChildren) {
  injectStore(store)
  return <Provider store={store}>{children}</Provider>;
};