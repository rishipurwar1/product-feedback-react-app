import * as api from "../api";

// FEEDBACKS ACTIONS CREATOR
export const getFeedbacks = () => async (dispatch) => {
  try {
    const { data } = await api.fetchFeedbacks();
    console.log(data);
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

// export const getExperiencesBySearch = (searchQuery) => async (dispatch) => {
//   try {
//     const {
//       data: { data },
//     } = await api.fetchExperiencesBySearch(searchQuery);
//     dispatch({ type: "FETCH_EXPERIENCES_BY_SEARCH", payload: { data } });
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const getExperiencesByFilter = (searchQuery) => async (dispatch) => {
//   console.log(searchQuery);
//   try {
//     const {
//       data: { data },
//     } = await api.fetchExperiencesByFilter(searchQuery);
//     dispatch({ type: "FETCH_EXPERIENCES_BY_FILTER", payload: { data } });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const createFeedback = (feedback) => async (dispatch) => {
  try {
    const { data } = await api.createFeedback(feedback);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateFeedback = (id, feedback) => async (dispatch) => {
  try {
    const { data } = await api.updateFeedback(id, feedback);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteFeedback = (id) => async (dispatch) => {
  try {
    await api.deleteFeedback(id);
    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.log(error);
  }
};

// export const commentExperience = (value, id) => async (dispatch) => {
//   try {
//     const { data } = await api.comment(value, id);
//     dispatch({ type: "COMMENT", payload: data });
//     return data.comments;
//   } catch (error) {
//     console.log(error);
//   }
// };
