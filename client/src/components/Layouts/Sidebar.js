import React from "react";
import Roadmap from "../dashboard/Roadmap";
import FilterFeedbacks from "../feedback/FilterFeedbacks";

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`min-h-screen max-w-xs transition transform ${
        isOpen ? null : "translate-x-full"
      }  bg-white absolute top-0 right-0 bg-secondary-light p-5 block md:hidden`}
    >
      <FilterFeedbacks />
      <Roadmap />
    </div>
  );
};

export default Sidebar;
