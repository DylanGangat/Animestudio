import { SESSION_STORAGE_KEY } from "./grid.js";

const infoPage = document.querySelector("[data-info-page]");
// const info = JSON.parse(sessionStorage.getItem("ANIME-SHOW-info"));
const info = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY));
console.log(info);

export const animeInfoTemplate = info => {
  const { titles, genres, cover_image, descriptions } = info;
  const description = `
      <div class="info flow-content">
      <h1 class="main-heading">${titles.en}</h1>
      <p class="spacer">
        ${descriptions.en}
      </p>
      <div class="tags">
        <a href="#" class="tag">${genres[0]}</a>
        <a href="#" class="tag">${genres[1]}</a>
        <a href="#" class="tag">${genres[2]}</a>
        <a href="#" class="tag">${genres[3]}</a>
      </div>
      <div class="cta">
        <!-- <a href="#" class="btn-secondary btn-secondary--play">
                  <img src="images/play button.svg" alt="" />Play</a
                > -->
        <a href="#" class="btn-secondary btn-secondary--play">
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
            /></svg>Play
            </a>
  
        <a href="#" class="btn-secondary btn-secondary--list">
          <img src="images/add button.svg" alt="" />Add to list</a
        >
      </div>
    </div>
    <div class="image">
      <img src="${cover_image}" width="420px" alt="" />
    </div>
  </div>
      `;
  infoPage.innerHTML = description;
};

animeInfoTemplate(info);
