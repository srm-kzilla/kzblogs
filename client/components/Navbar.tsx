import Link from "next/link";
import { useState } from "react";
const Navbar = () => {
  return (
    <div className="h- w-screen flex flex-row align-middle px-0.5 py-0 shadow-box-shadow">
      <div className="h-20% w-20%">
        <img
          src="logo.svg"
          alt="KZBlogs Logo"
          className=" h-20 w-15 mx-1 sm:h-30 "
        />
      </div>
      <div className=" ml-auto font-medium text-lg  text-white flex sm:flex-col sm:text-xs ">
        <ul className="flex p-1 mx-0 my-5">
          <li className="mx-5 my-2 sm:mx-1 hover:text-kz-orange  transition-all duration-500">
            <Link href="/">Home</Link>
          </li>
          <li className="mx-5 my-2 sm:mx-1 hover:text-kz-orange  transition-all duration-500">
            <Link href="/explore">Explore</Link>
          </li>
          <li className="mx-5 my-2 sm:mx-1 hover:text-kz-orange  transition-all duration-500">
            <Link href="/create">Create</Link>
          </li>
          <li className="mx-5 my-2 sm:mx-1">
            <Link
              href="/signup"
              className="p-3 rounded-3xl border border-kz-orange border-solid text-kz-orange box-border hover:text-[#ffffff] hover:border-[#ffffff] hover:bg-[#FF5F5F] transition-all duration-500 "
            >
              Sign up/Login
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
