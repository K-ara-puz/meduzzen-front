"use client";
import { UserCard } from "@/components/UserCard";
import isAuth from "../../utils/checkUserAuthentication";
import { useLazyGetUsersQuery } from "../api/usersApi";
import { CustomPaginator } from "../../components/CustomPaginator";
import { ReactNode, useEffect, useState } from "react";
import { GetUsersProps } from "../../interfaces/GetUsersProps";
import { UserUpdateData } from "../../interfaces/UserUpdateData.interface";

function Home() {
  const [getUsersProps, setPropsForGetUsers] = useState<GetUsersProps>({
    limit: 5,
    page: 1,
  });
  const [trigger, result] = useLazyGetUsersQuery();
  const [usersElems, setUsersElems] = useState<Array<ReactNode>>([]);

  const afterClick = async (page: number) => {
    setPropsForGetUsers({ limit: 5, page: page });
    trigger({ limit: getUsersProps.limit, page }).then((res) =>
      setUsers(res.data.detail["users"])
    );
  };

  const setUsers = (users: Array<UserUpdateData>) => {
    const arrayOfObjects = Object.values(users);
    const usersDivs: ReactNode[] = arrayOfObjects.map((el) => (
      <UserCard key={el["id"]} userData={el}></UserCard>
    ));
    setUsersElems(usersDivs);
  };

  useEffect(() => {
    trigger({ limit: getUsersProps.limit, page: getUsersProps.page }).then(
      (res) => setUsers(res.data.detail["users"])
    );
  }, []);

  return (
    <div className="p-5 w-full">
      {usersElems && (
        <div className="grid grid-cols-3 md:grid-cols-5 mx-auto max-w-[1200px] gap-10">
          {usersElems}
        </div>
      )}
      <div className="my-5 flex items-center justify-center">
        {result.isSuccess && (
          <CustomPaginator
            limit={getUsersProps.limit}
            totalItems={result.data.detail["totalItemsCount"]}
            onClick={afterClick}
          />
        )}
      </div>
    </div>
  );
}
export default isAuth(Home);
