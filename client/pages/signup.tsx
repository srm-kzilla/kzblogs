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
      <div className="flex h-screen w-full flex-col bg-[#151519]">
        <div className="z-20">
          <Navbar />
        </div>
        <div className="flex h-full w-full">
          <div className="absolute bottom-0">
            <img src="bgImage.svg" alt="" className=" w-vw" />
          </div>
          <div className="hidden h-full w-5/12 lg:block">
            <div className="flex justify-center h-[50vh]">
              <div className="justify-center h-[50vh]">
                <div className="relative h-1/2 pr-12">
                  <div className="mt-20 h-full w-full font-josefinSans font-bold text-transparent text-[7.5vw] bg-clip-text bg-gradient-to-r from-kz-deepblue from-20% via-kz-lightblue via-45% to-kz-orange to-70%">
                    KZBlogs
                  </div>
                  {/* edit this tagline to an actual tagline */}
                  <p className="absolute text-left text-white top-[9vw] text-[2.3vw]">Tagline</p>
                </div>
              </div>
            </div>
          </div>{/*Sign*/}
          <div className="z-0 flex h-full w-full lg:w-7/12 items-center justify-center">
            <div className="flex relative h-fit w-fit lg:w-7/12 xl:w-5/12 flex-col rounded-xl bg-kz-dark-grey px-10 py-12 sm:py-16 sm:pt-10 space-y-8 drop-shadow-2xl outline outline-1 shadow-3xl">
              <div className="absolute left-4 -top-[8vh] lg:-rotate-90 lg:-left-[15vh] lg:top-[7vh]">
                <h1 className="text-[6vh] font-outfit font-bold text-kz-textgrey">Sign Up</h1>
              </div>
              <div>
                <p className=" text-kz-textblue text-left font-outfit font-semibold text-xl md:text-2xl m-1">Username</p>
                <div className="flex flex-col items-center">
                  <div className="w-full p-2 flex items-center rounded-xl ">
                    <input className="bg-transparent border-b-2 text-kz-textgrey font-medium outline-none w-full text-sm" type="email" name="email" placeholder="Enter your user name" />
                  </div>
                </div>
              </div>
              <div>
                <p className=" text-kz-textblue text-left font-outfit font-semibold text-xl md:text-2xl m-1">Password</p>
                <div className="flex flex-col items-center">
                  <div className=" w-full p-2 flex items-center rounded-xl">
                    <input className="bg-transparent border-b-2 text-kz-textgrey font-medium outline-none w-full text-sm" type="email" name="email" placeholder="Enter your Password" />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center">
                  <hr className="my-8 h-0.5 w-full border-t-0 bg-neutral-400 opacity-50" />
                  <div className="m-2 text-neutral-400 opacity-60">or</div>
                  <hr className="my-8 h-0.5 w-full border-t-0 bg-neutral-400 opacity-50" />
                </div>
                <div className="">
                  <div className="px-2 sm:px-5 max-w-sm ">
                    <button type="button" className="text-white text-xs w-full bg-kz-deepblue hover:shadow-box-shadow focus:outline-none font-medium rounded-lg md:text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2">
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