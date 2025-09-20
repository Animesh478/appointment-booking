const express = require("express");
const appointmentController = require("../controller/appointmentController");

const router = express.Router();

router
  .route("/users")
  .get(appointmentController.getAllAppointments)
  .post(appointmentController.createAppointment);

router
  .route("/users/:id")
  .get(appointmentController.getAppointment)
  .put(appointmentController.editAppointment)
  .delete(appointmentController.deleteAppointment);

module.exports = router;
