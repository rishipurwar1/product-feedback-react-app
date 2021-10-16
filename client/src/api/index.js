import axios from "axios";
const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

// experiences endpoints
export const fetchFeedbacks = () => API.get("/feedbacks");
export const createFeedback = (newFeedback) =>
  API.post("/feedbacks", newFeedback);
export const updateFeedback = (id, updatedFeedback) =>
  API.patch(`/feedbacks/${id}`, updatedFeedback);
export const deleteFeedback = (id) => API.delete(`/feedbacks/${id}`);

// auth endpoints
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
