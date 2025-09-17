const express = require("express");
require("dotenv").config({ path: "../.env" });

const authenticateConnection = require("./config/config");
const synchronizeModels = require("./models/index");
const app = express();

authenticateConnection();
synchronizeModels();

app.listen(3000, () => {
  console.log("server running");
});
