require("dotenv").config();

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const studentRoutes = require("./routes/student.route");
const authRoutes = require("./routes/auth.route");

const app = express();
const port = 5432;

app.use(express.json());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { swaggerOptions: { persistAuthorization: true } })
);

// Register API routes
app.use("/students", studentRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
