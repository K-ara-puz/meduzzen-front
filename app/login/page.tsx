"use client";
import BasicPopup from "@/components/popups/BasicPopup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReduxLoginForm from "../../components/forms/ReduxLoginForm";
import { useLoginUserMutation } from "../api/api";
import { useAppDispatch } from "../../store/hooks";
import { setAuthData } from "../../store/slices/authSlice";
import { UserRegisterData } from "../../interfaces/RegisterData.interface";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isPopupOpen, setPopupDisplay] = useState<boolean>(true);
  const [loginUser, { isError: addError }] = useLoginUserMutation();

  const closePopup = () => {
    setPopupDisplay(false);
    router.back();
  };
  const handleSubmit = async (values: Partial<UserRegisterData>) => {
    const user = await loginUser(values);
    dispatch(setAuthData(user))
    router.push(`/`);
  };

  return (
    <main>
      <BasicPopup
        shouldShow={isPopupOpen}
        title="Login"
        onRequestClose={() => closePopup()}
      >
        <ReduxLoginForm onSubmit={handleSubmit}/>
      </BasicPopup>
    </main>
  );
}
