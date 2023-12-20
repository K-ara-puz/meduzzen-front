"use client";
import BasicPopup from "@/components/popups/BasicPopup";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import ReduxLoginForm from "../../components/forms/ReduxLoginForm";
import { useAppDispatch } from "../../store/hooks";
import { UserRegisterData } from "../../interfaces/RegisterData.interface";
import { useLoginUserMutation } from "../api/authApi";
import { setTokens } from "../../store/slices/authSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { GlobalAuthContext } from "../../components/providers/GlobalAuthProviderContext";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isPopupOpen, setPopupDisplay] = useState<boolean>(true);
  const [loginUser] = useLoginUserMutation();
  const {logout} = useAuth0();
  const authData = useContext(GlobalAuthContext)
  
  const closePopup = () => {
    setPopupDisplay(false);
    router.back();
  };
  const handleSubmit = async (values: Partial<UserRegisterData>) => {
    const res = await loginUser(values);
    if (res['error']) {
      alert(res['error'].data.message);
      return
    }
    const {accessToken, actionToken, refreshToken, ...user} = res['data'].detail
    await dispatch(setTokens({accessToken}));
    await logout();
  };

  useEffect(() => {
    if (authData.isAuth == true) {
      router.back()
    }
  }, [authData])

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
