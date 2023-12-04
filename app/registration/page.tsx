"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReduxRegisterForm from "../../components/forms/ReduxRegisterForm";
import BasicPopup from "../../components/popups/BasicPopup";
import { UserRegisterData } from "../../interfaces/RegisterData.interface";
import { useRegisterUserMutation } from "../api/authApi";

export default function Home() {
  const router = useRouter();
  const [isPopupOpen, setPopupDisplay] = useState<boolean>(true);
  const [registerUser, { isError: addError }] = useRegisterUserMutation();

  const handleSubmit = async (values: UserRegisterData) => {
    const res = await registerUser(values);
    if (res['error']) {
      alert(res['error'].data.message)
    }
    router.push(`/login`);
  };
  const closePopup = () => {
    setPopupDisplay(false);
    router.back();
  };

  return (
    <div>
      <BasicPopup
        shouldShow={isPopupOpen}
        title="Registration"
        onRequestClose={() => closePopup()}
      >
        <ReduxRegisterForm onSubmit={handleSubmit}/>
      </BasicPopup>
    </div>
  )
}
