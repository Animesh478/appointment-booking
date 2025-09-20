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

const url = "http://localhost:3000/api/users";
const form = document.querySelector("#form");
const appointmentsList = document.querySelector("ul");
const editBtn = document.querySelector(".edit-btn");
const delBtn = document.querySelector(".delete-btn");

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
      console.log(appointment);
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
    const response = await axios.post(`${url}`, data);
    console.log(response);
  } catch (error) {
    console.log(error.message);
  }

  // display the appointments including the newly added one
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
form.addEventListener("submit", formSubmit);

// do all the initialisations inside this function
function init() {
  // appointmentsList.innerHTML = "";
  displayAppointments();
}

init();
