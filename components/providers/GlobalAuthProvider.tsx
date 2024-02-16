"use client";
import React, { useEffect } from "react";
import { GlobalAuthContext } from "./GlobalAuthProviderContext";
import { useAuthMeQuery, useLazyAuthMeQuery } from "../../app/api/authApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setIsAuth, setTokens } from "../../store/slices/authSlice";
import { AuthUser } from "../../interfaces/AuthUser.interface";

const GlobalAuthProvider = ({ children }) => {
  const dispatch = useAppDispatch();
  const {data, refetch} = useAuthMeQuery();
  const { user: auth0User, getAccessTokenSilently } = useAuth0();
  const { user: authUser, isAuth }: AuthUser  = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (auth0User) {
      getAccessTokenSilently().then((res) => {
        dispatch(setTokens({ accessToken: res })).then(() => {
          refetch()
        });
      })
    }
  }, [auth0User]);

  return (
    <GlobalAuthContext.Provider value={{user: authUser, isAuth}}>
      {children}
    </GlobalAuthContext.Provider>
  );
};
export default GlobalAuthProvider;
