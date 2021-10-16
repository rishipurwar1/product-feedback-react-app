const mongoose = require("mongoose");
const reqString = {
  type: String,
  required: true,
};

const FeedbackSchema = new mongoose.Schema({
  title: reqString,
  description: reqString,
  category: reqString,
  status: String,
  upvotes: { type: Number, default: 0 },
  comments: { type: [String], default: [] },
});

FeedbackSchema.set("timestamps", true);

module.exports = Feedback = mongoose.model("feedback", FeedbackSchema);
