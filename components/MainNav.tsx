import Link from "next/link";

const MainNav = () => {
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
    <Link href="/api/auth/signin" className="underline">
      Login
    </Link>
    <Link href="/registration" className="underline">
      Register
    </Link>
  </nav>
  )
};
export default MainNav;
