"use client"
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <nav className="bg-red-500 w-w m-5 p-5 flex justify-between flex-wrap">
        <Link href='/about' className="underline">About</Link>
        <Link href='/profile' className="underline">Profile</Link>
        <Link href='/users' className="underline">Users</Link>
        <Link href='/companies' className="underline">Companies</Link>
        <Link href='/login' className="underline">Login</Link>
        <Link href='/registration' className="underline">Register</Link>
      </nav>
    </main>
  )
}
