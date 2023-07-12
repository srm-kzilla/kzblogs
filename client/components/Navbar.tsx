import Link from "next/link";
const Navbar = () => {
  return (
    <div className="h- w-full flex flex-row align-middle px-0.5 py-0 shadow-box-shadow">
      <div className="h-20% w-20%">
        <img
          src="/logo.svg"
          alt="KZBlogs Logo"
          className=" h-20 w-15 mx-1 sm:h-30 "
        />
      </div>
      <div className=" ml-auto font-medium text-xs  text-white flex flex-col lg:text-lg ">
        <ul className="flex p-1 mx-0 my-5">
          <li className="mx-1 my-2 md:mx-5 hover:text-kz-lt-purple transition-all duration-500">
            <Link href="/">Home</Link>
          </li>
          <li className="mx-1 my-2 md:mx-5 hover:text-kz-lt-purple transition-all duration-500">
            <Link href="/explore">Explore</Link>
          </li>
          <li className="mx-1 my-2 md:mx-5 hover:text-kz-lt-purple transition-all duration-500">
            <Link href="/create">Create</Link>
          </li>
          <li className="mx-1 my-2 md:mx-5">
            <Link
              href="/signup"
              className="p-3 rounded-3xl border border-kz-lt-purple border-solid text-kz-lt-purple box-border hover:text-[#ffffff] hover:border-[#ffffff] hover:bg-kz-lt-purple transition-all duration-500 "
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
