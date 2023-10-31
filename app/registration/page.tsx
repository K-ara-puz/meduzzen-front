"use client";
import BasicPopup from "@/components/BasicPopup";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
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
        title="Registration"
        onRequestClose={() => closePopup()}
      >
        <RegistrationForm></RegistrationForm>
      </BasicPopup>
    </main>
  );
}
