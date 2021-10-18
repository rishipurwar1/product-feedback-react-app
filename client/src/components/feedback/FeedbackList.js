import React from "react";
import Card from "../dashboard/Card";
import { useSelector } from "react-redux";
import EmptyState from "./EmptyState";
import { Helmet } from "react-helmet";

const FeedbackList = () => {
  const feedbacks = useSelector((state) => state.feedbacks);

  return (
    <div>
      <Helmet>
        <title>{`${feedbacks.length} Suggestions - CODINGSPACE Feedback Board`}</title>
        <meta
          name="description"
          content="create a new feedback or give your suggestion"
        />
      </Helmet>
      {feedbacks.length > 0 ? (
        feedbacks.map((cardData) => <Card data={cardData} key={cardData._id} />)
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default FeedbackList;
