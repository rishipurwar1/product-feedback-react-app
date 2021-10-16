const Feedback = require("../models/Feedback");

const getFeedbacks = (req, res) => {
  Feedback.find()
    .then((feedbacks) => res.json(feedbacks))
    .catch((error) => {
      res.status(404).json(error);
    });
};

const createFeedback = (req, res) => {
  const feedback = req.body;
  Feedback.create({ ...feedback, creator: req.userId })
    .then((feedback) => res.json(feedback))
    .catch((err) => res.status(400).json({ error: err }));
};

const updateFeedback = (req, res) => {
  Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((feedback) => res.json(feedback))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
};

const deleteFeedback = (req, res) => {
  Feedback.findByIdAndRemove(req.params.id, req.body)
    .then((feedback) => res.json({ mgs: "feedback deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a Feedback" }));
};

module.exports = {
  getFeedbacks,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};
