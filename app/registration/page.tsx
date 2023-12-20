"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReduxRegisterForm from "../../components/forms/ReduxRegisterForm";
import BasicPopup from "../../components/popups/BasicPopup";
import { UserRegisterData } from "../../interfaces/RegisterData.interface";
import { useRegisterUserMutation } from "../api/authApi";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();
  const [isPopupOpen, setPopupDisplay] = useState<boolean>(true);
  const [registerUser, { isError: addError }] = useRegisterUserMutation();

  const handleSubmit = async (values: UserRegisterData) => {
    registerUser(values)
      .unwrap()
      .then(() => {
        router.push(`/login`);
      })
      .catch((error) => {
        toast(error.data.message, { autoClose: 2000, type: "error" });
      });
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
        <ReduxRegisterForm onSubmit={handleSubmit} />
      </BasicPopup>
    </div>
  );
}
