const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      res.status(404).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signup = async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(404).json({ message: "User already exist." });

    const existingUserName = await User.findOne({ username });
    if (existingUserName)
      return res
        .status(404)
        .json({ message: "User with the same username already exist." });

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      {
        name: result.name,
        email: result.email,
        username: result.username,
        id: result._id,
      },
      "test",
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ result: result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  signup,
  signin,
};
