import { Navbar } from "@/components";
import type { NextPage } from "next";
import Head from "next/head";
const LoginPage: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <Head>
        <title>Signup</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <div className="flex h-screen w-full flex-col bg-kz-dark-grey">
        <div className="z-20">
        <Navbar/>
        </div>
        <div className="flex h-full w-full">
          <div className="hidden h-full w-5/12 lg:block">
            <div className="flex w-vw justify-center h-[50vh]">
              <div className="absolute w-5/12 h-1/2">
                <img src="smallCircles.svg" alt="smallCircles" className="absolute w-[4.6vw] z-0 right-56 top-16" />
                <img src="bigCircles.svg" alt="bigCircles" className="absolute w-[13.8vw] z-0 right-1 top-16" />
              </div>
              <div className="h-[50vw]">
                <div className="relative h-1/2 pr-12">
                  <div className="mt-20 h-full w-full font-josefin_sans font-bold text-transparent text-[7.5vw] bg-clip-text bg-gradient-to-r from-kz-blue from-5% via-kz-green via-20% to-kz-orange to-40%">
                    KZBlogs
                  </div>
                  {/* edit this tagline to an actual tagline */}
                  <p className="absolute text-left text-white top-[9vw] text-[2.3vw]">Tagline</p>
                </div>
              </div>
            </div>
          </div>{/*Sign*/}
          <div className="z-0 flex h-full w-full lg:w-7/12 items-center justify-center bg-zinc-900">
            <div className="flex relative h-fit w-fit lg:w-7/12 xl:w-5/12 flex-col rounded-xl bg-kz-dark-grey px-10 py-12 sm:py-16 space-y-8 drop-shadow-2xl outline outline-1 outline-kz-orange shadow-box-shadow">
              <div className="hidden absolute mb-24 -rotate-90 -left-24 md:block">
                <h1 className="text-4xl font-bold text-zinc-800">Sign Up</h1>
              </div>
              <div>
                <p className=" text-red-500 text-left font-outfit font-medium text-xl md:text-2xl m-1">Username</p>
                <div className="flex flex-col items-center">
                  <div className="bg-zinc-700 w-full p-2 flex items-center rounded-xl ">
                    <input className="bg-zinc-700 text-white outline-none w-full pl-2 text-sm " type="email" name="email" placeholder="Enter your user name" />
                  </div>
                </div>
              </div>
              <div>
                <p className=" text-red-500 text-left font-outfit font-medium text-xl md:text-2xl m-1">Password</p>
                <div className="flex flex-col items-center">
                  <div className="bg-zinc-700 w-full p-2 flex items-center rounded-xl">
                    <input className="bg-zinc-700 text-white outline-none w-full pl-2 text-sm " type="email" name="email" placeholder="Enter your Password" />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center">
                  <hr className="my-12 h-0.5 w-full border-t-0 bg-neutral-400 opacity-50" />
                  <div className="m-2 text-neutral-400 opacity-60">or</div>
                  <hr className="my-12 h-0.5 w-full border-t-0 bg-neutral-400 opacity-50" />
                </div>
                <div className="">
                  <div className="px-2 sm:px-5 max-w-sm ">
                    <button type="button" className="text-white text-xs w-full bg-kz-orange  hover:shadow-box-shadow focus:outline-none font-medium rounded-lg md:text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2">
                      <img src="google.svg" alt="Google-icon" className="h-5 sm:h-6" />
                      Sign up with Google
                      <div></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>{/*Form*/}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;