const mongoose = require("mongoose");
const reqString = {
  type: String,
  required: true,
};

// const CommentSchema = new mongoose.Schema({
//   profilePhoto: String,
//   author: String,
//   text: String,
// });

const FeedbackSchema = new mongoose.Schema({
  title: reqString,
  description: reqString,
  category: reqString,
  status: reqString,
  name: reqString,
  profilePhoto: reqString,
  creator: reqString,
  upvotes: { type: [String], default: [] },
  comments: { type: ["Mixed"], default: [] },
});

FeedbackSchema.set("timestamps", true);

module.exports = Feedback = mongoose.model("feedback", FeedbackSchema);
