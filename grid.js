import { search, overlay } from "./nav.js";
// import "./nav.js";

const popularSeries = document.querySelector("[data-popular-anime]");
const searchForm = document.querySelector(".search");
export const SESSION_STORAGE_KEY = "ANIME-SHOW-info";

// To round off the rating to only 1 decimal place.

const roundedOff = score => score.toFixed(1);

 const animeCardTemplate = show => {
  const { image_url, mal_id, title, score } = show;
  const rating = roundedOff(score);
  const card = `
      <div class="anime-card flow-content">
          <div class="image">  
              <a href="#">
                  <svg  class="heart" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.3531 10.5C13.8063 10.5 11.7063 12.5553 11.7063 15.1468C11.7063 17.6936 13.7616 19.7936 16.3531 19.7936C18.9446 19.7936 20.9999 17.7383 20.9999 15.1468C20.9999 12.5553 18.9446 10.5 16.3531 10.5ZM18.8106 15.817H17.2467C17.1127 15.817 17.0233 15.9064 17.0233 16.0404V17.6043C17.0233 17.9617 16.7106 18.2745 16.3531 18.2745C15.9957 18.2745 15.6829 17.9617 15.6829 17.6043V16.0404C15.6829 15.9064 15.5935 15.817 15.4595 15.817H13.8957C13.5382 15.817 13.2254 15.5043 13.2254 15.1468C13.2254 14.7894 13.5382 14.4766 13.8957 14.4766H15.4595C15.5935 14.4766 15.6829 14.3872 15.6829 14.2532V12.6894C15.6829 12.3319 15.9957 12.0191 16.3531 12.0191C16.7106 12.0191 17.0233 12.3319 17.0233 12.6894V14.2532C17.0233 14.3872 17.1127 14.4766 17.2467 14.4766H18.8106C19.168 14.4766 19.4808 14.7894 19.4808 15.1468C19.4808 15.5043 19.2127 15.817 18.8106 15.817Z" fill="#FFD9D9"/>
                  <path d="M10.4106 14.566C10.6787 11.8851 12.734 9.69575 15.3702 9.24894C16.9787 8.98085 18.4979 9.38298 19.7043 10.1872C19.7489 10.2319 19.8383 10.1872 19.8383 10.1426C20.5532 8.53404 20.9553 7.10426 20.9553 6.0766C20.9553 2.72553 18.4979 0 15.5043 0C13.5383 0 11.7064 1.20638 10.7681 3.0383C10.6787 3.17234 10.4553 3.17234 10.4106 3.0383C9.42766 1.20638 7.64043 0 5.58511 0C2.50213 0 0 2.77021 0 6.21064C0 9.74043 3.84255 16.2191 10.2766 20.9106C10.366 20.9553 10.4106 21 10.5 21C10.5894 21 10.634 21 10.7234 20.9553C11.3043 20.5979 11.8404 20.1957 12.3766 19.7489C12.4213 19.7043 12.4213 19.6149 12.3766 19.5702C10.9915 18.3638 10.2319 16.5319 10.4106 14.566Z" fill="#FFD9D9"/>
                  </svg>
                  <img class="poster" src="${image_url}" alt="">
              </a>
          </div>
          <div class="info">
              <h3 class="title">
                  <a class="name" href="info-page.html" data-id="${mal_id}">${title}</a>
              </h3>
              <div class="rating">
                  <p>${rating}</p>     
              </div>
          </div>
      </div>
      `;

  popularSeries.innerHTML += card;
};

export const getAnimeShows = async () => {
  const URL = "https://api.jikan.moe/v3/top/anime/1/tv"; // get top shows
  const response = await fetch(URL);
  try {
    if (response.ok) {
      const data = await response.json();
      const topShows = data.top.slice(0, 20);
      topShows.forEach(animeCardTemplate);
    } else {
      console.log("shows error");
    }
  } catch (e) {
    console.error(e);
  }
};

getAnimeShows();

// /* =============================
//   GET SEARCH
//   ============================== */

const searchedAnime = async animeName => {
  const URL = `https://api.jikan.moe/v3/search/anime?q=${animeName}`;
  const response = await fetch(URL);
  console.log("Response: ", response);

  try {
    if (!response.ok) return console.log("Anime search error");
    const data = await response.json();
    console.log("Data: ", data);
    const shows = data.results.slice(0, 20);
    // console.log(shows);
    popularSeries.innerHTML = "";
    shows.forEach(animeCardTemplate);
  } catch (e) {
    console.error(e);
  }
};

searchForm.addEventListener("submit", e => {
  e.preventDefault();
  const animeName = search.value;
  if (!animeName.length) return;
  // console.log(animeName);
  searchedAnime(animeName);
  searchForm.reset();
  search.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
});

// Get anime id when clicked to get anime details

document.body.addEventListener("click", e => {
  if (e.target.classList.contains("name")) {
    const animeId = e.target.dataset.id;
    // console.log(animeId);
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(animeId)); //  stores anime id in session storage
  }
});
