// import { SESSION_STORAGE_KEY } from "./grid.js";
import "./nav.js";
import { search, overlay } from "./nav.js";
const SESSION_STORAGE_KEY = "ANIME-SHOW-info";
const searchForm = document.querySelector(".search");
const infoPage = document.querySelector("[data-info-page]");
const recommendedList = document.querySelector("[data-recommended]");
let animeId = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY)); // get the id MUST change it to a let if you gonna change it occassionally

const getAnimeDetails = async id => {
  const URL = `https://api.jikan.moe/v3/anime/${id}`;
  const response = await fetch(URL);

  try {
    if (response.ok) {
      const data = await response.json();
      animeInfoTemplate(data); // use the anime info to populate the anime info template
      getRecommendation(id); // use the animeId to get recommended
    } else {
      console.log("Anime details error");
    }
  } catch (e) {
    console.error(e);
  }
};

// Initially get the anime details with id that is passed via session storage
getAnimeDetails(animeId);

// Get anime INFO with session storage and display it

const animeInfoTemplate = info => {
  const { image_url, title, genres, background, trailer_url } = info;

  const description = `
      <div class="info flow-content">
      <h1 class="main-heading">${title}</h1>
      <p class="spacer">
        ${background}
      </p>
      <div class="tags">
        <a href="#" class="tag">${genres[0].name}</a>
        <a href="#" class="tag">${genres[1].name}</a>
        <a href="#" class="tag">${genres[2].name}</a>
      </div>
      <div class="cta">
        <a href="${trailer_url}" target="_blank" class="btn-secondary btn-secondary--play">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 0C9.62663 0 7.30655 0.703787 5.33316 2.02236C3.35977 3.34094 1.8217 5.21508 0.913451 7.4078C0.00519945 9.60051 -0.232441 12.0133 0.230582 14.3411C0.693605 16.6689 1.83649 18.807 3.51472 20.4853C5.19295 22.1635 7.33115 23.3064 9.65892 23.7694C11.9867 24.2324 14.3995 23.9948 16.5922 23.0865C18.7849 22.1783 20.6591 20.6402 21.9776 18.6668C23.2962 16.6934 24 14.3734 24 12C23.9965 8.81849 22.731 5.7683 20.4814 3.51863C18.2317 1.26897 15.1815 0.00354552 12 0V0ZM18.4744 12.6486L18.4543 12.6608L9.11889 18.0502L9.09768 18.0625C8.97891 18.1311 8.84418 18.1672 8.70704 18.1672C8.5699 18.1672 8.43517 18.1311 8.31639 18.0626C8.19761 17.994 8.09896 17.8954 8.03036 17.7767C7.96176 17.6579 7.92563 17.5232 7.92558 17.386V6.55814C7.92563 6.421 7.96176 6.28628 8.03036 6.16753C8.09896 6.04877 8.19761 5.95017 8.31639 5.88161C8.43517 5.81306 8.5699 5.77698 8.70704 5.77699C8.84418 5.777 8.97891 5.8131 9.09768 5.88167L9.11889 5.89395L18.4543 11.2833L18.4744 11.2956C18.5931 11.3642 18.6916 11.4629 18.7601 11.5816C18.8286 11.7003 18.8647 11.835 18.8647 11.9721C18.8647 12.1092 18.8286 12.2438 18.7601 12.3626C18.6916 12.4813 18.5931 12.5799 18.4744 12.6486Z"
              fill="#5928E5"
            /></svg>Play Trailer
            </a>

        <a href="#" class="btn-secondary btn-secondary--list">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M13.0769 11.0769H17.7203C18.1291 11.0769 18.4615 11.4088 18.4615 11.8182V12.4895C18.4615 12.899 18.1297 13.2308 17.7203 13.2308H13.0769V17.8742C13.0769 18.2829 12.7451 18.6154 12.3357 18.6154H11.6643C11.2549 18.6154 10.9231 18.2835 10.9231 17.8742V13.2308H6.27968C5.8709 13.2308 5.53846 12.8989 5.53846 12.4895V11.8182C5.53846 11.4087 5.87032 11.0769 6.27968 11.0769H10.9231V6.43353C10.9231 6.02475 11.2549 5.69231 11.6643 5.69231H12.3357C12.7451 5.69231 13.0769 6.02417 13.0769 6.43353V11.0769ZM0 12C0 5.37258 5.37113 0 12 0C18.6274 0 24 5.37113 24 12C24 18.6274 18.6289 24 12 24C5.37258 24 0 18.6289 0 12Z"
          fill="#2C3842" />
      </svg>Add to list</a
        >
      </div>
    </div>
    <div class="image">
      <img src="${image_url}" width="100%" alt="" />
    </div>
  </div>
      `;

  infoPage.innerHTML = description;
};

// Get anime recommendations and add its cards to similar section and addEventListener to get id of recommended card that is clicked and call getAnimeDetails() to repeat all the fucntions again to get new info.

const getRecommendation = async id => {
  const URL = `https://api.jikan.moe/v3/anime/${id}/recommendations`;

  try {
    const response = await fetch(URL);

    if (response.ok) {
      const data = await response.json();
      const recommendedAnime = data.recommendations.slice(0, 4);
      recommendedList.innerHTML = ""; // added this because when you click on a recommended card it will display the previous 4 and the new 4. So i remove the previous for before getting the new 4.
      recommendedAnime.forEach(recommendedCardTemplate);
      recommendedList.addEventListener("click", e => {
        if (e.target.classList.contains("name")) {
          const id = e.target.dataset.id;
          sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(id));
          animeId = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY)); // overwrite the 1st animeId and call the getAnimeDetails() to get new data.
          getAnimeDetails(animeId);
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
};

// Get RECOMMENDED anime with session storage and display it

const recommendedCardTemplate = show => {
  const { image_url, title, recommendation_count, mal_id } = show;

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
              <a class="name" href="#" data-id="${mal_id}">${title}</a>
          </h3>
          <div class="rating">
              <p>${recommendation_count}</p>
              <svg  width="21" height="21" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="#5c2ae5">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
          </div>
      </div>
  </div>
  `;

  recommendedList.innerHTML += card;
};

// /* =============================
//   GET SEARCH
//   ============================== */

searchForm.addEventListener("submit", e => {
  e.preventDefault();
  const animeName = search.value;
  if (!animeName.length) return;
  // Gets what you typed and the saves it and takes you to grid.html where it will call searchedAnime with what your value was

  sessionStorage.setItem("ANIME-SHOW-search", animeName);
  window.location.href = "./grid.html";
  searchForm.reset();
  search.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
});
