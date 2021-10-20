const mongoose = require("mongoose");
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
  console.log(value);
  const feedback = await Feedback.findById(id);

  feedback.comments.push(value);
  console.log(feedback);
  const updatedFeedback = await Feedback.findByIdAndUpdate(id, feedback, {
    new: true,
  });

  res.json(updatedFeedback);
};

const upvoteFeedback = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No feedback with id: ${id}`);

  const feedback = await Feedback.findById(id);

  const index = feedback.upvotes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    feedback.upvotes.push(req.userId);
  } else {
    feedback.upvotes = feedback.upvotes.filter(
      (id) => id !== String(req.userId)
    );
  }
  const updatedFeedback = await Feedback.findByIdAndUpdate(id, feedback, {
    new: true,
  });
  res.status(200).json(updatedFeedback);
};

module.exports = {
  getFeedbacks,
  getFeedbacksByStatus,
  searchFeedback,
  createFeedback,
  updateFeedback,
  deleteFeedback,
  commentFeedback,
  upvoteFeedback,
};
