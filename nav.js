const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const openAccordian = document.querySelectorAll(".open-accordian");
export const search = document.querySelector(".search input");
export const overlay = document.querySelector(".overlay");
const genreDropdown = document.querySelector("[data-genre]");
export const SESSION_STORAGE_KEY = "ANIME-SHOW-info";
const LOCAL_STORAGE_KEY = "GENRE-ID";

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

// Genre event listener

// Get the genre id when clicking one of the types of genres in the navigation & store in localStorage

genreDropdown.addEventListener("click", e => {
  if (e.target.dataset.genreId) {
    const genreId = e.target.dataset.genreId;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(genreId));
  }
});
