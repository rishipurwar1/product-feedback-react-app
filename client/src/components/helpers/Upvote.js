import React from "react";

const Upvote = ({ upvotes, block }) => {
  return (
    <div>
      <button className="rounded-lg p-2 bg-tertiary-light text-tertiary-dark font-bold text-xs text-center cursor-pointer">
        <i className="fas fa-chevron-up z-10 px-1"></i>
        <small
          className={`${
            block ? "block" : "inline pl-2"
          } text-black font-semibold text-sm`}
        >
          {upvotes}
        </small>
      </button>
    </div>
  );
};

export default Upvote;
