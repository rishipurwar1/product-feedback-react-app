import React, { useState } from "react";
import Avatar from "react-avatar";
import { useDispatch } from "react-redux";
import { commentFeedback } from "../../actions/feedbacks";

const CommentSection = ({ data }) => {
  const [comments, setComments] = useState(data?.comments);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;
    const newComments = await dispatch(commentFeedback(finalComment, data._id));
    setComments(newComments);
    setComment("");
  };
  return (
    <>
      <div className="w-full max-w-4xl rounded-lg mt-5 bg-white shadow-sm flex flex-col p-5">
        <h2 className="text-xl text-primary-dark font-semibold">
          {comments.length} Comments
        </h2>
        <div>
          {comments.map((c, i) => {
            const comment = c.split(":");
            return (
              <div
                key={i}
                className={`mt-6 ${
                  i !== comments.length - 1 && "pb-4 border-b border-gray-100"
                }`}
              >
                <div className="flex items-center">
                  <Avatar name={comment[0]} size={40} round className="mr-6" />
                  <p className="text-sm text-primary-dark font-semibold">
                    {comment[0]}
                  </p>
                </div>
                <p className="ml-16 mt-2 text-secondary-dark">{comment[1]}</p>
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
            className="self-end px-5 py-3 rounded-lg bg-neutral text-white mt-2 text-sm"
            disabled={!comment}
            onClick={handleClick}
          >
            Post Comment
          </button>
        </div>
      )}
    </>
  );
};

export default CommentSection;
