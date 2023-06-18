const BlogCard = ({ blogArr }) => {
  return (
    <>
      <div className="flex flex-col w-96 h-auto m-5 p-2 bg-kz-grey shadow-lg rounded-3xl md:w-5/6">
        <img
          className="w-auto h-auto p-2 rounded-3xl"
          src={blogArr.img}
          alt=""
        />
        <div>
          <h5 className="p-1 text-3xl font-semibold text-kz-blue sm:text-xl">
            {blogArr.title}
          </h5>
          <p className="p-2 font-light text-xl text-black sm:text-xs">
            {blogArr.content}
          </p>
          <a
            href="#"
            className="p-1 text-kz-orange text-sm hover:text-[#000000] sm:text-xs"
          >
            Read More
          </a>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
