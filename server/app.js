const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();

const feedbacksRoutes = require("./routes/feedbacks");
const userRoutes = require("./routes/users");

app.use(express.json({ extended: false }));
app.use(cors());

// connect to mongoDB
connectDB();

app.use("/feedbacks", feedbacksRoutes);
app.use("/user", userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
