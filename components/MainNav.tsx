'use client'
import Link from "next/link";
import { useAppSelector } from "../store/hooks";

const MainNav = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <nav className="bg-red-500 w-w p-5 mb-4 flex justify-between flex-wrap">
      <Link href="/about" className="underline">
        About
      </Link>
      <Link href="/profile" className="underline">
        Profile
      </Link>
      <Link href="/users" className="underline">
        Users
      </Link>
      <Link href="/companies" className="underline">
        Companies
      </Link>
      {Object.keys(user).length < 1 && (
        <Link href="/login" className="underline">
          Login
        </Link>
      )}
      {Object.keys(user).length < 1 && (
        <Link href="/registration" className="underline">
          Register
        </Link>
      )}
    </nav>
  );
};
export default MainNav;
