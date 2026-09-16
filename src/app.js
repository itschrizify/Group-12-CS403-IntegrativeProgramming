require("dotenv").config();

const express = require("express");
const studentRoutes = require("./routes/student.route");
const authRoutes = require("./routes/auth.route");

const app = express();
const port = 5432;

app.use(express.json());

// Register API routes
app.use("/students", studentRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});