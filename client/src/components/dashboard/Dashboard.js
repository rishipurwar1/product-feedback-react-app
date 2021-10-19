import React, { useEffect, useState } from "react";
import FeedbackHeader from "../feedback/FeedbackHeader";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import { useHistory } from "react-router";
import FilterFeedbacks from "../feedback/FilterFeedbacks";
import Roadmap from "./Roadmap";
import FeedbackList from "../feedback/FeedbackList";
import { Link } from "react-router-dom";
import { getFeedbacks, getFeedbacksBySearch } from "../../actions/feedbacks";
import ProfileModal from "../helpers/ProfileModal";
import toast from "react-hot-toast";
import Sidebar from "../Layouts/Sidebar";

const Dashboard = () => {
  const [openForm, setOpenForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const history = useHistory();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const searchExperiences = () => {
    if (search.trim()) {
      dispatch(getFeedbacksBySearch(search));
      history.push(`/feedbacks/search?query=${search || "none"}`);
    } else {
      dispatch(getFeedbacks());
      history.push("/");
    }
  };
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchExperiences();
    }
  };

  // logout handler
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
    toast.success("Log Out successfully");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
    // eslint-disable-next-line
  }, [location]);

  return (
    <main className="grid grid-cols-1 lg:grid-cols-body gap-x-10 gap-y-0 md:gap-y-5 lg:gap-y-0 md:px-5 md:py-16 w-full mx-auto md:max-w-4xl lg:max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 lg:block">
        <div className="w-full bg-header-pattern bg-cover bg-no-repeat p-4 md:p-6 md:rounded-lg flex flex-row-reverse md:flex-col justify-between md:justify-end items-center md:items-start">
          {user ? (
            <ProfileModal logout={logout} user={user} />
          ) : (
            <div className="flex items-center">
              <Link to="/auth" className="text-white font-bold">
                <i className="fas fa-sign-in-alt mr-2"></i> Log In
              </Link>
              <button
                className="inline-block md:hidden"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                {isOpen ? (
                  <i className="fas fa-times text-white text-2xl ml-5"></i>
                ) : (
                  <i className="fas fa-bars text-white text-2xl ml-4"></i>
                )}
              </button>
            </div>
          )}
          <div>
            <h1 className="text-white font-bold tracking-wide md:mt-16">
              CODINGSPACE
            </h1>
            <p className="text-white text-sm tracking-wide">Feedback Board</p>
          </div>
        </div>
        <div className="hidden md:grid grid-cols-2 gap-x-4 lg:block">
          <FilterFeedbacks search={search} />
          <Roadmap />
        </div>
      </div>
      <div className="relative">
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
        <Sidebar isOpen={isOpen} />
      </div>
    </main>
  );
};

export default Dashboard;
