const sequelize = require("./db");

async function authenticateConnection() {
  try {
    console.log(process.env.DB_NAME);
    await sequelize.authenticate();
    console.log("Connection established successfully");
  } catch (error) {
    console.log("Unable to connect to database", error);
  }
}

module.exports = authenticateConnection;
