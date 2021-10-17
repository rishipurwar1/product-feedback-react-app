import * as api from "../api";
import toast from "react-hot-toast";

export const signin = (formData, history) => async (dispatch) => {
  try {
    // login the user
    const { data } = await api.signIn(formData);
    dispatch({ type: "AUTH", data });
    toast.success("Signed In successfully");
    history.push("/feedbacks");
  } catch (error) {
    dispatch({ type: "ERROR", data: error?.response?.data });
    toast.error(error?.response?.data?.message);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    // sign up the user
    const { data } = await api.signUp(formData);
    dispatch({ type: "AUTH", data });
    toast.success("Signed Up successfully");
    history.push("/feedbacks");
  } catch (error) {
    dispatch({ type: "ERROR", data: error?.response?.data });
    toast.error(error?.response?.data?.message);
  }
};
