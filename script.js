//Selectors
let header = document.querySelector("header");
let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let section = document.getElementsByTagName("section");
let hexagon = document.getElementsByClassName("hexagon");

// Scroll Header Logic
window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
});

menu.onclick = () => {
  navbar.classList.toggle("active");
};
window.onscroll = () => {
  navbar.classList.remove("active");
};

//Dark Mode Logic
let darkmode = document.querySelector("#darkmode");
darkmode.onclick = () => {
  if (darkmode.classList.contains("bx-moon")) {
    darkmode.classList.replace("bx-moon", "bx-sun");
    document.body.classList.add("active");
    for (let item of section) {
      item.classList.add("active");
    }
    for (let item of hexagon) {
      item.classList.add("active");
    }
  } else {
    darkmode.classList.replace("bx-sun", "bx-moon");
    document.body.classList.remove("active");
    for (let item of section) {
      item.classList.remove("active");
    }
    for (let item of hexagon) {
      item.classList.remove("active");
    }
  }
};

//Form Submit Logic
const form = document.querySelector("#contact-form");
const submitMessage = document.querySelector("#submit-message");
const inputName = document.querySelector("#name");
const inputEmail = document.querySelector("#email");
const inputMessage = document.querySelector("#message");

const NAME_REQUIRED = "Please enter your name.";
const EMAIL_REQUIRED = "Please enter your email.";
const MESSAGE_REQUIRED = "Please enter your message.";
const EMAIL_INVALID = "Please enter a correct email address.";

let PROJECT_ID = "ec7qcof4";
let DATASET = "production";
let QUERY = encodeURIComponent('*[_type == "pet"]');

function showMessage(input, message, type) {
	// get the small element and set the message
	const msg = input.parentNode.querySelector("small");
	msg.innerText = message;
	// update the class for the input
	input.class = type ? "success" : "error";
	return type;
}

function showError(input, message) {
	return showMessage(input, message, false);
}

function showSuccess(input) {
	return showMessage(input, "", true);
}

function hasValue(input, message) {
	if (input.value.trim() === "") {
		return showError(input, message);
	}
	return showSuccess(input);
}

function validateEmail(input, requiredMsg, invalidMsg) {
	// check if the value is not empty
	if (!hasValue(input, requiredMsg)) {
		return false;
	}
	// validate email format
	const emailRegex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const email = input.value.trim();
	if (!emailRegex.test(email)) {
		return showError(input, invalidMsg);
	}
	return true;
}

const submitData = async (name, email, message) => {
  submitMessage.innerText = "";
  const rawResponse = await fetch('https://formbold.com/s/3LOb9', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, email, message})
  });

  const content = await rawResponse.json();
  if (content.message) {
    submitMessage.innerText = content.message.toLowerCase();
  } else {
    submitMessage.innerText = 'An error occured. Please try again.';
  }

  inputName.value = "";
  inputEmail.value = "";
  inputMessage.value = "";
}

form.addEventListener("submit", function (event) {
	// stop form submission
	event.preventDefault();

  const name = form.elements["name"];
  const email = form.elements["email"];
  const message = form.elements["message"];

	// validate the form
	let nameValid = hasValue(name, NAME_REQUIRED);
	let emailValid = validateEmail(email, EMAIL_REQUIRED, EMAIL_INVALID);
	let messageValid = hasValue(message, MESSAGE_REQUIRED);

  // if valid, submit the form.
	if (nameValid && emailValid && messageValid) {
    submitData(name.value.trim(), email.value.trim(), message.value.trim());
	}
});
