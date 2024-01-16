"use client";
import Image from "next/image";
import UserBgImage from "@/public/v-avatar.webp";
import { useParams } from "next/navigation";
import { useGetUserByIdQuery } from "../../api/usersApi";
import CustomBtn from "../../../components/CustomBtn";
import { useEffect, useState } from "react";
import BasicPopup from "../../../components/popups/BasicPopup";
import { AddInviteForm } from "../../../components/forms/AddInviteForm";
import { useSendInviteToUserMutation } from "../../api/companyApi";
import { useGetUserScoreInAppQuery } from "@/app/api/userAnaliticApi";
import { StarRating } from "@/components/StarRating";

function Home() {
  const { id } = useParams();
  const userId = id as string;
  const { data: user } = useGetUserByIdQuery(userId);
  const { data: userScore } = useGetUserScoreInAppQuery(userId);
  const [isWarningPopupOpen, setWarningPopupState] = useState<boolean>(false);
  const [sendInviteToUser] = useSendInviteToUserMutation();
  const [rating, setRating] = useState(0);
  const [starRating, setStarRating] = useState(0);

  const addInvite = (companyId: string) => {
    sendInviteToUser({ companyId, targetUserId: userId }).then(() =>
      setWarningPopupState(false)
    );
  };

  useEffect(() => {
    if (userScore?.detail) {
      if (
        !userScore.detail.rightQuestionsCount ||
        userScore.detail.rightQuestionsCount == 0
      ) {
        setRating(0);
        return;
      }
      let rating = +(
        userScore.detail.rightQuestionsCount /
        userScore.detail.allQuestionsCount
      ).toFixed(2);
      setRating(rating);
      setStarRating(rating * 5);
    }
  }, [userScore]);

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
            <div className="p-5 flex flex-col sm:flex-row gap-5 justify-between">
              <div className="flex flex-col md:flex-row gap-5">
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
              <StarRating rating={rating} starRating={starRating} />
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
