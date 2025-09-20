const express = require("express");
require("dotenv").config({ path: "../.env" });
const cors = require("cors");

const authenticateConnection = require("./config/config");
const synchronizeModels = require("./models/index");
const appointmentRouter = require("./routes/appointmentRoutes");

const app = express();

authenticateConnection();
synchronizeModels();

// middlewares
app.use(express.json());
app.use(cors());

app.use("/api", appointmentRouter);

app.listen(3000, () => {
  console.log("server running");
});
