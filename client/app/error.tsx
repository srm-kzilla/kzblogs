"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Error({ error }: ErrorProp) {
  return (
    <div>
      <Navbar />
      <div className="grid h-[87vh] px-4 bg-kz-primary place-content-center">
        <div className="text-center">
          <h1 className="font-black text-kz-highlight-light text-3xl md:text-5xl lg:text-6xl">
            {error.name}
          </h1>
          <p className="mt-4 text-kz-secondary">{error.message}</p>
          <p className="mt-4 text-kz-secondary">
            Something has gone really wrong for you to see this :( But no
            worries we will fix it. Stay Updated!!
          </p>

          <Link
            href="/"
            className="inline-block px-3 py-1 md:px-5 md:py-3 mt-6 text-sm font-medium text-white bg-kz-button rounded hover:bg-kz-highlight-light"
          >
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
}
