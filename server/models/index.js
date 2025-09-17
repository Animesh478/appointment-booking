const Appointment = require("./appointmentModel");

async function synchronizeModels() {
  await Appointment.sync({ force: true });
  console.log("Appointment table synchronized");
}

module.exports = synchronizeModels;
