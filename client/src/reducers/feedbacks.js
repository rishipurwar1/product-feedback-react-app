// eslint-disable-next-line
export default (feedbacks = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...feedbacks, action.payload];
    case "UPDATE":
      return feedbacks.map((feedback) =>
        feedback._id === action.payload._id ? action.payload : feedback
      );
    case "DELETE":
      return feedbacks.filter((feedback) => feedback._id !== action.payload);
    default:
      return feedbacks;
  }
};
