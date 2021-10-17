const Feedback = require("../models/Feedback");

const getFeedbacks = (req, res) => {
  if (req.query.category) {
    const { category } = req.query;
    Feedback.find({ category })
      .then((feedbacks) => {
        res.json(feedbacks);
      })
      .catch((err) => {
        res.status(404).json({ noFeedbacksFound: "noFeedbacksFound" });
        console.log(err);
      });
  } else if (req.query.status) {
    const { status } = req.query;
    Feedback.find({ status })
      .then((feedbacks) => {
        res.json(feedbacks);
      })
      .catch((err) => {
        res.status(404).json({ noFeedbacksFound: "noFeedbacksFound" });
        console.log(err);
      });
  } else {
    Feedback.find()
      .then((feedbacks) => res.json(feedbacks))
      .catch((error) => {
        res.status(404).json(error);
      });
  }
};

const getFeedbacksByStatus = (req, res) => {
  const { status } = req.query;
  if (status) {
    Feedback.find({ status })
      .then((feedbacks) => {
        res.json(feedbacks);
      })
      .catch((err) => {
        res.status(404).json({ noFeedbacksFound: "noFeedbacksFound" });
        console.log(err);
      });
  }
};

const searchFeedback = async (req, res) => {
  const { query } = req.query;

  try {
    const title = new RegExp(query, "i");

    const feedbacks = await Feedback.find({
      $or: [{ title }, { description: title }],
    });

    res.json({ data: feedbacks });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
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

const commentFeedback = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const feedback = await Feedback.findById(id);

  feedback.comments.push(value);
  const updatedFeedback = await Feedback.findByIdAndUpdate(id, feedback, {
    new: true,
  });

  res.json(updatedFeedback);
};

module.exports = {
  getFeedbacks,
  getFeedbacksByStatus,
  searchFeedback,
  createFeedback,
  updateFeedback,
  deleteFeedback,
  commentFeedback,
};
