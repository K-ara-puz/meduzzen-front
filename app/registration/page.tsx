"use client";
import BasicPopup from "@/components/BasicPopup";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isPopupOpen, setPopupDisplay] = useState<boolean>(true);

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
        <RegistrationForm/>
      </BasicPopup>
    </main>
  );
}
