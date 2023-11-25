import React from "react";

const Button = ({ onClick, children, variant }: any) => {
  const getButtonStyles = () => {
    switch (variant) {
      case "primary":
        return "flex gap-2 whitespace-nowrap text-xs h-6 px-3 py-1 rounded-3xl md:text-base md:h-10 md:px-5 md:py-2  text-gray-400 hover:text-kz-primary hover:border-kz-primary hover:bg-kz-button transition-all";
      case "secondary":
        return "h-6 py-1 px-2 text-xs rounded-3xl md:text-base md:h-10 md:px-5 md:py-2 border border-kz-highlight-light border-solid text-kz-button hover:text-kz-primary hover:border-kz-primary hover:bg-kz-button transition-all duration-500";
      case "delete":
        return "h-6 py-1 px-2 text-xs rounded-3xl md:text-base md:h-10 md:px-5 md:py-2 border border-red-900 border-solid text-red-900 hover:text-kz-primary hover:border-kz-primary hover:bg-red-900 transition-all duration-500";
      default:
        return "";
    }
  };

  return (
    <button className={getButtonStyles()} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
