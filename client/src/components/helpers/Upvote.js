import React from "react";
import { useDispatch } from "react-redux";
import { upvoteFeedback } from "../../actions/feedbacks";

const Upvote = ({ upvotes, id, block }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  return (
    <div>
      <button
        className="rounded-lg p-2 bg-tertiary-light text-tertiary-dark font-bold text-xs text-center cursor-pointer"
        disabled={!user?.result}
        onClick={() => dispatch(upvoteFeedback(id))}
      >
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
