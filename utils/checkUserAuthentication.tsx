"use client";
import { useEffect } from "react";
import { useAppSelector } from "../store/hooks";
import { useRouter } from "next/navigation";

export default function isAuth(Component: any) {

  return function IsAuth(props: any) {
    const router = useRouter();
    const { user } = useAppSelector((state) => state.auth);
    let auth = false;
    useEffect(() => {
      if (Object.keys(user).length > 0) {
        auth = true;
      }
      if (!auth) {
        return router.push("/login");
      }
    })

    return <Component {...props} />;
  };
}