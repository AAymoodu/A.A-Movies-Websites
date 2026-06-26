const videos = document.querySelectorAll(".lazy-videos");
console.log(videos);
videos.forEach((video) => {
  console.log(video.children[0].getAttribute("src"));
});

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
    }
    else{
      const lazy_video = entry.target;
      lazy_video.pause() // pauses the video once it leaves the viewport
    }
  });
}, observerSettings);

videos.forEach((video) => {
  observer.observe(video);
});
