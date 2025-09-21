const { where } = require("sequelize");
const Appointment = require("../models/appointmentModel");

async function getAllAppointments(req, res) {
  try {
    const result = await Appointment.findAll();
    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);
  }
}

async function getAppointment(req, res) {
  const id = req.body.id;
  const result = await Appointment.findByPk(id);
  if (!result) {
    return res.status(404).json({ message: "Appointment not found" });
  }
  res.status(200).json(result);
}

async function createAppointment(req, res) {
  const { name, email, phone: phoneNumber } = req.body;

  try {
    const newAppointment = await Appointment.create({
      name,
      email,
      phoneNumber,
    });
    console.log(`New appointment with id ${newAppointment.id} created`);
  } catch (error) {
    console.log(error);
  }

  res.status(201).json({ message: "New appointment created successfully" });
}
async function deleteAppointment(req, res) {
  const id = req.params.id;
  try {
    //check if any appointment with that id exists or not
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    await Appointment.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({ message: "Appointment deleted" });
  } catch (error) {
    console.log(error);
  }
}

async function editAppointment(req, res) {
  const id = req.params.id;
  const { name, email, phone: phoneNumber } = req.body;
  try {
    //check if any appointment with that id exists or not
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    await Appointment.update(
      {
        name,
        email,
        phoneNumber,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({ message: "Information upadated successfully" });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllAppointments,
  getAppointment,
  createAppointment,
  deleteAppointment,
  editAppointment,
};
