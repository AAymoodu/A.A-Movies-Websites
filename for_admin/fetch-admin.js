document.addEventListener("DOMContentLoaded", () => {
  getUserDetails();
});

const getUserDetails = async () => {
  const accessToken = localStorage.getItem("aamovies_accesstoken");
  // console.log(accessToken);
  // const url = `http://localhost:3500/users/user`;
  const url = `https://a-a-movies-websites-backend-server.onrender.com/users/user`;
  const adminName = document.getElementById("admin-name");

  try {
    const response = await fetch(url, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      if (response.status == 401) {
        alert(`${data.detail}`);
        location.href = "../login.html";
        return;
      }
      alert(`${data.detail}`);
      return;
    }

    // console.log(data);
    const username = data.username;
    // console.log(username);
    adminName.textContent = username;
    if (data.userRole !== "admin") {
      alert(`Error 403: you are forbidden`);
      location.href = "../homepages/home.html";
      return;
    }
  } catch (err) {
    alert(`something went Wrong: ${err}`);
    return;
  }
};
// getUserDetails()
