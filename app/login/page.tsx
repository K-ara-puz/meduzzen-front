"use client";
import BasicPopup from "@/components/popups/BasicPopup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReduxLoginForm from "../../components/forms/ReduxLoginForm";
import { useAppDispatch } from "../../store/hooks";
import { loginUser } from "../../store/slices/authSlice";
import { UserRegisterData } from "../../interfaces/RegisterData.interface";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isPopupOpen, setPopupDisplay] = useState<boolean>(true);

  const closePopup = () => {
    setPopupDisplay(false);
    router.back();
  };
  const handleSubmit = async (values: Partial<UserRegisterData>) => {
    await dispatch(loginUser(values));
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
