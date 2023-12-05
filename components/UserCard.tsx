import { useRouter } from "next/navigation";
import CustomBtn from "./CustomBtn";
import { useContext } from "react";
import { GlobalAuthContext } from "./providers/GlobalAuthProviderContext";

export const UserCard = (props) => {
  const router = useRouter();
  const authUser = useContext(GlobalAuthContext);

  const goToProfile = () => {
    router.push(`/profile/${props.userData.id}`);
  };
  const goToMyProfile = () => {
    router.push(`/profile`);
  };

  return (
    <div className="bg-slate-300 max-w-xs flex flex-col gap-5 text-center">
      <div className="flex-auto">
        {props.userData.avatar ? (
          <div className="w-full h-36 relative">
            <img
              src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}/${props.userData.avatar}`}
              className="absolute object-cover h-full w-full"
              alt="User backgroud"
            />
          </div>
        ) : (
          <div className="w-full h-36 relative after:content-['U'] after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:text-4xl after:text-gray-00 after:-translate-y-1/2 after:absolute bg-blue-300"></div>
        )}
        <div>
          {props.userData.firstName} {props.userData.lastName}
        </div>
      </div>
      {authUser.user["id"] == props.userData.id ? (
        <CustomBtn
          title="My profile"
          btnState="gray"
          clickHandler={goToMyProfile}
        />
      ) : (
        <CustomBtn
          title="Go to profile"
          btnState="success"
          clickHandler={goToProfile}
        />
      )}
    </div>
  );
};
