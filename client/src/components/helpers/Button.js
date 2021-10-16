import React from "react";

const Button = ({ btnText, iconType, bgColor, handleClick }) => {
  return (
    <button
      type="button"
      className={`px-4 py-2 rounded-lg ml-2 ${bgColor} text-white`}
      onClick={handleClick}
    >
      <i className={`${iconType} mr-2 `}></i>
      {btnText}
    </button>
  );
};

export default Button;
