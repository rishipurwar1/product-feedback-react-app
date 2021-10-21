import React from "react";
import Profile from "../helpers/Profile";
import { Link } from "react-router-dom";
import Upvote from "../helpers/Upvote";
import CommentIcon from "../helpers/CommentIcon";

const Card = ({ data, disable = false }) => {
  return (
    <div
      className={`w-full rounded-lg mt-5 bg-white grid grid-cols-1 md:grid-cols-card place-content-center gap-4 md:gap-10 p-6 ${
        !disable && "transition transform hover:scale-105"
      }`}
    >
      <div className="hidden md:block">
        <Upvote upvotes={data.upvotes.length} id={data._id} block />
      </div>
      <Link
        to={`/feedbacks/${data._id}`}
        className={`${disable ? "pointer-events-none" : null} text-left`}
      >
        <Profile
          name={data.name}
          profilePhoto={data.profilePhoto}
          createdAt={data.createdAt}
        />
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
      <div className="hidden md:block self-center">
        <CommentIcon comments={data.comments.length} />
      </div>

      <div className="flex justify-between md:hidden">
        <Upvote upvotes={data.upvotes.length} id={data._id} />
        <CommentIcon comments={data.comments.length} />
      </div>
    </div>
  );
};

export default Card;
