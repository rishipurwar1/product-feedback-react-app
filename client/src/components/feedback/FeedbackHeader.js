import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import iconSuggestion from "../../assets/imgs/icon-suggestions.svg";
import iconPlus from "../../assets/imgs/icon-plus.svg";
import Modal from "../helpers/Modal";

const FeedbackHeader = ({
  headerName,
  btnName,
  search,
  setSearch,
  handleKeyPress,
}) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const feedbacks = useSelector((state) => state.feedbacks);
  console.log(feedbacks);
  const user = JSON.parse(localStorage.getItem("profile"));
  const handleClick = () => {
    if (user?.result?.name) {
      history.push("/create");
    } else {
      setShowModal(!showModal);
    }
  };
  return (
    <div className="w-full max-w-5xl rounded-lg bg-primary-dark px-5 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={iconSuggestion} className="mr-4" alt="suggestions" />
        <h1 className="text-white font-bold text-xl">{`${feedbacks.length} ${headerName}`}</h1>
        {/* <small>Sort By:</small> */}
      </div>
      <div>
        <input
          type="text"
          onKeyDown={handleKeyPress}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-3 mr-2 rounded-full text-primary-dark font-medium text-sm outline-none focus:ring-1 focus:ring-tertiary-dark"
          placeholder="Try searching Google..."
        />
        <button
          onClick={() => handleClick()}
          className="px-5 py-3 rounded-lg bg-neutral text-white transition hover:bg-btn-hover"
        >
          <img src={iconPlus} alt="plus" className="inline mr-2" />
          {btnName}
        </button>
      </div>

      {showModal && (
        <Modal
          text="Please Log In first to add a feedback"
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default FeedbackHeader;
