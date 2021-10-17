// eslint-disable-next-line
export default (feedbacks = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "FETCH_FEEDBACKS_BY_SEARCH":
      return action.payload.data;
    case "CREATE":
      return [...feedbacks, action.payload];
    case "UPDATE":
    case "UPVOTE":
      return feedbacks.map((feedback) =>
        feedback._id === action.payload._id ? action.payload : feedback
      );
    case "DELETE":
      return feedbacks.filter((feedback) => feedback._id !== action.payload);
    case "COMMENT":
      return feedbacks.map((feedback) => {
        if (feedback._id === action.payload._id) return action.payload;

        return feedback;
      });
    default:
      return feedbacks;
  }
};
