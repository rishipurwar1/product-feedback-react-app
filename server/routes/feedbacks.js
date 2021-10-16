const express = require("express");
const {
  createFeedback,
  getFeedbacks,
  updateFeedback,
  deleteFeedback,
} = require("../controllers/feedbacks");

const router = express.Router();

router.get("/", getFeedbacks);
router.post("/", createFeedback);
router.patch("/:id", updateFeedback);
router.delete("/:id", deleteFeedback);

module.exports = router;
