"use client";
import BasicPopup from "@/components/BasicPopup";
import { LoginForm } from "@/components/forms/LoginForm";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const router = useRouter();
  const [isPopupOpen, setPopupDisplay] = React.useState(true);

  const closePopup = () => {
    setPopupDisplay(false);
    router.back();
  };

  return (
    <main>
      <BasicPopup
        shouldShow={isPopupOpen}
        title="Login"
        onRequestClose={() => closePopup()}
      >
        <LoginForm></LoginForm>
      </BasicPopup>
    </main>
  );
}
