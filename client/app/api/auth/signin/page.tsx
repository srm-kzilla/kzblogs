"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

const Signin = () => {
  return (
    <div className="flex flex-col items-center lg:flex-row lg:justify-around mt-20 mx-28">
      <div className="w-fit mt-10">
        <h1 className="text-6xl lg:text-9xl font-extrabold bg-gradient-to-r from-kz-highlightd via-kz-highlightl to-kz-secondary bg-clip-text text-transparent">
          KZBlogs
        </h1>
      </div>
      <div className="invisible lg:visible">
        <Image
          className="h-[40rem] w-80"
          src="/line.svg"
          alt="line"
          width={3}
          height={3}
        />
      </div>
      <div className="flex flex-col items-center gap-5 w-72 lg:w-[30vw]">
        <form action="submit" className="flex flex-col gap-3">
          <input
            type="text"
            name="Username"
            id="username"
            placeholder="A cool name to call you"
            className="px-3 py-2 rounded-xl text-sm"
          />
          <input
            type="password"
            name="password"
            id="pass"
            placeholder="Your super secret password here"
            className="px-3 py-2 rounded-xl text-sm w-full"
          />
          <input type="submit" value="login" />
        </form>
        <button
          className="bg-kz-highlightd text-kz-secondary w-40 text-sm px-4 py-1 rounded-xl"
          onClick={() => signIn("google")}
        >
          Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default Signin;
