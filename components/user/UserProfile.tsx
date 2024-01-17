import Image from "next/image";
import CustomBtn from "../CustomBtn";
import ReduxUserDataEditForm from "../forms/ReduxUserDataEditForm";
import BasicPopup from "../popups/BasicPopup";
import { CommonWarningForm } from "../forms/CommonWarningForm";
import { AuthUser } from "@/interfaces/AuthUser.interface";
import { useContext, useEffect, useState } from "react";
import { GlobalAuthContext } from "../providers/GlobalAuthProviderContext";
import {
  useChangeUserAvatarMutation,
  useDeleteUserAccountMutation,
  useUpdateUserMutation,
} from "@/app/api/authApi";
import { useAuth0 } from "@auth0/auth0-react";
import { UserUpdateData } from "@/interfaces/UserUpdateData.interface";
import UserBgImage from "@/public/v-avatar.webp";
import { UserAnalitics } from "./analitics/UserAnalitics";
import { useGetUserScoreInAppQuery } from "@/app/api/userAnaliticApi";
import { StarRating } from "../StarRating";
import { UserProfileMainTabs } from "@/utils/constants";
import { UserQuizzes } from "./quizzes/UserQuizzes";
import { CompaniesWhereIMember } from "../companies/CompaniesWhereIMember";
import { UserDataExportForm } from "../forms/UserDataExportForm";

export const UserProfile = () => {
  interface IInitState {
    isDeleteAccPopupOpen: boolean;
    isDataExportPopupOpen: boolean;
    mainTabsState: string;
    rating: number;
    starRating: number;
  }
  const initState = {
    isDeleteAccPopupOpen: false,
    isDataExportPopupOpen: false,
    mainTabsState: UserProfileMainTabs.analitics,
    rating: 0,
    starRating: 0,
  };
  const [state, setState] = useState<IInitState>(initState);
  const authData: AuthUser = useContext(GlobalAuthContext);

  const [updateUser] = useUpdateUserMutation();
  const [changeUserAvatar] = useChangeUserAvatarMutation();
  const [deleteUserAccount] = useDeleteUserAccountMutation();
  const { data: userScore } = useGetUserScoreInAppQuery(authData.user.id);
  const { logout } = useAuth0();

  useEffect(() => {
    if (userScore?.detail) {
      if (
        !userScore.detail.rightQuestionsCount ||
        userScore.detail.rightQuestionsCount == 0
      ) {
        setState({ ...state, rating: 0 });
        return;
      }
      let rating = +(
        userScore.detail.rightQuestionsCount /
        userScore.detail.allQuestionsCount
      ).toFixed(2);
      setState({
        ...state,
        rating,
        starRating: rating * 5,
      });
    }
  }, [userScore]);

  const setUserAvatar = async (event) => {
    await changeUserAvatar({
      image: event.target.files[0],
      userId: authData.user.id,
    });
  };

  const deleteUser = async () => {
    await deleteUserAccount(authData.user.id);
    await logout();
  };

  const handleSubmit = (userData: Partial<UserUpdateData>) => {
    updateUser({ body: { ...userData }, userId: authData.user.id });
    setState({ ...state, mainTabsState: UserProfileMainTabs.analitics });
  };
  return (
    <div className="py-5 mb-10 relative max-w-[1000px] mx-auto">
      <Image
        src={UserBgImage}
        className="w-11/12 relative z-10 mx-auto rounded-lg"
        alt="User backgroud"
      />
      <div className="bg-white mb-10 gap-10 flex flex-col justify-between absolute left-1/2 -translate-x-1/2 w-10/12 z-20 mx-auto rounded-lg -mt-36">
        <div className="p-5 flex gap-5 justify-between">
          <div className="gap-5 flex-wrap flex flex-col justify-between md:flex md:flex-row w-full overflow-hidden">
            <div className="user-avatar flex flex-col md:flex md:flex-row gap-5">
              {authData.user.avatar ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}/${authData.user.avatar}`}
                  className="w-20 h-20 relative rounded-full"
                  alt="User backgroud"
                />
              ) : (
                <div className="w-20 h-20 relative rounded-full after:content-['U'] after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:text-4xl after:text-gray-500 after:-translate-y-1/2 after:absolute bg-gray-300"></div>
              )}
              <div className="user-info">
                <div className="font-bold text-lg mb-1">
                  {authData.user.firstName}{" "}
                  {authData.user.lastName != "null"
                    ? authData.user.lastName
                    : null}
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
            <StarRating rating={state.rating} starRating={state.starRating} />
            <NavPanel
              mainTab={state.mainTabsState}
              showEditUserDataForm={() =>
                setState({
                  ...state,
                  mainTabsState: UserProfileMainTabs.editUserInfo,
                })
              }
              showAnalitics={() =>
                setState({
                  ...state,
                  mainTabsState: UserProfileMainTabs.analitics,
                })
              }
              showQuizzes={() =>
                setState({
                  ...state,
                  mainTabsState: UserProfileMainTabs.quizzes,
                })
              }
              showCompanies={() =>
                setState({
                  ...state,
                  mainTabsState: UserProfileMainTabs.companies,
                })
              }
              showDataExportPopup={() =>
                setState({
                  ...state,
                  isDataExportPopupOpen: true,
                })
              }
            />
          </div>
        </div>
        <div className="max-w-[800px] mx-auto w-full">
          <div className="w-full max-w-[90%] mx-auto mb-10">
            <MakeContent
              mainTabsState={state.mainTabsState}
              editUserData={handleSubmit}
            ></MakeContent>
          </div>
          <div className="flex gap-5 m-2">
            <CustomBtn title="Change password" btnState="error" />
            <CustomBtn
              title="Delete user account"
              clickHandler={() =>
                setState({ ...state, isDeleteAccPopupOpen: true })
              }
              btnState="error"
            />
          </div>
        </div>
      </div>
      <BasicPopup
        shouldShow={state.isDeleteAccPopupOpen}
        title=""
        onRequestClose={() =>
          setState({ ...state, isDeleteAccPopupOpen: false })
        }
      >
        <CommonWarningForm
          title="Are you sure you want to delete your account?"
          apply={deleteUser}
          cancel={() => setState({ ...state, isDeleteAccPopupOpen: false })}
        />
      </BasicPopup>
      <BasicPopup
        shouldShow={state.isDataExportPopupOpen}
        title="Data Export"
        onRequestClose={() =>
          setState({ ...state, isDataExportPopupOpen: false })
        }
      >
        <UserDataExportForm
          closeForm={() => setState({ ...state, isDataExportPopupOpen: false })}
        />
      </BasicPopup>
    </div>
  );
};

interface NavPanelProps {
  showEditUserDataForm: () => void;
  showAnalitics: () => void;
  showQuizzes: () => void;
  showCompanies: () => void;
  showDataExportPopup: () => void;
  mainTab: string;
}

const NavPanel = (props: NavPanelProps) => {
  return (
    <div className="grid grid-cols-2 min-[500px]:grid-cols-3 gap-2 mt-2 self-start items-center">
      <CustomBtn
        clickHandler={props.showEditUserDataForm}
        title="Edit user info"
        btnState="gray"
        activeBtn={props.mainTab === UserProfileMainTabs.editUserInfo}
      />
      <CustomBtn
        clickHandler={props.showAnalitics}
        title="Analitics"
        btnState="gray"
        activeBtn={props.mainTab === UserProfileMainTabs.analitics}
      />
      <CustomBtn
        clickHandler={props.showQuizzes}
        title="Quizzes"
        btnState="gray"
        activeBtn={props.mainTab === UserProfileMainTabs.quizzes}
      />
      <CustomBtn
        clickHandler={props.showCompanies}
        title="Companies"
        btnState="gray"
        activeBtn={props.mainTab === UserProfileMainTabs.companies}
      />
      <CustomBtn
        clickHandler={props.showDataExportPopup}
        title="Data Export"
        btnState="gray"
      />
    </div>
  );
};

interface MakeContentProps {
  mainTabsState: string;
  editUserData: (userData: Partial<UserUpdateData>) => void;
}

const MakeContent = ({ mainTabsState, editUserData }: MakeContentProps) => {
  switch (mainTabsState) {
    case UserProfileMainTabs.analitics:
      return <UserAnalitics />;
    case UserProfileMainTabs.editUserInfo:
      return <ReduxUserDataEditForm onSubmit={editUserData} />;
    case UserProfileMainTabs.quizzes:
      return <UserQuizzes />;
    case UserProfileMainTabs.companies:
      return <CompaniesWhereIMember />;
  }
};
