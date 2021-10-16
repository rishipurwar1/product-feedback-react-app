import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "../dashboard/Card";
import CommentSection from "./CommentSection";
import LoginCard from "../helpers/LoginCard";
import Button from "../helpers/Button";
import ActionModal from "../helpers/ActionModal";

const FeedbackDetail = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const user = JSON.parse(localStorage.getItem("profile"));

  const feedback = useSelector((state) =>
    state.feedbacks.filter((feedback) => feedback._id === id)
  );
  if (feedback.length > 0) {
    return (
      <div className="row-start-2 row-end-3 col-start-1 col-end-2 mx-auto w-3/5">
        <div className="flex justify-between">
          <Link to="/" className="text-secondary-dark text-sm font-bold">
            <i className="fas fa-angle-left text-tertiary-dark"></i>&nbsp;&nbsp;
            Go back
          </Link>
          <div>
            <Button
              btnText="Edit"
              iconType="fas fa-edit"
              bgColor="bg-tertiary-dark"
              handleClick={() => setOpenForm(!openForm)}
            />
            <Button
              btnText="Delete"
              iconType="fas fa-trash-alt"
              bgColor="bg-tertiary-dark"
              handleClick={() => setShowModal(!showModal)}
            />
          </div>
        </div>
        <Card data={feedback[0]} disable />
        <CommentSection data={feedback[0]} />
        {!user?.result?.name && <LoginCard />}
        {showModal && (
          <ActionModal
            text="Are you sure you want to delete your interview experience?"
            feedbackId={feedback[0]._id}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
        {/* {openForm && (
          <AddOpportunity
            initialData={opportunity[0]}
            openForm={openForm}
            setOpenForm={setOpenForm}
          />
        )} */}
      </div>
    );
  } else {
    return null;
  }
};

export default FeedbackDetail;
