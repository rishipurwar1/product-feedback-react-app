const mongoose = require("mongoose");
const reqString = {
  type: String,
  required: true,
};

const userSchema = mongoose.Schema({
  name: reqString,
  username: reqString,
  photo: reqString,
  email: reqString,
  password: reqString,
});

module.exports = User = mongoose.model("user", userSchema);
