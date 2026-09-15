// const hidden_cards = document.querySelectorAll(".ShowMore");
const trendingSectionGrid = document.querySelector("div#Trending-section-grid");
const button1 = document.querySelector("#show-more-btn");

const showMore = () => {
  //  hidden_cards.forEach((value) => value.style.display="block");
  if (!(trendingSectionGrid.style.height === "auto")) {
    trendingSectionGrid.style.height = "auto";
    button1.textContent ="Hide"
  } else {
    trendingSectionGrid.style.height = "26.5rem";  //👈 Use this 
    //  trendingSectionGrid.style.height = "";      // 👈 Or this 
    button1.textContent = "Show More";
  }
};


// CODE TO COLLAPSE SIDE NAVIGATION
const collapseSideNav = () =>{
  const sideNavigation = document.querySelector("section#Side-navigation");
  sideNavigation.classList.toggle("c00lapse");
}

const sideNavigation_imgButton = document.querySelectorAll(
  "section#Side-navigation ul li img",
);
sideNavigation_imgButton.forEach((image) => {
  image.addEventListener('click',collapseSideNav)
})