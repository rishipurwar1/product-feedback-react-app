import React from "react";
import Profile from "../helpers/Profile";
import { Link } from "react-router-dom";

const Card = ({ data, disable = false }) => {
  return (
    <Link
      to={`/feedbacks/${data._id}`}
      className={`${
        disable ? "pointer-events-none" : null
      } w-full rounded-lg mt-5 bg-white grid grid-cols-card gap-10 p-6 transition transform hover:scale-105`}
    >
      <div>
        <button className="rounded-xl p-2 bg-tertiary-light text-tertiary-dark font-bold text-xs text-center cursor-pointer">
          <i className="fas fa-chevron-up"></i>
          <small className="block text-black font-semibold text-sm">
            {data.upvotes}
          </small>
        </button>
      </div>
      <div className="text-left">
        <Profile name="Rishi Purwar" createdAt={data.createdAt} />
        <p className="text-lg text-primary-dark font-semibold">{data.title}</p>
        <p className="text-secondary-dark text-sm pt-2 pb-3">
          {disable
            ? data.description
            : data.description.split(/\s+/).slice(0, 10).join(" ")}
        </p>
        <div className="inline-flex rounded-full px-3 py-1 bg-tertiary-light text-tertiary-dark font-medium text-xs">
          {data.category.charAt(0).toUpperCase() + data.category.slice(1)}
        </div>
      </div>
      <div className="flex items-center cursor-pointer">
        <i className="fas fa-comment text-2xl mr-2 text-gray-300"></i>
        <small className="text-black font-bold">{data.comments.length}</small>
      </div>
    </Link>
  );
};

export default Card;
