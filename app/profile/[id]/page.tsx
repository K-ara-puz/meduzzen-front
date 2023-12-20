"use client";
import Image from "next/image";
import UserBgImage from "@/public/v-avatar.webp";
import { useParams } from "next/navigation";
import { useGetUserByIdQuery } from "../../api/usersApi";

function Home() {
  const { id } = useParams();
  const { data: user } = useGetUserByIdQuery(id.toString());

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
                    {user.detail["firstName"]} {user.detail.lastName != 'null' ? user.detail.lastName: null}
                  </div>
                  <div className="text-slate-500">{user.detail["email"]}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default Home;
