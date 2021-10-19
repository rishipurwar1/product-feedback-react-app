import * as api from "../api";
import toast from "react-hot-toast";

// FEEDBACKS ACTIONS CREATOR
export const getFeedbacks = () => async (dispatch) => {
  try {
    const { data } = await api.fetchFeedbacks();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const filterFeedbacks = (query) => async (dispatch) => {
  try {
    const { data } = await api.filterFeedbacks(query);
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getFeedbacksBySearch = (query) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await api.fetchFeedbacksBySearch(query);
    dispatch({ type: "FETCH_FEEDBACKS_BY_SEARCH", payload: { data } });
  } catch (error) {
    console.log(error);
  }
};

export const createFeedback = (feedback) => async (dispatch) => {
  try {
    const { data } = await api.createFeedback(feedback);
    dispatch({ type: "CREATE", payload: data });
    toast.success("Feedback submitted");
  } catch (error) {
    toast.error(error.message);
  }
};

export const updateFeedback = (id, feedback, roadmap) => async (dispatch) => {
  try {
    const { data } = await api.updateFeedback(id, feedback);
    dispatch({ type: "UPDATE", payload: data });
    if (roadmap) {
      toast.success("Board updated successfully");
    } else {
      toast.success("Feedback updated successfully");
    }
  } catch (error) {
    toast.error(error.message);
  }
};

export const deleteFeedback = (id) => async (dispatch) => {
  try {
    await api.deleteFeedback(id);
    dispatch({ type: "DELETE", payload: id });
    toast.success("Feedback deleted");
  } catch (error) {
    toast.error(error.message);
  }
};

export const commentFeedback = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);
    dispatch({ type: "COMMENT", payload: data });
    return data.comments;
  } catch (error) {
    console.log(error);
  }
};

export const upvoteFeedback = (id) => async (dispatch) => {
  try {
    const { data } = await api.upvoteFeedback(id);
    dispatch({ type: "UPVOTE", payload: data });
  } catch (error) {
    toast.error(error.message);
  }
};
