import React from "react";

const Button = ({ className = "", ...rest }) => {
  return (
    <button
      {...rest}
      className={`min-w-fit  p-2 rounded-lg text-white cursor-pointer ml-auto hover:opacity-80 ${className}`}
    />
  );
};

export default Button;
