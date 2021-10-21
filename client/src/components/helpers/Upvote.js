import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { upvoteFeedback } from "../../actions/feedbacks";

const Upvote = ({ upvotes, id, block }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const onUpvote = () => {
    if (user?.result?.name) {
      dispatch(upvoteFeedback(id));
    } else {
      toast.error("You're not logged in!");
    }
  };
  return (
    <div>
      <button
        className="rounded-lg p-2 bg-tertiary-light text-tertiary-dark font-bold text-xs text-center cursor-pointer"
        onClick={() => onUpvote()}
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
