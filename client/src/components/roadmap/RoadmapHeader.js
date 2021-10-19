import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import iconPlus from "../../assets/imgs/icon-plus.svg";
import Modal from "../helpers/Modal";
import PageHeader from "../helpers/PageHeader";

const RoadmapHeader = () => {
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
    <div className="w-full md:rounded-lg bg-primary-dark px-6 py-5 flex justify-between items-center">
      <div className="flex flex-col">
        <PageHeader color="white" />
        <h1 className="text-white font-bold text-lg mt-4">Roadmap</h1>
      </div>
      <button
        onClick={() => handleClick()}
        className="px-6 py-3 rounded-lg bg-neutral text-xs font-bold text-white transition hover:bg-btn-hover"
      >
        <img src={iconPlus} alt="plus" className="inline mr-2" />
        Add Feedback
      </button>
      {showModal && (
        <Modal
          text="Please Log In first to add a feedback"
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default RoadmapHeader;
