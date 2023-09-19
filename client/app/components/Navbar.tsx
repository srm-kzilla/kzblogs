"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { PenSquare } from "lucide-react";

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <div className="shadow-box p-2 font-body flex flex-row items-center">
      <div className="flex flex-row items-center gap-5">
        <Image src={"logo.svg"} alt={"logo"} width={32} height={32} />
        <h1 className="text-4xl mt-2 font-extrabold bg-gradient-to-r from-kz-highlightd via-kz-highlightl to-kz-secondary bg-clip-text text-transparent">
          KZBlogs
        </h1>
        <button
          className="absolute w-10 h-10 right-1 top-6 cursor-pointer lg:hidden"
          type="button"
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          <Image src="menu.svg" alt="Menu" width={32} height={32} />
        </button>
      </div>
      <div
        className={
          "lg:flex flex-grow justify-center text-kz-secondary lg:gap-6" +
          (navbarOpen ? " flex flex-col" : " hidden")
        }
      >
        <Link
          href="/"
          className="active:text-kz-highlightl hover:text-kz-highlightl"
        >
          Home
        </Link>
        <Link
          href="/explore"
          className="active:text-kz-highlightl hover:text-kz-highlightl"
        >
          Explore
        </Link>
        <Link
          href="/bookmarks"
          className="active:text-kz-highlightl hover:text-kz-highlightl"
        >
          Bookmarks
        </Link>
      </div>
      <div
        className={
          "lg:flex text-kz-secondary lg:gap-6 mr-4" +
          (navbarOpen ? " flex flex-col" : " hidden")
        }
      >
        <Link
          href="/write"
          className=" flex flex-row gap-3 items-center px-3 py-1 rounded-lg bg-[#3AA39B] text-kz-secondary hover:text-[#3AA39B] hover:bg-kz-secondary"
        >
          <PenSquare />
          Write
        </Link>
        <Link
          href="/signin"
          className="px-3 py-1 rounded-lg bg-[#3AA39B] text-kz-secondary active:text-[#3AA39B] hover:text-[#3AA39B] hover:bg-kz-secondary"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
