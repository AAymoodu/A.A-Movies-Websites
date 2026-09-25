const trendingSectionBtn = document.getElementById("FindMore-btn1");
const MoviesSectionBtn = document.getElementById("FindMore-btn2");
const seriesSectionBtn = document.getElementById("FindMore-btn3");
// console.log(trendingSectionBtn);

const loadHomePage = async () => {
  getAndSetAllMedia();
  getAndSetMovies();
  getAndSetSeries()
};

const getAndSetAllMedia = async () => {
  const url = `http://localhost:3500/media/`;

  const response = await fetch(url);
  const data = await response.json();
  const allMedias = data.allMedia;
  // console.log(allMedias);

  allMedias.forEach((media) => {
    // console.log(media.name);
    const mediaCard = document.createElement("div");
    mediaCard.classList.add(
      "card",
      "text-center",
      "text-bg-secondary",
      "rounded-top-4",
    );
    mediaCard.innerHTML = `<a href="../watch-pages/watch-now-admin.html?id=${media._id}">
                <div class="card-body">
                  <img
                    class="card-img-top rounded-top-4"
                    src="${media.poster}"
                    alt=""
                  />
                </div>
              </a>
              <a class="card-link" href="../watch-pages/watch-now-admin.html?id=${media._id}">
                <div class="card-footer">${media.name}</div>
              </a>`;

    trendingSectionBtn.insertAdjacentElement("beforebegin", mediaCard);
  });
};
const getAndSetMovies = async () => {
  const url = `http://localhost:3500/media/allmedia/movies/`;

  const response = await fetch(url);
  const data = await response.json();
  const allMovies = data.movies;
  // console.log(allMovies);

  allMovies.forEach((movie) => {
    // console.log(movie.name);
    const movieCard = document.createElement("div");
    movieCard.classList.add(
      "card",
      "text-center",
      "text-bg-secondary",
      "rounded-top-4",
    );
    movieCard.innerHTML = `<a href="../watch-pages/watch-now-admin.html?id=${movie._id}">
                <div class="card-body">
                  <img
                    class="card-img-top rounded-top-4"
                    src="${movie.poster}"
                    alt=""
                  />
                </div>
              </a>
              <a class="card-link" href="../watch-pages/watch-now-admin.html?id=${movie._id}">
                <div class="card-footer">${movie.name}</div>
              </a>`;

    MoviesSectionBtn.insertAdjacentElement("beforebegin", movieCard);
  });
};
const getAndSetSeries = async () => {
  const url = `http://localhost:3500/media/allmedia/series`;

  const response = await fetch(url);
  const data = await response.json();
  const allSeries = data.Series;
  // console.log(allSeries);

  allSeries.forEach((series) => {
    // console.log(series.name);
    const seriesCard = document.createElement("div");
    seriesCard.classList.add(
      "card",
      "text-center",
      "text-bg-secondary",
      "rounded-top-4",
    );
    seriesCard.innerHTML = `<a href="../watch-pages/watch-now-admin.html?id=${series._id}">
                <div class="card-body">
                  <img
                    class="card-img-top rounded-top-4"
                    src="${series.poster}"
                    alt=""
                  />
                </div>
              </a>
              <a class="card-link" href="../watch-pages/watch-now-admin.html?id=${series._id}">
                <div class="card-footer">${series.name}</div>
              </a>`;

    seriesSectionBtn.insertAdjacentElement("beforebegin", seriesCard);
  });
};

document.addEventListener("DOMContentLoaded", loadHomePage());
