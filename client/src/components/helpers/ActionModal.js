import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteFeedback } from "../../actions/feedbacks";

const ActionModal = ({ setShowModal, feedbackId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-2xl">
          {/* content */}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white p-10 outline-none focus:outline-none">
            {/* header */}
            <div className="flex items-start justify-between rounded-t">
              <h3 className="text-2xl font-semibold">Confirm Deletion</h3>
            </div>
            {/* body */}
            <div className="relative flex-auto">
              <p className="my-6 text-gray-400 text-xs leading-relaxed">
                Are you sure you want to delete your feedback? This action
                <br />
                cannot be undone.
              </p>
            </div>
            {/* footer */}
            <div className="flex items-center justify-end rounded-b">
              <button
                className="text-black font-bold px-7 py-4 text-xs rounded-full outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-400 text-white active:bg-emerald-600 font-bold text-xs px-7 py-4 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  dispatch(deleteFeedback(feedbackId));
                  setShowModal(false);
                  history.push("/feedbacks");
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ActionModal;
