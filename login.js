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
// Reveal-Password  buttons 👆
//
//
const formCompleted = async () => {
  const error = document.querySelectorAll(".error");
  // console.log(error);
  const error_Array = [...error];
  // console.log(error_Array);

  if (error_Array.every((value) => value.textContent == "")) {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const signinUrl = `http://localhost:3500/users/signin`;
    const roleUrl = `http://localhost:3500/users/userrole`;

    const payload = {
      email,
      password,
    };

    try {
      const response1 = await fetch(signinUrl, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "content-type": "application/json",
        },
      });
      const data1 = await response1.json();
      if (!response1.ok) {
        alert(`Something Went Wrong:\n ${data1.detail}`);
        return;
      }
      // console.log(data1);

      localStorage.setItem("aamovies_accesstoken", data1.accessToken);
      localStorage.setItem("aamovies_refreshtoken", data1.refreshToken);

      const accessToken = localStorage.getItem("aamovies_accesstoken");
      // console.log(accessToken);

      const response2 = await fetch(roleUrl, {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      });

      const data2 = await response2.json();
      if (!response2.ok) {
        alert(`Something Went Wrong:\n ${data2.detail}`);
        return;
      }
      // console.log(data2);

      if (data2 == "admin") {
        location.href = "./homepages/admin-home.html";
        return;
      } else if (data2 == "user") {
        location.href = "./homepages/home.html";
        return;
      } else {
        throw new Error("403 Forbidden");
      }
    } catch (err) {
      alert(`something went Wrong: ${err}`);
      return;
    }

    // alert(
    //   "Welcome to A.A Movies 📺🍿🔥. Have a Happy Watching Experience 😊👍❤️",
    // );

    // window.open("./homepages/home.html", "_self");
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
