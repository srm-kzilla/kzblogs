interface TrendingCardProps {
  blogs: Blog[];
}

const TrendingCard = ({ blogs }: TrendingCardProps) => {
  const trendingBlogs = blogs.filter((blog) => blog.trending);

  return (
    <div className="bg-kz-card-dark p-4 w-full h-fit text-kz-secondary rounded-xl">
      <div>
        <h1 className="text-2xl text-transparent bg-clip-text bg-gradient-to-tr from-kz-highlight-dark via-kz-highlight-light via-40% to-kz-secondary to-90%">Trending</h1>
        <div className="flex flex-col mt-3">
          {trendingBlogs.map(({id, title, author }) => (
            <div key={id} className="flex justify-between items-end my-3">
              <div>
                <h1>{title}</h1>
                <p className="text-xs font-extralight font-sans">
                  {author}
                </p>
              </div>
            </div>
          )
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;
