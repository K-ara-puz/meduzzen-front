"use client";
import BasicPopup from "@/components/popups/BasicPopup";
import { LoginForm } from "@/components/forms/LoginForm";
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
        title="Login"
        onRequestClose={() => closePopup()}
      >
        <LoginForm/>
      </BasicPopup>
    </main>
  );
}
