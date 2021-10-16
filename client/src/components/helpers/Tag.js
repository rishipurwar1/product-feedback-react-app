import React from "react";

const Tag = ({ btnName }) => {
  return (
    <button className="rounded-lg px-4 py-1 bg-tertiary-light text-tertiary-dark font-medium text-sm mx-1 my-1 focus:outline-none text-center cursor-pointer transition hover:text-white hover:bg-tertiary-dark hover:bg-opacity-80">
      {btnName}
    </button>
  );
};

export default Tag;
