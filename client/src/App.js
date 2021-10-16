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
import { getFeedbacks } from "./actions/feedbacks";
import Dashboard from "./components/dashboard/Dashboard";
import FeedbackDetail from "./components/feedback/FeedbackDetails";
import AuthForm from "./components/authForm/AuthForm";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedbacks());
  }, [dispatch]);
  return (
    <Router>
      <div className="App grid md:grid-cols-1 grid-rows-mobile md:grid-rows-1 gap-16 md:gap-8 font-display">
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
        </Switch>
      </div>
    </Router>
  );
};

export default App;
