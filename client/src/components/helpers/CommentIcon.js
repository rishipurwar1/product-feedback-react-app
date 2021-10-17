import React from "react";

const CommentIcon = ({ comments }) => {
  return (
    <div className="flex items-center cursor-pointer">
      <i className="fas fa-comment text-2xl mr-2 text-blue-100"></i>
      <small className="text-black font-bold">{comments}</small>
    </div>
  );
};

export default CommentIcon;
