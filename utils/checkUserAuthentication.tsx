"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GlobalAuthContext } from "../components/providers/GlobalAuthProviderContext";

export default function isAuth(Component: React.FunctionComponent) {

  return function IsAuth(props) {
    const router = useRouter();
    const authData = useContext(GlobalAuthContext)

    useEffect(() => {
      if (authData.isAuth === false || authData.isAuth === null) {
        router.push("/login");
      }
    }, [authData.isAuth]);

    if (authData.isAuth === true) {
      return <Component {...props} />;
    }
  };
}