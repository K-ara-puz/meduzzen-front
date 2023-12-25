import { useRouter } from "next/navigation";
import CustomBtn from "./CustomBtn";
import { useContext } from "react";
import { GlobalAuthContext } from "./providers/GlobalAuthProviderContext";
import { User } from "../interfaces/User.interface";

interface UserCardProps {
  userData: Partial<User>;
  role?: string;
  companyMember?: boolean;
  deleteMember?: (userId: string) => void;
  addRole?: () => void;
}

export const UserCard = (props: UserCardProps) => {
  const router = useRouter();
  const authUser = useContext(GlobalAuthContext);

  const goToProfile = () => {
    router.push(`/profile/${props.userData.id}`);
  };
  const goToMyProfile = () => {
    router.push(`/profile`);
  };

  return (
    <div className="bg-slate-300 text-xs max-w-xs flex flex-col gap-5 text-center">
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
        <div className="break-all whitespace-pre-line p-2 text-start">
          <div className="mb-2">
            <span className="font-bold">Name:</span> {props.userData.firstName}{" "}
            {props.userData.lastName != "null" ? props.userData.lastName : null}
          </div>
          <div>
            <span className="font-bold">Email:</span> {props.userData.email}
          </div>
          {props.role && (
            <div>
              <span className="font-bold">Role:</span> {props.role}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1">
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
        {props.companyMember === true &&
          authUser.user["id"] != props.userData.id && (
            <CustomBtn
              title="Delete member"
              btnState="error"
              clickHandler={() => props.deleteMember(props.userData.id)}
            />
          )}
        {props.addRole && authUser.user["id"] != props.userData.id && (
          <CustomBtn
            title="Role"
            btnState="gray"
            clickHandler={props.addRole}
          />
        )}
      </div>
    </div>
  );
};
