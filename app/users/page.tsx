"use client";
import { UserCard } from "@/components/UserCard";
import isAuth from "../../utils/checkUserAuthentication";
import { useGetUsersQuery, useLazyGetUsersQuery } from "../api/usersApi";
import { CustomPaginator } from "../../components/CustomPaginator";
import { ReactNode, useEffect, useState } from "react";
import { GetUsersProps } from "../../interfaces/GetUsersProps";
import { UserUpdateData } from "../../interfaces/UserUpdateData.interface";

function Home() {
  const [getUsersProps, setPropsForGetUsers] = useState<GetUsersProps>({
    limit: 5,
    page: 1,
  });
  const {data} = useGetUsersQuery({limit: getUsersProps.limit, page: getUsersProps.page})
  const [usersElems, setUsersElems] = useState<Array<ReactNode>>([]);

  const afterClick = async (page: number) => {
    setPropsForGetUsers({ limit: 5, page: page });
  };

  const setUsers = (users: UserUpdateData[]) => {
    const arrayOfObjects = Object.values(users);
    const usersDivs: ReactNode[] = arrayOfObjects.map((el) => (
      <UserCard key={el["id"]} userData={el}></UserCard>
    ));
    setUsersElems(usersDivs);
  };

  useEffect(() => {
    if (data) {
      setUsers(data.detail['items'])
    }
    
  }, [data]);

  return (
    <div className="p-5 w-full">
      {usersElems && (
        <div className="grid grid-cols-3 md:grid-cols-5 mx-auto max-w-[1200px] gap-10">
          {usersElems}
        </div>
      )}
      <div className="my-5 flex items-center justify-center">
        {data && (
          <CustomPaginator
            limit={getUsersProps.limit}
            totalItems={data.detail["totalItemsCount"]}
            onClick={afterClick}
          />
        )}
      </div>
    </div>
  );
}
export default isAuth(Home);
