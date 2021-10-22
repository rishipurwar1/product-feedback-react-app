import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import Card from "../dashboard/Card";
import CommentSection from "./CommentSection";
import LoginCard from "../helpers/LoginCard";
import Button from "../helpers/Button";
import ActionModal from "../helpers/ActionModal";
import PageHeader from "../helpers/PageHeader";

const FeedbackDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("profile"));

  const feedback = useSelector((state) =>
    state.feedbacks.filter((feedback) => feedback._id === id)
  );
  if (feedback.length > 0) {
    return (
      <div className="my-16 mx-auto px-5 max-w-4xl lg:w-3/5">
        <Helmet>
          <title>{feedback[0].title}</title>
          <meta
            name="description"
            content="feedback react app for our codingspace opensource project"
          />
        </Helmet>
        <div className="flex justify-between">
          <PageHeader />
          {user?.result?._id === feedback[0]?.creator ? (
            <div>
              <Button
                btnText="Edit"
                iconType="fas fa-edit"
                bgColor="bg-tertiary-dark"
                handleClick={() => history.push(`/edit/${id}`)}
              />
              <Button
                btnText="Delete"
                iconType="fas fa-trash-alt"
                bgColor="bg-tertiary-dark"
                handleClick={() => setShowModal(!showModal)}
              />
            </div>
          ) : null}
        </div>
        <Card data={feedback[0]} disable />
        <CommentSection data={feedback[0]} />
        {showModal && (
          <ActionModal
            text="Are you sure you want to delete your interview experience?"
            feedbackId={feedback[0]._id}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default FeedbackDetail;
