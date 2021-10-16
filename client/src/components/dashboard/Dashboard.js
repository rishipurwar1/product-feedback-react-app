import React, { useState } from "react";
// import ExperienceList from "./ExperienceList"
import FeedbackHeader from "../feedback/FeedbackHeader";
// import AddQuestion from "./AddQuestion";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import FilterFeedbacks from "../feedback/FilterFeedbacks";
import Roadmap from "./Roadmap";
import FeedbackList from "../feedback/FeedbackList";
import { Link } from "react-router-dom";
// import {
//   getExperiences,
//   getExperiencesByFilter,
//   getExperiencesBySearch,
// } from "../../actions/experiences";
// import FilterExperiences from "./FilterExperiences";
// import QuestionOfDay from "./QuestionOfDay";

const Dashboard = () => {
  const [openForm, setOpenForm] = useState(false);
  // const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  // const history = useHistory();

  // const searchExperiences = () => {
  //   if (search.trim()) {
  //     dispatch(getExperiencesBySearch({ search }));
  //     history.push(
  //       `/interview-experiences/search?searchQuery=${search || "none"}`
  //     );
  //   } else {
  //     dispatch(getExperiences());
  //     history.push("/interview-experiences");
  //   }
  // };
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      // searchExperiences();
    }
  };

  // const filterExperiences = (searchTerm) => {
  //   if (searchTerm) {
  //     dispatch(getExperiencesByFilter({ searchTerm }));
  //     history.push(
  //       `/interview-experiences/filter?query=${searchTerm || "none"}`
  //     );
  //   } else {
  //     dispatch(getExperiences());
  //     history.push("/interview-experiences");
  //   }
  // };

  return (
    <main className="col-start-1 col-end-2 row-start-2 row-end-3 md:row-start-1 md:row-end-2 md:py-16 w-full mx-auto max-w-5xl">
      <div className="grid grid-cols-body gap-x-6">
        <div>
          <div className="bg-header-pattern bg-cover bg-no-repeat p-6 rounded-lg flex flex-col justify-end items-start">
            <Link to="/" className="text-white font-bold">
              <i class="fas fa-sign-in-alt mr-2"></i> Log In
            </Link>
            <h1 className="text-white font-bold tracking-wide mt-16">
              CODINGSPACE
            </h1>
            <p className="text-white text-sm tracking-wide">Feedback Board</p>
          </div>
          <FilterFeedbacks
            search={search}
            // filterExperiences={filterExperiences}
          />
          <Roadmap />
        </div>
        <div>
          <FeedbackHeader
            openForm={openForm}
            setOpenForm={setOpenForm}
            headerName="Suggestions"
            btnName="Add Feedback"
            handleKeyPress={handleKeyPress}
            setSearch={setSearch}
            search={search}
          />
          <FeedbackList />
          {/* <AddQuestion openForm={openForm} setOpenForm={setOpenForm} /> */}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
