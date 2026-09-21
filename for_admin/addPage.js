// // const hidden_cards = document.querySelectorAll(".ShowMore");
// const trendingSectionGrid = document.querySelector("div#Trending-section-grid");
// const button1 = document.querySelector("#show-more-btn");

// const showMore = () => {
//   //  hidden_cards.forEach((value) => value.style.display="block");
//   if (!(trendingSectionGrid.style.height === "auto")) {
//     trendingSectionGrid.style.height = "auto";
//     button1.textContent = "Hide";
//   } else {
//     trendingSectionGrid.style.height = "26.5rem"; //👈 Use this
//     //  trendingSectionGrid.style.height = "";      // 👈 Or this
//     button1.textContent = "Show More";
//   }
// };

// CODE TO COLLAPSE SIDE NAVIGATION
const collapseSideNav = () => {
  const sideNavigation = document.querySelector("section#Side-navigation");
  sideNavigation.classList.toggle("c00lapse");
};

const sideNavigation_imgButton = document.querySelectorAll(
  "section#Side-navigation ul li img",
);
sideNavigation_imgButton.forEach((image) => {
  image.addEventListener("click", collapseSideNav);
});

const mediaType = document.getElementById("media-type");
// console.log(mediaType.value);
const episodeController = document.getElementById("episode-controller");
const episodeList = document.getElementById("episode-list");

mediaType.addEventListener("change", (event) => {
  const selectedValue = event.target.value;
  // console.log(selectedValue);
  if (selectedValue == "Movie") {
    movieEpisodeRemover();
    episodeController.style.display = "none";
    movieEpisodeMaker();
    return;
  } else if (selectedValue == "Series") {
    episodeController.style.display = "flex";
    movieEpisodeRemover();
    return;
  }
});

const movieEpisodeMaker = () => {
  const episodeDiv = document.createElement("div");
  episodeDiv.classList.add("episodes");
  episodeDiv.innerHTML = ` <label for="episode1"
                  >ep <span class="episode-number">1</span>:</label
                >
                <input id="episode1" type="text" class="episode"/>`;
  episodeList.append(episodeDiv);
};

const movieEpisodeRemover = () => {
  const episodeDiv = document.querySelectorAll("div.episodes");
  episodeDiv.forEach((episode) => episode.remove());
};

const episodeControllerInput = document.getElementById(
  "episode-controller-input",
);

const createEpisodeBtn = document.getElementById("episode-controller-button");
createEpisodeBtn.addEventListener("click", (create) => {
  create.preventDefault();
  episodeList.innerHTML=``
  const episodeNumber = parseInt(episodeControllerInput.value);
  // console.log(episodeNumber);
  for (let i = 0; i < episodeNumber; i++) {
    seriesEpisodeMaker(i)
  }
});

const seriesEpisodeMaker = (i) => {
  const episodeDiv = document.createElement("div");
  episodeDiv.classList.add("episodes");
  episodeDiv.innerHTML = ` <label for="episode${i + 1}"
                  >ep <span class="episode-number">${i + 1}</span>:</label
                >
                <input id="episode${i + 1}" type="text" class="episode"/>`;
  episodeList.append(episodeDiv);
};
