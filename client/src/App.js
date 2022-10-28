import React from "react";
import "./App.css";
import "./assets/output.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { getFeedbacks } from "./actions/feedbacks";
const Dashboard = React.lazy(() => import("./components/dashboard/Dashboard"));
const FeedbackDetail = React.lazy(() =>
  import("./components/feedback/FeedbackDetails")
);
const AuthForm = React.lazy(() => import("./components/authForm/AuthForm"));
const CreateFeedback = React.lazy(() =>
  import("./components/feedback/CreateFeedback")
);
const UpdateFeedback = React.lazy(() =>
  import("./components/feedback/UpdateFeedback")
);
const Roadmap = React.lazy(() => import("./components/roadmap/Roadmap"));

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authData);

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
          className: "",
          duration: 5000,
          style: {
            background: "#ffffff",
            color: "#3A4374",
          },
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
            <Suspense fallback={<div>Loading..</div>}>
              <Route exact path="/">
                <Redirect to="/feedbacks" />
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
              <Route exact path="/auth">
                {user?.message || !user ? (
                  <AuthForm />
                ) : (
                  <Redirect to="/feedbacks" />
                )}
              </Route>
              <Route path="/create">
                {!user ? <Redirect to="/feedbacks" /> : <CreateFeedback />}
              </Route>
              <Route path="/edit/:id">
                {!user ? <Redirect to="/feedbacks" /> : <UpdateFeedback />}
              </Route>
              <Route path="/roadmap">
                <Roadmap />
              </Route>
            </Suspense>
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default App;
