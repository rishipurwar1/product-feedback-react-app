const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();
const path = require("path");

const feedbacksRoutes = require("./routes/feedbacks");
const userRoutes = require("./routes/users");

app.use(express.json({ extended: false }));
app.use(cors());

// connect to mongoDB
connectDB();

app.use("/feedbacks", feedbacksRoutes);
app.use("/user", userRoutes);

// static files (build of your frontend)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client", "build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
