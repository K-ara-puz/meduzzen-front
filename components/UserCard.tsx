import { useParams, useRouter } from "next/navigation";
import CustomBtn from "./CustomBtn";
import { useContext } from "react";
import { GlobalAuthContext } from "./providers/GlobalAuthProviderContext";
import { User } from "../interfaces/User.interface";
import { CompanyMemberRoles } from "../utils/constants";
import { useGetMyCompanyMemberQuery } from "../app/api/companyApi";

interface UserCardProps {
  userData: Partial<User>;
  role?: string;
  authUserRole?: string;
  companyMember?: boolean;
  companyId?: string;
  deleteMember?: (userId: string) => void;
  addRole?: () => void;
  lastQuizPassDate?: string;
}

export const UserCard = (props: UserCardProps) => {
  const router = useRouter();
  const params = useParams();
  const authUser = useContext(GlobalAuthContext);
  const { data: companyMember, refetch } = useGetMyCompanyMemberQuery(
    params.id as string
  );

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
            <span className="font-bold">Name:</span> {props.userData.firstName} {" "}
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
          {props.lastQuizPassDate && (
            <div>
              <span className="font-bold">LastQuizPass:</span> {new Date(props.lastQuizPassDate).toDateString()}
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
        {companyMember?.detail.role === CompanyMemberRoles.owner ? (
          <MakeBtnsForDifferentMemberRoles
            authUserRole={CompanyMemberRoles.owner}
            userRole={props.role}
            userId={props.userData.id}
            authUserId={authUser.user["id"]}
            addRole={props.addRole}
          />
        ) : companyMember?.detail.role === CompanyMemberRoles.admin ? (
          <MakeBtnsForDifferentMemberRoles
            authUserRole={CompanyMemberRoles.admin}
            userRole={props.role}
            userId={props.userData.id}
            authUserId={authUser.user["id"]}
          />
        ) : (
          <MakeBtnsForDifferentMemberRoles
            authUserRole={CompanyMemberRoles.simpleUser}
            userRole={props.role}
            userId={props.userData.id}
            authUserId={authUser.user["id"]}
          />
        )}
      </div>
    </div>
  );
};

interface MakeBtnsForDifferentMemberRolesProps {
  authUserRole: string;
  authUserId: string;
  userRole: string;
  userId: string;
  addRole?: () => void;
}

const MakeBtnsForDifferentMemberRoles = (
  props: MakeBtnsForDifferentMemberRolesProps
) => {
  switch (props.authUserRole) {
    case CompanyMemberRoles.owner:
      return (
        <div>
          {props.authUserId != props.userId && (
            <div className="flex flex-col gap-1">
              <CustomBtn
                title="Delete member"
                btnState="error"
                clickHandler={() => {}}
              />
              <CustomBtn
                title="Role"
                btnState="gray"
                clickHandler={props.addRole}
              />
            </div>
          )}
        </div>
      );
    case CompanyMemberRoles.admin:
      return (
        <div>
          {props.authUserId != props.userId &&
            props.userRole === CompanyMemberRoles.simpleUser && (
              <div className="flex flex-col gap-1">
                <CustomBtn
                  title="Delete member"
                  btnState="error"
                  clickHandler={() => {}}
                />
              </div>
            )}
        </div>
      );
  }
};
