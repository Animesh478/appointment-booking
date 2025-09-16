const fakeDb = [
  {
    id: 1,
    name: "Jon Doe",
    email: "jon@gmail.com",
    phone: "9040111222",
  },
  {
    id: 2,
    name: "Alen Doe",
    email: "alen@gmail.com",
    phone: "9040111333",
  },
];

const form = document.querySelector("#form");
const appointmentsList = document.querySelector("ul");
const editBtn = document.querySelector(".edit-btn");
const delBtn = document.querySelector(".delete-btn");

// get all appointments
function getAllAppointments() {
  // make an api call to the server
  return fakeDb;
}

// create an appointment
function createAppointment(appointment) {
  // creating the elements
  const li = document.createElement("li");
  li.className = "appointment";

  const divDetails = document.createElement("div");
  divDetails.className = "appointment-details";

  const divName = document.createElement("div");
  divName.textContent = appointment.name;
  const divEmail = document.createElement("div");
  divEmail.textContent = appointment.email;
  const divPhone = document.createElement("div");
  divPhone.textContent = appointment.phone;

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
function displayAppointments() {
  appointmentsList.innerHTML = "";
  const res = getAllAppointments();

  res.forEach((appointment) => {
    createAppointment(appointment);
  });
}

// submit form
function formSubmit() {
  // post request to the server

  // display the appointments
  displayAppointments();
}

// deleting an appointment
function deleteAppointment() {
  // delete api call to the server

  // display all the remaining appointments
  displayAppointments();
}

// editing an appointment
function editAppointment() {
  // make a put or patch request to the server with the new details

  // display all the appointments
  displayAppointments();
}

// event listeners
editBtn.addEventListener("click", editAppointment);
delBtn.addEventListener("click", deleteAppointment);
// form.addEventListener("submit");

// do all the initialisations inside this function
function init() {
  appointmentsList.innerHTML = "";
  displayAppointments();
}

init();
