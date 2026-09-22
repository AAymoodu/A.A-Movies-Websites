const inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
  console.log(input.parentElement.childNodes[5]);
  input.addEventListener("input", () => {
    input.parentElement.classList.remove("invalid");
    input.parentElement.classList.add("correct");
    input.parentElement.childNodes[5].textContent = "";
  });
});

const loading = document.getElementById("bootstrapLoading");
document.querySelector("#Form").addEventListener("submit", (formsubmit) => {
  formsubmit.preventDefault();
  validateForm();
  formCompleted();
});

const validateForm = () => {
  const media_Inputs = document.querySelectorAll("div.media-inputs");
  const errorText = document.querySelectorAll(".error");

  // Reset Error and correct indicators
  media_Inputs.forEach((input) => {
    input.classList.remove("correct", "invalid");
  });

  // Reset Error text
  errorText.forEach((text) => {
    text.textContent = "";
  });

  // Poster  Validation 👇
  const poster = document.querySelector("#poster");
  const poster_input = document.querySelector("#poster-input");
  const poster_error_text = document.querySelector("#poster-err");

  // console.log(poster_input);
  if (poster.value == "") {
    poster_input.classList.add("invalid");
    poster_error_text.textContent = "This field is Required";
  } else {
    poster_input.classList.add("correct");
    poster_error_text.textContent = "";
  }

  poster.addEventListener("input", () => {
    poster_input.classList.remove("invalid");
    poster_input.classList.add("correct");
    poster_error_text.textContent = "";
  });
  // Poster  Validation 👆

  // name  Validation 👇
  const name = document.querySelector("#name");
  const name_input = document.querySelector("#name-input");
  const name_error_text = document.querySelector("#name-err");

  // console.log(name_input);
  if (name.value == "") {
    name_input.classList.add("invalid");
    name_error_text.textContent = "This field is Required";
  } else {
    name_input.classList.add("correct");
    name_error_text.textContent = "";
  }

  name.addEventListener("input", () => {
    name_input.classList.remove("invalid");
    name_input.classList.add("correct");
    name_error_text.textContent = "";
  });
  // name  Validation 👆

  // description  Validation 👇
  const description = document.querySelector("#description");
  const description_input = document.querySelector("#description-input");
  const description_error_text = document.querySelector("#description-err");

  // console.log(description_input);
  if (description.value == "") {
    description_input.classList.add("invalid");
    description_error_text.textContent = "This field is Required";
  } else {
    description_input.classList.add("correct");
    description_error_text.textContent = "";
  }

  description.addEventListener("input", () => {
    description_input.classList.remove("invalid");
    description_input.classList.add("correct");
    description_error_text.textContent = "";
  });
  // description  Validation 👆

  // type  Validation 👇
  const type = document.querySelector("#media-type");
  const type_input = document.querySelector("#type-input");
  const type_error_text = document.querySelector("#type-err");

  //   console.log(type.value);
  if (type.value == "") {
    type_input.classList.add("invalid");
    type_error_text.textContent = "This field is Required";
  } else {
    type_input.classList.add("correct");
    type_error_text.textContent = "";
  }

  type.addEventListener("input", () => {
    type_input.classList.remove("invalid");
    type_input.classList.add("correct");
    type_error_text.textContent = "";
  });
  // type  Validation 👆
};

const formCompleted = async () => {
  loading.style.display = "inline-block";
  const error = document.querySelectorAll(".error");
  //   console.log(error);
  const error_Array = [...error];
  //   console.log(error_Array);

  if (error_Array.every((error) => error.textContent == "")) {
    const url = `http://localhost:3500/media/addmedia`;

    const poster = document.getElementById("poster").value;
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const type = document.getElementById("media-type").value;
    // console.log(type);
    const episodeLinks = [...document.querySelectorAll(".episode")];
    const episodes = episodeLinks.map((episode) => episode.value);

    const payload = {
      poster,
      name,
      description,
      type,
      episodes,
    };
    // console.log(payload);
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        alert(`Something Went Wrong: ${data.detail}`);
        loading.style.display = "none";
        return;
      }
      console.log(data);
      alert(`${data.detail}`);
      loading.style.display = "none";
    } catch (err) {
      alert(`something went Wrong: ${err}`);
      loading.style.display = "none";
      return;
    }
  } else {
    loading.style.display = "none";
    return;
  }
};
