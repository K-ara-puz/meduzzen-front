"use client";
import Image from "next/image";
import UserBgImage from "@/public/v-avatar.webp";
import { useParams } from "next/navigation";
import { useGetUserByIdQuery } from "../../api/usersApi";
import CustomBtn from "../../../components/CustomBtn";
import { useState } from "react";
import BasicPopup from "../../../components/popups/BasicPopup";
import { AddInviteForm } from "../../../components/forms/AddInviteForm";
import { useSendInviteToUserMutation } from "../../api/companyApi";
import { toast } from "react-toastify";

function Home() {
  const { id } = useParams();
  const userId = id as string
  const { data: user } = useGetUserByIdQuery(id.toString());
  const [isWarningPopupOpen, setWarningPopupState] = useState<boolean>(false);
  const [sendInviteToUser] = useSendInviteToUserMutation();

  const addInvite = (companyId: string) => {
    sendInviteToUser({ companyId, targetUserId: userId })
      .unwrap()
      .then(() => {
        setWarningPopupState(false);
        toast("your invite was send", { autoClose: 2000, type: "success" });
      })
      .catch((error) => {
        toast(error.data.message, { autoClose: 2000, type: "error" });
      });
  };

  return (
    <div>
      {user ? (
        <div className="py-5 relative max-w-[1000px] mx-auto">
          <Image
            src={UserBgImage}
            className="w-11/12 relative z-10 mx-auto rounded-lg"
            alt="User background"
          />
          <div className="bg-white gap-10 flex flex-col justify-between absolute left-1/2 -translate-x-1/2 w-10/12 z-20 mx-auto rounded-lg -mt-36">
            <div className="p-5 flex gap-5 justify-between">
              <div className="flex flex-col md:flex md:flex-row gap-5">
                {user.detail["avatar"] ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}/${user.detail["avatar"]}`}
                    className="w-20 h-20 relative rounded-full"
                    alt="User backgroud"
                  />
                ) : (
                  <div className="w-20 h-20 relative rounded-full after:content-['U'] after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:text-4xl after:text-gray-500 after:-translate-y-1/2 after:absolute bg-gray-300"></div>
                )}
                <div className="">
                  <div className="font-bold text-lg mb-1">
                    {user.detail["firstName"]}{" "}
                    {user.detail.lastName != "null"
                      ? user.detail.lastName
                      : null}
                  </div>
                  <div className="text-slate-500">{user.detail["email"]}</div>
                </div>
              </div>
            </div>
            <div>
              <CustomBtn
                title="Invite to company"
                btnState="success"
                clickHandler={() => setWarningPopupState(true)}
              />
            </div>
          </div>
        </div>
      ) : null}
      <BasicPopup
        shouldShow={isWarningPopupOpen}
        title=""
        onRequestClose={() => setWarningPopupState(false)}
      >
        <AddInviteForm handleSubmit={addInvite} />
      </BasicPopup>
    </div>
  );
}
export default Home;
