const getUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const mediaId = params.get("id");
  //   console.log(mediaId);
  return `http://localhost:3500/media/${mediaId}`;
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
  const pillTab = document.getElementById("pills-tab");
  const videoContainer = document.getElementById("video_Container");
  const poster = document.getElementById("media-poster");
  const name = document.getElementById("media-name");
  const description = document.getElementById("media-description");
  const type = document.getElementById("media-type");
  const episodes = [...data.media.episodes];
  console.log(episodes);

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
  const url = getUrl();
  const data = await getMedia(url);
  // console.log(data);
  setMedia(data);
//  videoPlayingScript()
});
