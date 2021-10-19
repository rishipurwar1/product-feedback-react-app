import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Roadmap = () => {
  const feedbacks = useSelector((state) => state.feedbacks);
  let plannedFeatures = [];
  let inProgressFeatures = [];
  let liveFeatures = [];

  feedbacks &&
    feedbacks.forEach((feedback) => {
      if (feedback.status === "planned") {
        plannedFeatures = [...plannedFeatures, feedback];
      } else if (feedback.status === "in-progress") {
        inProgressFeatures = [...inProgressFeatures, feedback];
      } else if (feedback.status === "live") {
        liveFeatures = [...liveFeatures, feedback];
      } else {
        return;
      }
    });
  return (
    <div className="md:block bg-white rounded-lg p-4 px-5">
      <div className="flex justify-between">
        <p className="inline font-bold text-lg text-primary-dark">Roadmap</p>
        <Link
          to="/roadmap"
          className="text-tertiary-dark transition underline hover:no-underline"
        >
          View
        </Link>
      </div>
      <div className="mt-5 flex justify-start ">
        <ul className="w-full list-disc list-inside">
          <li className="text-left text-yellow-500">
            <div className="text-secondary-dark inline">
              Planned{" "}
              <span className="float-right font-bold">
                {plannedFeatures.length}
              </span>
            </div>
          </li>
          <li className="text-left text-purple-600">
            <div className="text-secondary-dark inline">
              In-Progress{" "}
              <span className="float-right font-bold">
                {inProgressFeatures.length}
              </span>
            </div>
          </li>
          <li className="text-left text-blue-500">
            <div className="text-secondary-dark inline">
              Live{" "}
              <span className="float-right font-bold">
                {liveFeatures.length}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Roadmap;
