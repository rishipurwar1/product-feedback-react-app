import React from "react";
import Card from "../dashboard/Card";
import { useSelector } from "react-redux";

const FeedbackList = () => {
  const feedbacks = useSelector((state) => state.feedbacks);

  return (
    <div>
      {feedbacks &&
        feedbacks.map((cardData) => (
          <Card data={cardData} key={cardData._id} />
        ))}
    </div>
  );
};

export default FeedbackList;
