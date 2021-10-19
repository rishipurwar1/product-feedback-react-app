import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import emptyIllustration from "../../assets/imgs/illustration-empty.svg";
import Button from "../helpers/Button";

const EmptyState = () => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const user = JSON.parse(localStorage.getItem("profile"));
  const handleClick = () => {
    if (user?.result?.name) {
      history.push("/create");
    } else {
      setShowModal(!showModal);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded flex-grow px-10 py-20 mt-6">
      <img src={emptyIllustration} alt="empty state" width={102} aria-hidden />
      <p className="text-primary-dark font-bold text-lg mt-9 text-center">
        There is no feedback yet.
      </p>
      <p className="text-secondary-dark text-sm text-center max-w-sm mt-3 mb-5">
        Got a suggestion? Found a bug that needs to be squashed? We love hearing
        about new ideas to improve our app.
      </p>
      <Button
        btnText="+ Add Feedback"
        bgColor="bg-neutral"
        hoverBgColor="bg-btn-hover"
        handleClick={handleClick}
      />
      {/* <Link to="/new" className="mt-6">
        + Add Feedback
      </Link> */}
    </div>
  );
};

export default EmptyState;
