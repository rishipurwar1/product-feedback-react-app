import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { commentFeedback } from "../../actions/feedbacks";
import loader from "../../assets/imgs/loader.svg";

const CommentSection = ({ data }) => {
  const [comments, setComments] = useState(data?.comments);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  const handleClick = async () => {
    setIsSubmitting(true);
    // const finalComment = `${user.result.name}: ${comment}`;
    const finalComment = {
      profilePhoto: user?.result?.profilePhoto,
      author: user?.result?.name,
      text: comment,
    };
    const newComments = await dispatch(commentFeedback(finalComment, data._id));
    setComments(newComments);
    setComment("");
    setIsSubmitting(false);
  };
  return (
    <>
      <div className="w-full max-w-4xl rounded-lg mt-5 bg-white shadow-sm flex flex-col p-5">
        <h2 className="text-xl text-primary-dark font-semibold">
          {comments.length} Comments
        </h2>
        <div>
          {comments.map((comment, i) => {
            return (
              <div
                key={i}
                className={`mt-6 ${
                  i !== comments.length - 1 && "pb-4 border-b border-gray-100"
                }`}
              >
                <div className="flex items-center">
                  <img
                    src={comment.profilePhoto}
                    alt="avatar"
                    className="rounded h-10 block overflow-hidden focus:outline-none cursor-pointer mr-6"
                  />
                  <p className="text-sm text-primary-dark font-semibold">
                    {comment.author}
                  </p>
                </div>
                <p className="ml-16 mt-2 text-secondary-dark">{comment.text}</p>
              </div>
            );
          })}
        </div>
      </div>
      {user?.result?.name && (
        <div className="w-full max-w-4xl rounded-lg mt-5 bg-white shadow-sm flex flex-col p-5">
          <div className="">
            <label
              htmlFor="comment"
              className="text-xl text-primary-dark font-semibold block"
            >
              Add Comment
            </label>
            <textarea
              name="comment"
              id="comment"
              cols="30"
              rows="5"
              placeholder="Type your comment here"
              className="p-4 w-full mt-4 rounded-lg bg-primary-light text-secondary-dark outline-none focus:ring-1 focus:ring-tertiary-dark"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <button
            className={`self-end px-5 py-3 rounded-lg bg-neutral text-white mt-2 text-sm ${
              isSubmitting && "bg-btn-hover"
            } hover:bg-btn-hover`}
            disabled={isSubmitting}
            onClick={handleClick}
          >
            {isSubmitting ? (
              <img src={loader} className="w-5 h-5" alt="loader" />
            ) : (
              "Post Comment"
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default CommentSection;
