"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { PenSquare } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const menuItems = [
  { path: "/", name: "Home" },
  { path: "/explore", name: "Explore" },
  { path: "/bookmarks", name: "Bookmarks" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { data, status } = useSession();
  const loggedIn = status === "authenticated";
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="shadow-box p-2 font-body flex lg:flex-row flex-col lg:items-center">
      <div className="flex flex-row items-center gap-5">
        <Image src="/logo.svg" alt="logo" width={32} height={32} />
        <h1 className="text-4xl mt-2 font-extrabold bg-gradient-to-r from-kz-highlight-dark via-kz-highlight-light to-kz-secondary bg-clip-text text-transparent">
          KZBlogs
        </h1>
      </div>
      <button
        className="absolute w-10 h-10 right-1 top-6 cursor-pointer lg:hidden"
        type="button"
        onClick={() => setNavbarOpen((prevState) => !prevState)}
      >
        <Image src="/menu.svg" alt="Menu" width={32} height={32} />
      </button>
      <div
        className={`lg:flex flex-grow justify-center items-center text-kz-secondary lg:gap-6 ${
          navbarOpen ? "flex flex-col items-end" : "hidden"
        }`}
      >
        {menuItems.map(({ path, name }) => (
          <Link
            key={path}
            href={path}
            className={`${
              pathname === path
                ? "text-kz-highlight-light"
                : "text-kz-secondary"
            } hover:text-kz-highlight-light`}
          >
            {name}
          </Link>
        ))}
      </div>
      <div
        className={`lg:flex items-center text-kz-secondary lg:gap-6 lg:mr-4 ${
          navbarOpen ? "flex flex-col" : "hidden"
        }`}
      >
        <Link
          href="/write"
          className="flex flex-row gap-3 items-center lg:px-3 lg:py-1 rounded-lg lg:bg-kz-button text-kz-secondary hover:text-kz-button lg:hover:bg-kz-secondary"
        >
          <PenSquare className="hidden lg:visible" />
          Write
        </Link>
        {loggedIn ? (
          <div className="flex items-center invisible lg:visible">
            {data?.user?.image && (
              <Image
                src={data?.user.image}
                alt="profile"
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
          </div>
        ) : (
          <Link
            href="/"
            onClick={() => signIn("google")}
            className="lg:px-3 lg:py-1 rounded-lg lg:bg-kz-button text-kz-secondary hover:text-kz-button lg:hover:bg-kz-secondary"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
