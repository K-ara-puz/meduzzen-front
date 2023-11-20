"use client";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { setAuthDataFromAuth0 } from "../../../store/slices/authSlice";
import { useAppDispatch } from "../../../store/hooks";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAuth0();
  useEffect(() => {
    if (user) {
      dispatch(setAuthDataFromAuth0(user));
      router.push('/')
    }
  })
  return <div></div>
}
