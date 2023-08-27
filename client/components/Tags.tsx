const Tags = ({ tagsToRender }: any) => {
  return (
    <div className="flex flex-row flex-wrap justify-start">
      {tagsToRender.map((tag: string, index: number) => (
        <div
          key={index}
          className="text-xs text-center m-1 p-1 mt-6 border border-transparent rounded-2xl w-20 h-7 mx-1 bg-kz-purp-2 text-kz-grey md:m-2 md:text-base md:w-28 md:h-9"
        >
          {tag}
        </div>
      ))}
    </div>
  );
};
export default Tags;
