"use client";
import React, {useEffect } from "react";
import { GlobalAuthContext } from "./GlobalAuthProviderContext";
import { useLazyAuthMeQuery } from "../../app/api/authApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setTokens } from "../../store/slices/authSlice";

const GlobalAuthProvider = ({ children }) => {
  const dispatch = useAppDispatch();
  const { user: auth0User, getAccessTokenSilently } = useAuth0();
  const [trigger] = useLazyAuthMeQuery();
  const { user: authUser } = useAppSelector((state) => state.auth);

  useEffect(() => {
    trigger({});
    if (auth0User) {
      getAccessTokenSilently().then((res) => {
        dispatch(setTokens({ accessToken: res })).then(() => {
          trigger({})
        });
      });
    }
  }, [auth0User]);

  return (
    <GlobalAuthContext.Provider value={authUser}>
      {children}
    </GlobalAuthContext.Provider>
  );
};
export default GlobalAuthProvider;
