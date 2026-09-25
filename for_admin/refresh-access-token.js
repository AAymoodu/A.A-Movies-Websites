const refreshTokenAtIntervals = () => {
  refreshAccessTokenFunction()

  setInterval(() => {
    refreshAccessTokenFunction();
  }, 1080000);
};

const refreshAccessTokenFunction = async () => {
  const refreshToken = localStorage.getItem("aamovies_refreshtoken");
  if (!refreshToken) {
    location.href = "../login.html";
    return;
  }
  const url = `http://localhost:3500/users/accesstoken`;
  const payload = {
    refreshToken,
  };
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
      if (response.status == 401) {
        alert(`${data.detail}`);
        location.href = "../login.html";
        return;
      }
      if (response.status == 404) {
        alert(`${data.detail}`);
        location.href = "../login.html";
        return;
      }
      //   Something Went Wrong
      alert(`${data.detail}`);
      location.href = "../login.html";
      return;
    }
    console.log(data);

    localStorage.setItem("aamovies_accesstoken", data.accessToken);
  } catch (err) {
    alert(`something went Wrong: ${err}`);
    return;
  }
};

document.addEventListener("DOMContentLoaded", refreshTokenAtIntervals);
