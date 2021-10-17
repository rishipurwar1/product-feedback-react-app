import React from "react";

const CategoryTag = ({ btnName }) => {
  return (
    <button
      className="rounded-lg px-4 py-1 bg-tertiary-light text-tertiary-dark font-medium text-sm my-4 focus:outline-none text-center cursor-pointer transition hover:text-white hover:bg-tertiary-dark hover:bg-opacity-80"
      value={btnName}
    >
      {btnName}
    </button>
  );
};

export default CategoryTag;
