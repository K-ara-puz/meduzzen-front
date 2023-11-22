"use client";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { setTokens } from "../../../store/slices/authSlice";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    if (user) {
      getAccessTokenSilently().then(async (res) => {
        dispatch(setTokens({accessToken: res}))
      });
      router.push('/')
    }
  })
  return <div></div>
}
