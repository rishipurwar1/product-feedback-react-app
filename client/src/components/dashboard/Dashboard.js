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

const Dashboard = () => {
  const [openForm, setOpenForm] = useState(false);
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
    <main className="col-start-1 col-end-2 row-start-2 row-end-3 md:row-start-1 md:row-end-2 md:py-16 w-full mx-auto max-w-5xl">
      <div className="grid grid-cols-body gap-x-6">
        <div>
          <div className="bg-header-pattern bg-cover bg-no-repeat p-6 rounded-lg flex flex-col justify-end items-start">
            {user ? (
              <ProfileModal logout={logout} user={user} />
            ) : (
              <Link to="/auth" className="text-white font-bold">
                <i className="fas fa-sign-in-alt mr-2"></i> Log In
              </Link>
            )}
            <h1 className="text-white font-bold tracking-wide mt-16">
              CODINGSPACE
            </h1>
            <p className="text-white text-sm tracking-wide">Feedback Board</p>
          </div>
          <FilterFeedbacks search={search} />
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
