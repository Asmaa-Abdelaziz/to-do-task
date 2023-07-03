/*Nav Bar*/
var navs = document.querySelectorAll(".navbar-nav .nav-item .nav-link");
for (let nav of navs) {
  nav.onclick = function () {
    var className = nav.classList[1];
    for (let content of document.querySelectorAll(".body-content")) {
      content.classList.remove("active");
    }
    document.querySelector("div." + className).classList.add("active");
    nav.classList.remove("active");
  };
}

/**************************************************************/
/*HOME*/
//Update time every seconds
var current_time = document.getElementById("current-time");
setInterval(() => {
  var time = new Date();
  current_time.innerHTML = time.toLocaleTimeString();
}, 1000);

//Display current date
var current_date = document.getElementById("current-date");
var date = new Date();
var year = date.getFullYear(); //2023
var month = date.getMonth(); //numbers from 0 to 11
var day = date.getDate(); //24
//array of months and days to display its names
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
dayName = dayNames[date.getDay()]; //Saturday
current_date.textContent = `${dayName}, ${monthNames[month]} ${day}, ${year}`;

/**************************************************************/
/*sign up*/
/*Declaring variables*/
var first_name = document.querySelector(".name-area .f-name input");
var last_name = document.querySelector(".name-area .l-name input");
var p = document.querySelectorAll(".name-area .name p");

/*check first and last name */
for (let input of document.querySelectorAll(".name-area input")) {
  input.onblur = function () {
    if (event.target.value.length < 4) {
      event.target.nextElementSibling.textContent =
        event.target.placeholder + " must be at least 4 characters";
      event.target.nextElementSibling.style.color = "#f00";
      event.target.style.borderColor = "#f00";
    } else {
      event.target.nextElementSibling.textContent = "";
      event.target.style.borderColor = "#0f0";
    }
  };
}

/*update full name*/
function updateFullName() {
  var firstName = first_name.value;
  var lastName = last_name.value;
  document.querySelector(
    ".full-name span"
  ).textContent = `${firstName} ${lastName}`;
}

/*check email*/
var email = document.querySelector(".form-body .email input");
email.onblur = function () {
  var msg = document.querySelector(".form-body .email p");
  if (email.value.indexOf("@") == -1 || email.value.indexOf(".com") == -1) {
    msg.textContent = "Your mail isn't correct!!!";
    msg.style.color = "#f00";
    email.style.borderColor = "#f00";
  } else {
    msg.textContent = "";
    email.style.borderColor = "#0f0";
  }
};

/*password area*/
var span = document.querySelector(".form-body .password span");
var password_input = document.querySelector(".form-body .password input");

span.onclick = function () {
  if (span.textContent === "show") {
    span.textContent = "hide";
    password_input.setAttribute("type", "text");
  } else {
    span.textContent = "show";
    password_input.setAttribute("type", "password");
  }
};

password_input.oninput = function () {
  if (password_input.value.length < 5 || password_input.value.length > 15) {
    password_input.style.borderColor = "#f00";
    password_input.parentElement.nextElementSibling.style.color = "#f00";
    password_input.parentElement.nextElementSibling.textContent =
      "Your password must be 5-15 characters long.";
  } else if (
    password_input.value.length >= 5 &&
    password_input.value.length < 8
  ) {
    password_input.style.borderColor = "#0f0";
    password_input.parentElement.nextElementSibling.style.color = "orange";
    password_input.parentElement.nextElementSibling.textContent = "week";
  } else if (
    password_input.value.length >= 8 &&
    password_input.value.length < 11
  ) {
    password_input.parentElement.nextElementSibling.style.color = "#ff0";
    password_input.parentElement.nextElementSibling.textContent = "medium";
  } else {
    password_input.parentElement.nextElementSibling.style.color = "#0f0";
    password_input.parentElement.nextElementSibling.textContent = "strong";
  }
};

/*select country and city*/
var data = {
  Egypt: [
    "Cairo",
    "Al-Gharbia",
    "Alexandria",
    "Giza",
    "Luxor",
    "Aswan",
    "Sues",
    "Port Said",
    "Hurgada",
    "Giza",
  ],
  KSA: [
    "Riyadh",
    "Jeddah",
    "Mecca",
    "Dammam",
    "Taif",
    "Tabuk",
    "Buraidah",
    "Abha",
    "Al-Khobar",
  ],
  
};
var country_select = document.querySelector(".country-area select");
var city_select = document.querySelector(".city-area select");

for (var country in data) {
  var option = document.createElement("option");
  option.value = country;
  option.text = country;
  country_select.appendChild(option);
}

country_select.onchange = function () {
  city_select.length = 1;
  if (this.selectedIndex < 1) {
    return;
  } else {
    for (var city of data[this.value]) {
      var option = document.createElement("option");
      option.value = city;
      option.text = city;
      city_select.appendChild(option);
    }
  }
};
document.querySelector("form").onsubmit = function () {
  for (let input of document.querySelectorAll("form input.form-control")) {
    if (input.value.length < 4 || country_select.selectedIndex < 1) {
      event.preventDefault();
      break;
    }
  }
};

/**************************************************************/
/*To Do list*/
var openForm = document.querySelector(".to-do-app button.open-form");
var form = document.querySelector(".to-do .task-form");
var taskInput = document.querySelector(".to-do .task-input");
var detailsInput = document.querySelector(".to-do .details-input");
var list = document.querySelector(".task-table ul");
var overlay = document.querySelector(".overlay");

/*function to open and close the task form*/
openForm.onclick = function () {
  if (
    form.classList.contains("hidden") &&
    overlay.classList.contains("hidden")
  ) {
    form.classList.remove("hidden");
    overlay.classList.remove("hidden");
  } else {
    form.classList.add("hidden");
    overlay.classList.add("hidden");
  }
};

function addTask() {
  /* 
          ul{
              <li>
                 <p></p>
                 <p></p>
              </li>
          }
  */

  if (taskInput.value.length < 4) {
    alert("Your task must be at least 4 characters.");
  } else {
    let li = document.createElement("li");
    let task_p = document.createElement("p");
    let task_d = document.createElement("p");

    var close = document.createElement("div");
    close.innerHTML =
      "<span class='ml-2 delete-icon' style='color:red'>x</span>";

    li.appendChild(task_p);
    li.appendChild(task_d);
    li.appendChild(close);
    list.appendChild(li);
    task_p.textContent = taskInput.value;
    task_d.textContent = detailsInput.value;

    //close form again and hide overlay
    form.classList.add("hidden");
    overlay.classList.add("hidden");
    //remove input value
    taskInput.value = "";
    detailsInput.value = "";
  }
}

function closeform() {
  form.classList.add("hidden");
  overlay.classList.add("hidden");
}

/*remove the row list*/
document.onclick = function () {
  if (event.target.className == "ml-2 delete-icon") {
    if (confirm("Are you sure you want to delete this")) {
      event.target.parentElement.parentElement.remove();
    }
  }
};
