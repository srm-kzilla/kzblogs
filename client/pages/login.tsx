import type { NextPage } from "next";
import Head from "next/head";
const LoginPage: NextPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Head>
                <title>Login</title>
                <link rel="icon" href="/logo.svg" />
            </Head>

            <main className="flex flex-col items-center justify-center w-full text-center">
                <div className="bg-white flex w-screen h-screen">
                    <div className="flex w-5/12 h-full bg-white">
                        <div className="flex w-full justify-center h-1/2 bg-white">
                            <div className="absolute w-5/12 h-1/2">
                                <img src="smallCircles.svg" alt="smallCircles" className="absolute w-[72px] h-[72px] z-0 right-56 top-16" />
                                <img src="bigCircles.svg" alt="bigCircles" className="absolute w-52 h-52 z-0 right-1 top-16" />
                            </div>
                            <div className="h-full">
                                <div className="relative h-1/2 pr-12">
                                    <h1 className="mt-20 h-full w-full font-josefin_sans font-bold text-transparent text-[113px] bg-clip-text bg-gradient-to-r from-sky-400 from-10% via-green-500 via-20% to-red-400 to-35%">
                                    KZBlogs
                                    </h1>
                                    <p className="relative text-left left-6 -top-14 text-4xl">Tagline</p>
                                </div>
                            </div>
                        </div>
                    </div>{/*Name*/}
                    <div className="flex w-7/12 h-full bg-zinc-100">
            <div className="flex w-full h-full items-center justify-center">
              <div className="flex items-center justify-center">
                <div className="transform rotate-270 relative right-[-30%]">
                  <span className="text-5xl w-14 font-outfit font-bold text-gray-400 relative left-[110%]">Sign Up</span>
                </div>
              </div>

              <div className=" w-5/12 h-4/6 rounded-xl bg-white px-10 pt-16 space-y-8 shadow-2xl outline outline-2 outline-red-200">
                <div>
                  <p className=" text-red-500 text-left font-outfit font-medium text-2xl m-1">Username</p>
                  <div className="flex flex-col items-center">
                    <div className="bg-gray-100 w-full p-2 flex items-center rounded-xl ">
                      <input className="bg-gray-100 outline-none w-full pl-2 " type="email" name="email"  placeholder="Enter your user name" />
                    </div>
                  </div>
                </div>
                <div>
                  <p className=" text-red-500 text-left font-outfit font-medium text-2xl m-1">Password</p>
                  <div className="flex flex-col items-center">
                    <div className="bg-gray-100 w-full p-2 flex items-center rounded-xl">
                      <input className="bg-gray-100 outline-none w-full pl-2 " type="email" name="email"  placeholder="Enter your Password" />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-center">
                    <hr className="my-12 h-0.5 w-full border-t-0 bg-neutral-400 opacity-50" />
                    <div className=" m-2 tect-neutral-400 opacity-60">or</div>
                    <hr className="my-12 h-0.5 w-full border-t-0 bg-neutral-400 opacity-50" />
                  </div>
                  <div className="">
                    <div className="px-6 sm:px-0 max-w-sm ">
                      <button type="button" className="text-white w-full  bg-red-300  hover:bg-red-400 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                        <svg className="mr-2 -ml-1 w-6 h-6" width="50" height="50" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="21.5" cy="21.5" r="21.5" fill="white"/>
                          <g clip-path="url(#clip0_0_1)">
                            <path d="M21.8877 4.45663C16.7181 4.45663 12.1091 6.72398 8.98641 10.3186C8.0286 11.4204 7.21674 12.6411 6.57086 13.9504L12.3136 18.3369C12.9741 16.3386 14.244 14.5975 15.9448 13.3581C17.6705 12.1003 19.7518 11.4247 21.8872 11.4293C24.2923 11.4293 26.4645 12.2819 28.1713 13.6764L33.1364 8.71843C30.1116 6.08359 26.2327 4.45663 21.8877 4.45663Z" fill="#FF7976"/>
                            <path d="M6.57141 13.9498L12.3141 18.3363C12.9746 16.3381 14.2445 14.597 15.9454 13.3576C17.671 12.0997 19.7524 11.4242 21.8877 11.4287C24.2929 11.4287 26.4651 12.2813 28.1719 13.6759L33.137 8.71788C30.1111 6.08413 26.2327 4.45663 21.8877 4.45663" fill="#E3443A"/>
                            <path d="M11.8028 21.5C11.8028 21.343 11.8143 21.1883 11.8214 21.033C11.8663 20.0945 12.033 19.19 12.3141 18.3363L6.57141 13.9498C5.51539 16.092 4.90289 18.4905 4.83398 21.033C4.82961 21.1888 4.82031 21.3436 4.82031 21.5C4.82031 21.657 4.82961 21.8123 4.83344 21.9681C4.90234 24.5073 5.51484 26.9048 6.56813 29.0447L12.3092 24.65C12.0265 23.7819 11.8624 22.8796 11.8214 21.9676C11.8143 21.8123 11.8028 21.6575 11.8028 21.5Z" fill="#F4D72C"/>
                            <path d="M6.56866 29.0447L12.3098 24.65C12.027 23.7819 11.8629 22.8796 11.8219 21.9676C11.8148 21.8117 11.8034 21.657 11.8034 21.4995C11.8034 21.3425 11.8148 21.1877 11.8219 21.0324C11.8668 20.094 12.0336 19.1895 12.3147 18.3358L6.5714 13.9498" fill="#F7B92B"/>
                            <path d="M27.5561 30.081C26.0177 31.0501 24.0802 31.5712 21.8877 31.5712C19.7515 31.5711 17.6705 30.8925 15.9448 29.6331C14.2443 28.3976 12.9743 26.6597 12.3136 24.6642L6.57086 29.0502C7.21559 30.3574 8.02598 31.5762 8.98203 32.6765C12.1047 36.2749 16.717 38.5439 21.8877 38.5439C23.4518 38.5439 24.9891 38.335 26.4569 37.9281C28.897 37.2511 31.1458 36.0255 33.0079 34.2963L27.5561 30.081Z" fill="#59C96E"/>
                            <path d="M6.57141 29.0502C7.21614 30.3574 8.02653 31.5762 8.98258 32.6765C12.1052 36.2749 16.7176 38.5439 21.8883 38.5439C23.4523 38.5439 24.9896 38.335 26.4574 37.9281C28.8976 37.2511 31.1463 36.0255 33.0084 34.2963L27.5561 30.0816C26.0177 31.0506 24.0802 31.5718 21.8877 31.5718C19.7515 31.5717 17.6705 30.893 15.9448 29.6337" fill="#40A557"/>
                            <path d="M37.792 18.2188H22.0469V24.7813H31.0424C30.5847 26.9688 29.3389 28.9572 27.5561 30.081L33.0084 34.2958C34.5036 32.9078 35.7455 31.166 36.6391 29.1513C37.6191 26.9441 38.1797 24.3005 38.1797 21.3955C38.1797 20.3893 38.0249 19.3125 37.792 18.2188Z" fill="#0FAEF4"/>
                            <path d="M33.0084 34.2958C34.5036 32.9078 35.7565 31.1463 36.6501 29.1316C37.6301 26.9245 38.1852 24.2907 38.1852 21.3863C38.1852 20.3795 38.0249 19.3125 37.792 18.2188H36.8125M22.0469 20.9531V24.7813H30.7969" fill="#4087ED"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_0_1">
                              <rect width="35" height="35" fill="white" transform="translate(4 4)"/>
                            </clipPath>
                          </defs>
                        </svg>
                        Sign up with Google
                        <div></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{/*form*/}
                </div>
            </main>
        </div>
    );
};

export default LoginPage;