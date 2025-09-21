const url = "http://localhost:3000/api/users";
const form = document.querySelector("#form");
const appointmentsList = document.querySelector("ul");
let editingAppointmentId = null;

// get all appointments
async function getAllAppointments() {
  // make an api call to the server
  try {
    const result = await axios.get(`${url}`);
    const data = result.data.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

// create an appointment
function createAppointmentElement(appointment) {
  // creating the elements
  const li = document.createElement("li");
  li.className = "appointment";
  li.dataset.id = appointment.id;

  const divDetails = document.createElement("div");
  divDetails.className = "appointment-details";

  const divName = document.createElement("div");
  divName.textContent = appointment.name;
  const divEmail = document.createElement("div");
  divEmail.textContent = appointment.email;
  const divPhone = document.createElement("div");
  divPhone.textContent = appointment.phoneNumber;

  divDetails.appendChild(divName);
  divDetails.appendChild(divEmail);
  divDetails.appendChild(divPhone);

  li.appendChild(divDetails);

  const delButton = document.createElement("button");
  delButton.textContent = "Delete";
  delButton.className = "delete-btn btn";

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.className = "edit-btn btn";

  li.appendChild(delButton);
  li.appendChild(editButton);

  appointmentsList.appendChild(li);
}

// display all the appointments
async function displayAppointments() {
  appointmentsList.innerHTML = "";
  try {
    const result = await getAllAppointments(); //getting all the appointment details

    result.forEach((appointment) => {
      // console.log(appointment);
      createAppointmentElement(appointment); //creating each item in the appointment list
    });
  } catch (error) {
    console.log(error);
  }
}

// submit form
async function formSubmit(e) {
  e.preventDefault();
  // post request to the server
  const formData = new FormData(form);
  const data = {};
  for (let [key, value] of formData) {
    data[key] = value;
  }

  try {
    if (!editingAppointmentId) {
      const response = await axios.post(`${url}`, data);
      console.log(response);
    } else {
      const response = await axios.put(`${url}/${editingAppointmentId}`, data);
      editingAppointmentId = null; // setting it back to null
      console.log(response);
    }
  } catch (error) {
    console.log(error.message);
  }

  // display the appointments including the newly added one
  displayAppointments();

  // clearing the input fields
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
}

// deleting an appointment
async function deleteAppointment(e) {
  // delete api call to the server
  try {
    if (e.target.classList.contains("delete-btn")) {
      const id = e.target.parentElement.dataset.id;
      const response = await axios.delete(`${url}/${id}`);
      console.log(response);
      // display all the remaining appointments
      displayAppointments();
    }
  } catch (error) {
    console.log(error);
  }
}

// editing an appointment
function editAppointment(e) {
  if (e.target.classList.contains("edit-btn")) {
    const id = e.target.parentElement.dataset.id;
    editingAppointmentId = id;
    console.log(editingAppointmentId);

    const name = document.querySelector(
      ".appointment-details div:nth-child(1)"
    ).textContent;
    const email = document.querySelector(
      ".appointment-details div:nth-child(2)"
    ).textContent;
    const phone = document.querySelector(
      ".appointment-details div:nth-child(3)"
    ).textContent;

    // console.log(document.querySelector(".name"));
    document.querySelector("#name").value = name;
    document.querySelector("#email").value = email;
    document.querySelector("#phone").value = phone;
  }
}

// event listeners
appointmentsList.addEventListener("click", editAppointment);
appointmentsList.addEventListener("click", deleteAppointment);
form.addEventListener("submit", formSubmit);

// do all the initialisations inside this function
function init() {
  displayAppointments();
}

init();
