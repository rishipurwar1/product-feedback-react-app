const mongoose = require("mongoose");
const reqString = {
  type: String,
  required: true,
};

const FeedbackSchema = new mongoose.Schema({
  title: reqString,
  description: reqString,
  category: reqString,
  status: reqString,
  name: reqString,
  creator: reqString,
  upvotes: { type: [String], default: [] },
  comments: { type: [String], default: [] },
});

FeedbackSchema.set("timestamps", true);

module.exports = Feedback = mongoose.model("feedback", FeedbackSchema);
