import "./App.css";
import "./assets/output.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { getFeedbacks } from "./actions/feedbacks";
import Dashboard from "./components/dashboard/Dashboard";
import FeedbackDetail from "./components/feedback/FeedbackDetails";
import AuthForm from "./components/authForm/AuthForm";
import CreateFeedback from "./components/feedback/CreateFeedback";
import UpdateFeedback from "./components/feedback/UpdateFeedback";
import Roadmap from "./components/roadmap/Roadmap";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedbacks());
  }, [dispatch]);
  return (
    <>
      <Toaster
        position="top-center"
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#ffffff",
            color: "#3A4374",
          },
          // Default options for specific types
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#4661E6",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#D73737",
              secondary: "#ffffff",
            },
          },
        }}
      />
      <Router basename="/">
        <Helmet>
          <title>CODINGSPACE Feedback App</title>
          <meta
            name="description"
            content="feedback react app for our codingspace opensource project"
          />
        </Helmet>
        <div className="font-display bg-secondary-light">
          <Switch>
            <Route exact path="/">
              <Redirect to="/feedbacks" />
              <Dashboard />
            </Route>
            <Route exact path="/feedbacks">
              <Dashboard />
            </Route>
            <Route exact path="/feedbacks/search">
              <Dashboard />
            </Route>
            <Route path="/feedbacks/:id">
              <FeedbackDetail />
            </Route>
            <Route path="/auth">
              <AuthForm />
            </Route>
            <Route path="/create">
              <CreateFeedback />
            </Route>
            <Route path="/edit/:id">
              <UpdateFeedback />
            </Route>
            <Route path="/roadmap">
              <Roadmap />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default App;
