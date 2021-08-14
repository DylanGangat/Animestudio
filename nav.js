const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const openAccordian = document.querySelectorAll(".open-accordian");
export const search = document.querySelector(".search input");
export const overlay = document.querySelector(".overlay");


// hamburger menu toggle

navToggle.addEventListener("click", () => {
  if (search.className != "hidden") {
    overlay.classList.add("hidden");
    search.classList.add("hidden");
  }
  overlay.classList.toggle("hidden");
  nav.classList.toggle("hidden");
});

overlay.addEventListener("click", e => {
  overlay.classList.add("hidden");
  nav.classList.add("hidden");
  search.classList.add("hidden");
});

// nav menu list items

openAccordian.forEach(item => {
  item.addEventListener("click", e => {
    // console.log(e.currentTarget);
    const dropdown = e.currentTarget.querySelector(".dropdown-menu");
    const rotate = e.currentTarget.querySelector("span");
    dropdown.classList.toggle("hidden");
    rotate.classList.toggle("rotate");
  });
});

// search button in nav

search.addEventListener("click", e => {
  if (nav.className != "nav hidden") {
    overlay.classList.add("hidden");
    nav.classList.add("hidden");
  }
  e.preventDefault();
  search.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
});

