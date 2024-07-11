import Navbar from "./Navbar";

const Loader = () => {
  return (
    <div className="min-h-screen h-full w-full">
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse flex flex-col items-center gap-4 w-60">
          <div>
            <div className="w-48 h-6 bg-gray-400 rounded-md"></div>
            <div className="w-28 h-4 bg-gray-400 mx-auto mt-3 rounded-md"></div>
          </div>
          <div className="h-7 bg-gray-400 w-full rounded-md"></div>
          <div className="h-7 bg-gray-400 w-full rounded-md"></div>
          <div className="h-7 bg-gray-400 w-full rounded-md"></div>
          <div className="h-7 bg-gray-400 w-1/2 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
