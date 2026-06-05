const inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
  console.log(input.parentElement.childNodes[5]);
  input.addEventListener("input", () => {
    input.parentElement.classList.remove("invalid");
    input.parentElement.classList.add("correct");
    input.parentElement.childNodes[5].textContent = "";
  });
});

// Prevent Default Action for Reveal-Password buttons 👇
const buttons = document.querySelectorAll(".btnNoDefault");
buttons.forEach((button) => {
  button.addEventListener("click", (buttonclick) => {
    buttonclick.preventDefault();
  });
});
// Prevent Default Action for Reveal-Password buttons 👆

//Reveal-Password  buttons 👇
const revealPassword = () => {
  const password_input = document.querySelector("#password");
  if (password_input.getAttribute("type") == "password") {
    password_input.setAttribute("type", "text");
  } else {
    password_input.setAttribute("type", "password");
  }
};
// Reveal-Password  buttons 👆
//
//
const formCompleted = () => {
  const error = document.querySelectorAll(".error");
  // console.log(error);
  const error_Array = [...error];
  console.log(error_Array);

  if (error_Array.every((value) => value.textContent == "")) {
    alert(
      "Welcome to A.A Movies 📺🍿🔥. Have a Happy Watching Experience 😊👍❤️",
    );

    window.open("./home.html", "_self");
    
    // setTimeout(() => {
    //   window.open("./home.html", "_self");
    // }, 2000);
  } else {
  }
};
//
//

const validateForm = () => {
  const logIn_Inputs = document.querySelectorAll("div.login-inputs");
  const errorText = document.querySelectorAll(".error");

  // Reset Error and correct indicators
  logIn_Inputs.forEach((input) => {
    input.classList.remove("correct", "invalid");
  });

  // Reset Error text
  errorText.forEach((text) => {
    text.textContent = "";
  });

  // Email  Validation 👇
  const email_input = document.querySelector("#email");
  const email_login_input = document.querySelector("#email-login-input");
  const email_error_text = document.querySelector("#email-err");

  // console.log(email_login_input);
  if (email_input.value == "") {
    email_login_input.classList.add("invalid");
    email_error_text.textContent = "This field is Required";
  } else {
    email_login_input.classList.add("correct");
    email_error_text.textContent = "";
  }

  email_input.addEventListener("input", () => {
    email_login_input.classList.remove("invalid");
    email_login_input.classList.add("correct");
    email_error_text.textContent = "";
  });
  // Email  Validation 👆

  // Password  Validation 👇
  const password_input = document.querySelector("#password");
  const password_login_input = document.querySelector("#password-login-input");
  const password_error_text = document.querySelector("#password-err");

  // console.log(password_login_input);
  if (password_input.value == "") {
    password_login_input.classList.add("invalid");
    password_error_text.textContent = "This field is Required";
  } else {
    password_login_input.classList.add("correct");
    password_error_text.textContent = "";
  }

  password_input.addEventListener("input", () => {
    password_login_input.classList.remove("invalid");
    password_login_input.classList.add("correct");
    password_error_text.textContent = "";
  });
  // Password  Validation 👆
};

document.querySelector("#Form").addEventListener("submit", (formData) => {
  formData.preventDefault();
  validateForm();
  formCompleted();
});
