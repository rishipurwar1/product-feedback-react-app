const express = require("express");
const auth = require("../middleware/auth");
const {
  createFeedback,
  getFeedbacks,
  updateFeedback,
  deleteFeedback,
  searchFeedback,
  commentFeedback,
} = require("../controllers/feedbacks");

const router = express.Router();

router.get("/", getFeedbacks);
router.get("/search", searchFeedback);
router.post("/", auth, createFeedback);
router.patch("/:id", auth, updateFeedback);
router.delete("/:id", auth, deleteFeedback);
router.post("/:id/comment", auth, commentFeedback);

module.exports = router;
