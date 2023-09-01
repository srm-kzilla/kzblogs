import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <>
      <div className="h-20 w-screen flex flex-row px-1 py-0 shadow-box-shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center">
          <div className="w-full flex justify-between lg:w-auto">
            <Image
              src="logo.svg"
              alt="Logo"
              width={32}
              height={32}
              className="h-12 w-12 absolute top-5 left-6"
            />
            <Image
              src="KZBlogs.svg"
              alt="KZBlogs"
              width={32}
              height={32}
              className="absolute top-7 left-20 w-32 md:hidden"
            />
            <button
              className="absolute w-10 h-10 right-1 top-6 cursor-pointer lg:hidden"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <Image src="dotsMenu.svg" alt="Menu" width={32} height={32} />
            </button>
          </div>
          <div
            className={"lg:flex flex-grow" + (navbarOpen ? " flex" : " hidden")}
          >
            <ul className="absolute right-4 top-20 lg:top-5 items-end flex flex-col lg:flex-row lg:ml-auto text-white text-xs lg:text-lg">
              <li
                key={1}
                className="mx-1 my-2 md:mx-5 hover:text-kz-lt-purple transition-all duration-500"
              >
                <Link href="/" prefetch>
                  Home
                </Link>
              </li>
              <li
                key={2}
                className="mx-1 my-2 md:mx-5 hover:text-kz-lt-purple transition-all duration-500"
              >
                <Link href="/explore" prefetch>
                  Explore
                </Link>
              </li>
              <li
                key={3}
                className="mx-1 my-2 md:mx-5 hover:text-kz-lt-purple transition-all duration-500"
              >
                <Link href="/create" prefetch>
                  Create
                </Link>
              </li>
              <li key={4} className="mx-1 my-2 md:mx-5">
                <Link
                  href="/signup"
                  prefetch
                  className="md:p-3 rounded-3xl lg:border border-kz-lt-purple border-solid text-kz-lt-purple box-border hover:text-[#ffffff] hover:border-[#ffffff] hover:bg-kz-lt-purple transition-all duration-500 "
                >
                  Sign up/Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
