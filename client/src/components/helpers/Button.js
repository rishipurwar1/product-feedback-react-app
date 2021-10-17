import React from "react";

const Button = ({ btnText, iconType, bgColor, handleClick, hoverBgColor }) => {
  return (
    <button
      type="button"
      className={`px-5 py-2 text-sm rounded-lg ml-2 ${bgColor} text-white hover:${hoverBgColor}`}
      onClick={handleClick}
    >
      {iconType && <i className={`${iconType} mr-2 `}></i>}
      {btnText}
    </button>
  );
};

export default Button;
