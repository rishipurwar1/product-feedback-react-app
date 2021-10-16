import { combineReducers } from "redux";

import feedbacks from "./feedbacks";
import auth from "./auth";

export const reducers = combineReducers({
  feedbacks,
  auth,
});
