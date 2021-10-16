import * as api from "../api";

export const signin = (formData, history) => async (dispatch) => {
  try {
    // login the user
    const { data } = await api.signIn(formData);
    console.log(data);
    dispatch({ type: "AUTH", data });
    history.push("/feedbacks");
  } catch (error) {
    dispatch({ type: "ERROR", data: error?.response?.data });
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    // sign up the user
    const { data } = await api.signUp(formData);
    dispatch({ type: "AUTH", data });
    history.push("/feedbacks");
  } catch (error) {
    dispatch({ type: "ERROR", data: error?.response?.data });
  }
};
