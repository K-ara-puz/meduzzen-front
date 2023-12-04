"use client";
import isAuth from "../../utils/checkUserAuthentication";
import Image from "next/image";
import UserBgImage from "@/public/v-avatar.webp";
import CustomBtn from "@/components/CustomBtn";
import { useContext, useState } from "react";
import ReduxUserDataEditForm from "@/components/forms/ReduxUserDataEditForm";
import { GlobalAuthContext } from "@/components/providers/GlobalAuthProviderContext";
import { AuthUser } from "@/interfaces/AuthUser.interface";
import {
  useChangeUserAvatarMutation,
  useDeleteUserAccountMutation,
  useUpdateUserMutation,
} from "../api/authApi";
import BasicPopup from "../../components/popups/BasicPopup";
import { useRouter } from "next/navigation";
import { UserUpdateData } from "../../interfaces/UserUpdateData.interface";

function Home() {
  const router = useRouter();
  const authData: AuthUser = useContext(GlobalAuthContext);
  const [isEditPanelOpen, setEditPanelOpenState] = useState<boolean>(false);
  const [updateUser] = useUpdateUserMutation();
  const [changeUserAvatar] = useChangeUserAvatarMutation();
  const [isDeleteAccPopupOpen, setDeleteAccPopupDisplay] = useState<boolean>(false);
  const [deleteUserAccount] = useDeleteUserAccountMutation();

  const setUserAvatar = async (event) => {
    await changeUserAvatar({
      image: event.target.files[0],
      userId: authData.user.id,
    });
  };

  const deleteUser = async () => {
    await deleteUserAccount(authData.user.id);
    router.push("/")
  }

  const handleSubmit = (userData: Partial<UserUpdateData>) => {
    updateUser({ body: { ...userData }, userId: authData.user.id });
    setEditPanelOpenState(false);
  };
  return (
    <div className="py-5 relative">
      <Image
        src={UserBgImage}
        className="w-11/12 relative z-10 mx-auto rounded-lg"
        alt="User backgroud"
      />
      <div className="bg-white gap-10 flex flex-col justify-between absolute left-1/2 -translate-x-1/2 w-10/12 z-20 mx-auto rounded-lg -mt-36">
        <div className="p-5 flex gap-5 justify-between">
          <div className="gap-5 flex flex-col justify-between md:flex md:flex-row w-full overflow-hidden">
            <div className="flex flex-col md:flex md:flex-row gap-5">
              {authData.user.avatar ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}/${authData.user.avatar}`}
                  className="w-20 h-20 relative rounded-full"
                  alt="User backgroud"
                />
              ) : (
                <div className="w-20 h-20 relative rounded-full after:content-['U'] after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:text-4xl after:text-gray-500 after:-translate-y-1/2 after:absolute bg-gray-300"></div>
              )}
              <div className="">
                <div className="font-bold text-lg mb-1">
                  {authData.user.firstName} {authData.user.lastName}
                </div>
                <div className="text-slate-500">{authData.user.email}</div>
                <p>Change user avatar:</p>
                <input
                  type="file"
                  className="text-xs md:text-lg"
                  onChange={setUserAvatar}
                />
              </div>
            </div>
            <div className="flex gap-2 mt-2 self-start items-center">
              <CustomBtn
                clickHandler={() => setEditPanelOpenState(true)}
                title="Edit user info"
                btnState="gray"
              />
            </div>
          </div>
        </div>
        <div className="max-w-[800px] mx-auto w-full">
          {isEditPanelOpen && (
            <div className="editPanel w-full max-w-[80%] mx-auto mb-10">
              <ReduxUserDataEditForm onSubmit={handleSubmit} />
            </div>
          )}
          <div className="flex gap-5 m-2">
            <CustomBtn title="Change password"  btnState="error" />
            <CustomBtn title="Delete user account" clickHandler={() => setDeleteAccPopupDisplay(true)} btnState="error"  />
          </div>
        </div>
      </div>
      <BasicPopup
        shouldShow={isDeleteAccPopupOpen}
        title=""
        onRequestClose={() => setDeleteAccPopupDisplay(false)}
      >
        <div>
          <p className="text-center font-bold mb-5">Are you sure you want to delete your account?</p>
          <div className="flex gap-5">
            <CustomBtn title="Cancel" clickHandler={() => setDeleteAccPopupDisplay(false)} btnState="success"/>
            <CustomBtn title="Delete" clickHandler={() => deleteUser()} btnState="error"/>
          </div>
        </div>
      </BasicPopup>
    </div>
  );
}
export default isAuth(Home);
