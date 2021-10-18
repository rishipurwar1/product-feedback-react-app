import React from "react";
import Profile from "../helpers/Profile";
import { Link } from "react-router-dom";
import Upvote from "../helpers/Upvote";
import CommentIcon from "../helpers/CommentIcon";

const Card = ({ data, disable = false }) => {
  return (
    <div
      className={`w-full rounded-lg mt-5 bg-white grid grid-cols-card gap-10 p-6 ${
        !disable && "transition transform hover:scale-105"
      }`}
    >
      <Upvote upvotes={data.upvotes.length} id={data._id} block />
      <Link
        to={`/feedbacks/${data._id}`}
        className={`${disable ? "pointer-events-none" : null} text-left`}
      >
        <Profile name={data.name} createdAt={data.createdAt} />
        <p className="text-lg text-primary-dark font-semibold">{data.title}</p>
        <p className="text-secondary-dark text-sm pt-2 pb-3">
          {disable
            ? data.description
            : data.description.split(/\s+/).slice(0, 10).join(" ")}
        </p>
        <div className="inline-flex rounded-full px-3 py-1 bg-tertiary-light text-tertiary-dark font-medium text-xs">
          {data.category.charAt(0).toUpperCase() + data.category.slice(1)}
        </div>
      </Link>
      <CommentIcon comments={data.comments.length} />
    </div>
  );
};

export default Card;
