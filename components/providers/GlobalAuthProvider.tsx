"use client";
import React, { useEffect } from "react";
import { GlobalAuthContext } from "./GlobalAuthProviderContext";
import { useLazyAuthMeQuery } from "../../app/api/authApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setIsAuth, setTokens } from "../../store/slices/authSlice";
import { AuthUser } from "../../interfaces/AuthUser.interface";

const GlobalAuthProvider = ({ children }) => {
  const dispatch = useAppDispatch();
  const [trigger] = useLazyAuthMeQuery();
  const { user: auth0User, getAccessTokenSilently } = useAuth0();
  const { user: authUser, isAuth }: AuthUser  = useAppSelector((state) => state.auth);
  useEffect(() => {
    trigger({})
    if (auth0User) {
      getAccessTokenSilently().then((res) => {
        dispatch(setTokens({ accessToken: res })).then(() => {
          trigger({})
        });
      })
    }
    if (auth0User === undefined && Object.keys(authUser).length < 1 && isAuth !== false) {
      dispatch(setIsAuth(false))
    }
  }, [auth0User]);

  return (
    <GlobalAuthContext.Provider value={{user: authUser, isAuth}}>
      {children}
    </GlobalAuthContext.Provider>
  );
};
export default GlobalAuthProvider;
