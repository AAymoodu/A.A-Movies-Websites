const addEpisodeBtn = document.getElementById("add-episode");
// console.log(addEpisodeBtn);
addEpisodeBtn.addEventListener("click", (btnEvent) => {
  btnEvent.preventDefault();
  const episodeList = document.getElementById("episode-list");
  const episodeNumber = document.querySelectorAll(".episode").length + 1;
  // console.log(episodeNumber);

  const episodeDiv = document.createElement("div");
  episodeDiv.classList.add("episode");
  episodeDiv.innerHTML = `  <label for="episode${episodeNumber}"
                >ep <span class="episode-number">${episodeNumber}</span>:</label
              >
              <input id="episode${episodeNumber}" type="text" />`;
  episodeList.append(episodeDiv);
});

const deleteEpisodeBtn = document.getElementById("delete-episode");
// deleteEpisodeBtn.addEventListener("click", (btnEvent) => {
//   btnEvent.preventDefault();
//   const episodes = [...document.querySelectorAll(".episode input")];
//   const deletingEpisode = episodes.map((episode) => episode.value);
//   deletingEpisode.pop();

//   const episodeList = document.getElementById("episode-list");
//   episodeList.innerHTML = ``;
//   deletingEpisode.forEach((episode) => {
//     const episodeNumber = deletingEpisode.indexOf(episode) + 1;
//     // console.log(episodeNumber);

//     const episodeDiv = document.createElement("div");
//     episodeDiv.classList.add("episode");
//     episodeDiv.innerHTML = `  <label for="episode${episodeNumber}"
//                 >ep <span class="episode-number">${episodeNumber}</span>:</label
//               >
//               <input id="episode${episodeNumber}" type="text" />`;
//     episodeList.append(episodeDiv);
//     const episodeInput = document.getElementById(`episode${episodeNumber}`);
//     // console.log(episodeInput);
//     episodeInput.value = `${episode}`;
//   });
// });

deleteEpisodeBtn.addEventListener("click", (btnEvent) => {
  btnEvent.preventDefault();
  const episodes = [...document.querySelectorAll(".episode")];
  // console.log(episodes);

  const lastEpisode = episodes.at(-1);
  // console.log(lastEpisode);
  lastEpisode.remove();
});

const getUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const mediaId = params.get("id");
  //   console.log(mediaId);
  return { url: `http://localhost:3500/media/${mediaId}`, id: mediaId };
};

const getMedia = async (url) => {
  //   console.log(url);

  try {
    const response = await fetch(url, {
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      alert(`${data.detail}`);
      return;
    }
    // console.log(data);
    return data;
  } catch (err) {
    alert(`something went Wrong: ${err}`);
    return;
  }
};

const setMedia = (data) => {
  const title = document.querySelector("title");
  const pillTab = document.getElementById("pills-tab");
  const videoContainer = document.getElementById("video_Container");
  const poster = document.getElementById("media-poster");
  const name = document.getElementById("media-name");
  const description = document.getElementById("media-description");
  const type = document.getElementById("media-type");
  const episodes = [...data.media.episodes];
  // console.log(episodes);

  title.innerText = `Now Watching: ${data.media.name}`;

  poster.setAttribute("src", data.media.poster);
  name.textContent = `${data.media.name}`;
  description.textContent = `${data.media.description}`;
  type.textContent = `${data.media.type}`;

  episodes.forEach((episode) => {
    const episodeNumber = episodes.indexOf(episode) + 1;
    // console.log(episodeNumber);

    const originalId = `${data.media.name}_EP_${episodeNumber}`;
    const cleanedId = originalId.replace(/[\s:\(\)]/g, "");
    // console.log(cleanedId);

    const episodeLink = document.createElement("li");
    episodeLink.classList.add("nav-item");
    episodeLink.setAttribute("role", "presentation");

    const episodeVideoWrapper = document.createElement("div");
    episodeVideoWrapper.classList.add("tab-pane");
    episodeVideoWrapper.classList.add("fade");
    episodeVideoWrapper.id = `${cleanedId}_video`;
    episodeVideoWrapper.setAttribute("role", "tabpanel");
    episodeVideoWrapper.setAttribute(
      "aria-labelledby",
      `${cleanedId}_video-tab`,
    );
    episodeVideoWrapper.setAttribute("tabindex", "0");
    episodeVideoWrapper.innerHTML = `<video controls class="lazy-videos">
                <source
                  src="${episode}"
                  type="video/webm"
                />
              </video>`;
    // console.log(episodeVideoWrapper.getAttribute("tabindex"));

    if (episodeNumber == 1) {
      episodeLink.innerHTML = `  <button
                  class="nav-link active"
                  id="${cleanedId}"
                  data-bs-toggle="pill"
                  data-bs-target="#${cleanedId}_video"
                  type="button"
                  role="tab"
                  aria-controls="${cleanedId}_video"
                  aria-selected="true"
                >
                  Ep-${episodeNumber}
                </button>`;

      episodeVideoWrapper.classList.add("show");
      episodeVideoWrapper.classList.add("active");
    } else {
      episodeLink.innerHTML = `  <button
                    class="nav-link"
                    id="${cleanedId}"
                    data-bs-toggle="pill"
                    data-bs-target="#${cleanedId}_video"
                    type="button"
                    role="tab"
                    aria-controls="${cleanedId}_video"
                    aria-selected="true"
                  >
                    Ep-${episodeNumber}
                  </button>`;
    }

    pillTab.append(episodeLink);
    videoContainer.append(episodeVideoWrapper);
  });
};

const setEditMedia = (data) => {
  const posterValue = (document.getElementById("poster").value =
    `${data.media.poster}`);
  const nameValue = (document.getElementById("name").value =
    `${data.media.name}`);
  const descriptionValue = (document.getElementById("description").value =
    `${data.media.description}`);
  const typeValue = (document.getElementById("edit-type").value =
    `${data.media.type}`);

  const episodeList = document.getElementById("episode-list");
  const allEpisodes = data.media.episodes;
  // console.log(allEpisodes);

  allEpisodes.forEach((episode) => {
    const episodeNumber = allEpisodes.indexOf(episode) + 1;
    // console.log(episodeNumber);

    const episodeDiv = document.createElement("div");
    episodeDiv.classList.add("episode");
    episodeDiv.innerHTML = `  <label for="episode${episodeNumber}"
                >ep <span class="episode-number">${episodeNumber}</span>:</label
              >
              <input id="episode${episodeNumber}" type="text" />`;
    episodeList.append(episodeDiv);
    const episodeInput = document.getElementById(`episode${episodeNumber}`);
    // console.log(episodeInput);
    episodeInput.value = `${episode}`;
  });
};

const videoPlayingScript = () => {
  const videos = document.querySelectorAll(".lazy-videos");
  console.log(videos);
  // videos.forEach((video) => {
  //   console.log(video.children[0].getAttribute("src"));
  // });

  const observerSettings = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1, //trigger when 10% of element enter the viewport
  };

  const observer = new IntersectionObserver((entries, observing) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazy_video = entry.target;
        lazy_video.play(); //plays the video once it enters the viewport
        // observing.unobserve(entry.target);
      } else {
        const lazy_video = entry.target;
        lazy_video.pause(); // pauses the video once it leaves the viewport
      }
    });
  }, observerSettings);

  videos.forEach((video) => {
    observer.observe(video);
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  const { url, id } = getUrl();
  const data = await getMedia(url);
  // console.log(data);
  setMedia(data);
  videoPlayingScript();
  setEditMedia(data);

  editButton.addEventListener("click", (btnEvent) => {
    btnEvent.preventDefault();
    editMedia(data);
  });
  deleteButton.addEventListener("click", (btnEvent) => {
    btnEvent.preventDefault();
    deleteMedia(url);
  });
});

const editButton = document.getElementById("edit");
// console.log(editButton);
const editMedia = async (data) => {
  const loading = document.getElementById("bootstrapLoading");
  loading.style.display = "inline-block";

  const params = new URLSearchParams(window.location.search);
  const mediaId = params.get("id");
  const url = `http://localhost:3500/media/${mediaId}`;

  // console.log(data);
  const posterValue = document.getElementById("poster").value;
  const nameValue = document.getElementById("name").value;
  const descriptionValue = document.getElementById("description").value;
  const typeValue = document.getElementById("edit-type").value;
  const episodeLinks = [...document.querySelectorAll(".episode input")];
  const episodes = episodeLinks.map((episode) => episode.value);

  // console.log(episodes);

  if (nameValue == data.media.name) {
    const payload = {
      poster: posterValue,
      description: descriptionValue,
      type: typeValue,
      episodes,
    };

    // console.log(payload);
    const accessToken = localStorage.getItem("aamovies_accesstoken");
    // console.log(accessToken);
    try {
      const response = await fetch(url, {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      });

      const editedData = await response.json();
      if (!response.ok) {
        alert(`Something Went Wrong: ${editedData.detail}`);
        loading.style.display = "none";
        return;
      }

      // console.log(editedData);
      alert(`${editedData.detail}`);
      loading.style.display = "none";
      const id = editedData.media._id;
      // location.href = `../watch-pages/watch-now-admin.html?id=${data.media._id}`;
      location.href = `../watch-pages/watch-now-admin.html?id=${id}`;
    } catch (err) {
      alert(`something went Wrong: ${err}`);
      loading.style.display = "none";
      return;
    }
  } else {
    const payload = {
      poster: posterValue,
      name: nameValue,
      description: descriptionValue,
      type: typeValue,
      episodes,
    };

    // console.log(payload);
    const accessToken = localStorage.getItem("aamovies_accesstoken");
    // console.log(accessToken);
    try {
      const response = await fetch(url, {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      });

      const editedData = await response.json();
      if (!response.ok) {
        alert(`Something Went Wrong: ${editedData.detail}`);
        loading.style.display = "none";
        return;
      }

      // console.log(editedData);
      alert(`${editedData.detail}`);
      loading.style.display = "none";
      const id = editedData.media._id;
      // location.href = `../watch-pages/watch-now-admin.html?id=${data.media._id}`;
      location.href = `../watch-pages/watch-now-admin.html?id=${id}`;
    } catch (err) {
      alert(`something went Wrong: ${err}`);
      loading.style.display = "none";
      return;
    }
  }
};

const deleteButton = document.getElementById("delete");
// console.log(deleteButton);
const deleteMedia = async (url) => {
  const deleteLoading = document.getElementById("bootstrapLoading2");
  deleteLoading.style.display = "inline-block";
  // console.log(url);
  const accessToken = localStorage.getItem("aamovies_accesstoken");
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      alert(`Something Went Wrong: ${data.detail}`);
      deleteLoading.style.display = "none";
      return;
    }
    alert(`${data.detail}`);
    deleteLoading.style.display = "none";
    location.href=`../homepages/admin-home.html`
  } catch (err) {
    alert(`something went Wrong: ${err}`);
    deleteLoading.style.display = "none";
    return;
  }
};
