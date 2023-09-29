"use client";
import Navbar from "@/components/Navbar";
import { signIn } from "next-auth/react";
import Image from "next/image";

const LoginPage = () => {
  const onSubmit = async () => {
    await signIn("google", {
      redirect: true,
      callbackUrl: "/",
    });
  };
  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div className="flex items-center m-5 flex-col gap-20 justify-center h-[80vh]">
        <div className="text-kz-secondary text-center bg-clip-text text-transparent bg-gradient-to-tr from-kz-highlight-dark via-85% via-kz-highlight-light to-kz-secondary">
          <p>
            We are sorry, but what you are trying to look at is exclusive
            content.
          </p>
          <p>Sign In by clicking the button below</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="px-7 py-4 shadow bg-white rounded-md flex flex-row gap-2">
            <Image src="/google.svg" alt="google" width={30} height={10} />
            <button onClick={onSubmit}>Sign in with Google</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
