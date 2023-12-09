"use client";
import Navbar from "@/components/Navbar";

const UnauthorizedPage = () => {
  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div className="flex items-center m-5 flex-col gap-20 justify-center h-[80vh]">
        <div className="text-kz-secondary text-center bg-clip-text text-transparent bg-gradient-to-tr from-kz-highlight-dark via-85% via-kz-highlight-light to-kz-secondary">
          <p>We are sorry, but you need KZILLA priviledge to be a writer.</p>
          <p>Send your articles to our team and they'll look at it :)</p>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
