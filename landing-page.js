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
 const passwordBtns = document.querySelectorAll(".revealPasswords");
const revealPassword = () => {
  const password_input = document.querySelector("#password");
  if (password_input.getAttribute("type") == "password") {
    password_input.setAttribute("type", "text");
    passwordBtns[0].innerHTML = '<i class="bi bi-eye-slash"></i>';
  } else {
    password_input.setAttribute("type", "password");
    passwordBtns[0].innerHTML = '<i class="bi bi-eye"></i>';
  }
};
const revealConfirmPassword = () => {
  const confirmpassword_input = document.querySelector("#confirmpassword");
  if (confirmpassword_input.getAttribute("type") == "password") {
    confirmpassword_input.setAttribute("type", "text");
    passwordBtns[1].innerHTML = '<i class="bi bi-eye-slash"></i>';
  } else {
    confirmpassword_input.setAttribute("type", "password");
    passwordBtns[1].innerHTML = '<i class="bi bi-eye"></i>';
  }
};
// Reveal-Password  buttons 👆

const formCompleted = () => {
  const error = document.querySelectorAll(".error");
  // console.log(error);
  const error_Array = [...error];
  console.log(error_Array);

  if (error_Array.every((value) => value.textContent == "")) {
    alert("Account Creation Successful. You will be redirected to Login");

    setTimeout(() => {
      window.open("./login.html", "_self");
    }, 2000);
  } else {
  }
};

const validateForm = () => {
  const signUp_Inputs = document.querySelectorAll("div.signup-inputs");
  const errorText = document.querySelectorAll(".error");

  // Reset Error and correct indicators
  signUp_Inputs.forEach((input) => {
    input.classList.remove("correct", "invalid");
  });

  // Reset Error text
  errorText.forEach((text) => {
    text.textContent = "";
  });

  // Fullname  Validation 👇
  const fullname_input = document.querySelector("#fullname");
  const fullname_signup_input = document.querySelector(
    "#fullname-signup-input",
  );
  const fullname_error_text = document.querySelector("#fullname-err");

  // console.log(fullname_signup_input);
  if (fullname_input.value == "") {
    fullname_signup_input.classList.add("invalid");
    fullname_error_text.textContent = "This field is Required";
  } else {
    fullname_signup_input.classList.add("correct");
    fullname_error_text.textContent = "";
  }

  fullname_input.addEventListener("input", () => {
    fullname_signup_input.classList.remove("invalid");
    fullname_signup_input.classList.add("correct");
    fullname_error_text.textContent = "";
  });
  // Fullname  Validation 👆

  // Email  Validation 👇
  const email_input = document.querySelector("#email");
  const email_signup_input = document.querySelector("#email-signup-input");
  const email_error_text = document.querySelector("#email-err");

  // console.log(email_signup_input);
  if (email_input.value == "") {
    email_signup_input.classList.add("invalid");
    email_error_text.textContent = "This field is Required";
  } else {
    email_signup_input.classList.add("correct");
    email_error_text.textContent = "";
  }

  email_input.addEventListener("input", () => {
    email_signup_input.classList.remove("invalid");
    email_signup_input.classList.add("correct");
    email_error_text.textContent = "";
  });
  // Email  Validation 👆

  // Username  Validation 👇
  const username_input = document.querySelector("#username");
  const username_signup_input = document.querySelector(
    "#username-signup-input",
  );
  const username_error_text = document.querySelector("#username-err");

  // console.log(username_signup_input);
  if (username_input.value == "") {
    username_signup_input.classList.add("invalid");
    username_error_text.textContent = "This field is Required";
  } else {
    username_signup_input.classList.add("correct");
    username_error_text.textContent = "";
  }

  username_input.addEventListener("input", () => {
    username_signup_input.classList.remove("invalid");
    username_signup_input.classList.add("correct");
    username_error_text.textContent = "";
  });
  // Username  Validation 👆

  // Password  Validation 👇
  const password_input = document.querySelector("#password");
  const password_signup_input = document.querySelector(
    "#password-signup-input",
  );
  const password_error_text = document.querySelector("#password-err");

  // console.log(password_signup_input);
  if (password_input.value == "") {
    password_signup_input.classList.add("invalid");
    password_error_text.textContent = "This field is Required";
  } else {
    password_signup_input.classList.add("correct");
    password_error_text.textContent = "";
  }

  password_input.addEventListener("input", () => {
    password_signup_input.classList.remove("invalid");
    password_signup_input.classList.add("correct");
    password_error_text.textContent = "";
  });
  // Password  Validation 👆

  // Confirm-Password  Validation 👇
  const confirmpassword_input = document.querySelector("#confirmpassword");
  const confirmpassword_signup_input = document.querySelector(
    "#confirmpassword-signup-input",
  );
  const confirmpassword_error_text = document.querySelector(
    "#confirmpassword-err",
  );

  // console.log(confirmpassword_signup_input);
  if (confirmpassword_input.value == "") {
    confirmpassword_signup_input.classList.add("invalid");
    confirmpassword_error_text.textContent = "This field is Required";
  } else if (confirmpassword_input.value !== password_input.value) {
    confirmpassword_signup_input.classList.add("invalid");
    confirmpassword_error_text.textContent = "Input Exact Password";
  } else {
    confirmpassword_signup_input.classList.add("correct");
    confirmpassword_error_text.textContent = "";
  }

  confirmpassword_input.addEventListener("input", () => {
    confirmpassword_signup_input.classList.remove("invalid");
    confirmpassword_signup_input.classList.add("correct");
    confirmpassword_error_text.textContent = "";
  });
  // Confirm-Password  Validation 👆
};

document.querySelector("#Form").addEventListener("submit", (formData) => {
  formData.preventDefault();
  validateForm();
  formCompleted();
});

// code to create a paragraph under each input

/* const validateForm = () => {
  const signupInputs = document.querySelectorAll(".signup-inputs");

  signupInputs.forEach((value) => {
    const errorParagraph = document.createElement("p");
    value.appendChild(errorParagraph);
    errorParagraph.innerHTML = "Invalid Input";
  });
};*/

const openedAnswers = document.querySelectorAll(
  "ul#questions > li > div.answers",
);

console.log(openedAnswers);

openedAnswers.forEach((value) => {
  value.addEventListener("click", () => {
    const fullHeight = value.scrollHeight;
    const fullHeight_in_rem = fullHeight / 16 + "rem";
    // console.log(fullHeight_in_rem);

    // Toggle height
    if (value.style.height == fullHeight_in_rem) {
      value.style.height = "6rem";
    } else {
      value.style.height = fullHeight_in_rem;
    }

    /* Toggles height but is limited and
      will not show the full-content
      in smaller devices */

    // if (value.style.height == "20rem") {
    //   value.style.height = "6rem";
    // } else {
    //   value.style.height = "20rem";
    // }

    // Toggle rotation class
    value.classList.toggle("rotate");
  });
});
