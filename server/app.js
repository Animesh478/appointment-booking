const express = require("express");
require("dotenv").config({ path: "../.env" });

const authenticateConnection = require("./config/config");

const app = express();

authenticateConnection();

app.listen(3000, () => {
  console.log("server running");
});
