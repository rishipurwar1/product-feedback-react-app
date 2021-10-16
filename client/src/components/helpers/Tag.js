import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { filterFeedbacks, getFeedbacks } from "../../actions/feedbacks";

const Tag = ({ btnName }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClick = (query) => {
    const queryLowerCase = query.toLowerCase();
    if (queryLowerCase === "all") {
      dispatch(getFeedbacks());
      history.push("/");
    } else {
      dispatch(filterFeedbacks(queryLowerCase));
      history.push(`/feedbacks/search/?category=${queryLowerCase || "none"}`);
    }
  };

  return (
    <button
      className="rounded-lg px-4 py-1 bg-tertiary-light text-tertiary-dark font-medium text-sm mx-1 my-1 focus:outline-none text-center cursor-pointer transition hover:text-white hover:bg-tertiary-dark hover:bg-opacity-80"
      value={btnName}
      onClick={(e) => handleClick(e.target.value)}
    >
      {btnName}
    </button>
  );
};

export default Tag;
