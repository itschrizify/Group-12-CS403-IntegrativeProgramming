const express = require("express");
const studentRoutes = require("./routes/student.route");

const app = express();
const port = 3000;

app.use(express.json());

// Register API routes
app.use("/students", studentRoutes);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});