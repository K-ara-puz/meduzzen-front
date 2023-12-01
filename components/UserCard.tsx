import CustomBtn from "./CustomBtn";
import SampleUserAvatar from "@/public/user-sample-avatar.png";
import Image from "next/image";

export const UserCard = () => {
  return (
    <div className="bg-slate-300 max-w-xs flex flex-col gap-5 text-center">
      <Image src={SampleUserAvatar} alt="User backgroud" className="w-full" />
      <div>full name</div>
      <CustomBtn title="Go to profile" btnState="success" />
    </div>
  );
};
