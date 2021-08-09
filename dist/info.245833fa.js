// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"grid.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAnimeShows = exports.SESSION_STORAGE_KEY = void 0;
const popularSeries = document.querySelector("[data-popular-anime]");
const SESSION_STORAGE_KEY = "ANIME-SHOW-info"; // const cardTemplate = show => {
//   const { cover_image, id, titles, score } = show;
//   const card = `
//       <div class="anime-card flow-content">
//           <div class="image">
//               <a href="#">
//                   <svg  class="heart" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M16.3531 10.5C13.8063 10.5 11.7063 12.5553 11.7063 15.1468C11.7063 17.6936 13.7616 19.7936 16.3531 19.7936C18.9446 19.7936 20.9999 17.7383 20.9999 15.1468C20.9999 12.5553 18.9446 10.5 16.3531 10.5ZM18.8106 15.817H17.2467C17.1127 15.817 17.0233 15.9064 17.0233 16.0404V17.6043C17.0233 17.9617 16.7106 18.2745 16.3531 18.2745C15.9957 18.2745 15.6829 17.9617 15.6829 17.6043V16.0404C15.6829 15.9064 15.5935 15.817 15.4595 15.817H13.8957C13.5382 15.817 13.2254 15.5043 13.2254 15.1468C13.2254 14.7894 13.5382 14.4766 13.8957 14.4766H15.4595C15.5935 14.4766 15.6829 14.3872 15.6829 14.2532V12.6894C15.6829 12.3319 15.9957 12.0191 16.3531 12.0191C16.7106 12.0191 17.0233 12.3319 17.0233 12.6894V14.2532C17.0233 14.3872 17.1127 14.4766 17.2467 14.4766H18.8106C19.168 14.4766 19.4808 14.7894 19.4808 15.1468C19.4808 15.5043 19.2127 15.817 18.8106 15.817Z" fill="#FFD9D9"/>
//                   <path d="M10.4106 14.566C10.6787 11.8851 12.734 9.69575 15.3702 9.24894C16.9787 8.98085 18.4979 9.38298 19.7043 10.1872C19.7489 10.2319 19.8383 10.1872 19.8383 10.1426C20.5532 8.53404 20.9553 7.10426 20.9553 6.0766C20.9553 2.72553 18.4979 0 15.5043 0C13.5383 0 11.7064 1.20638 10.7681 3.0383C10.6787 3.17234 10.4553 3.17234 10.4106 3.0383C9.42766 1.20638 7.64043 0 5.58511 0C2.50213 0 0 2.77021 0 6.21064C0 9.74043 3.84255 16.2191 10.2766 20.9106C10.366 20.9553 10.4106 21 10.5 21C10.5894 21 10.634 21 10.7234 20.9553C11.3043 20.5979 11.8404 20.1957 12.3766 19.7489C12.4213 19.7043 12.4213 19.6149 12.3766 19.5702C10.9915 18.3638 10.2319 16.5319 10.4106 14.566Z" fill="#FFD9D9"/>
//                   </svg>
//                   <img class="poster" src="${cover_image}" alt="">
//               </a>
//           </div>
//           <div class="info">
//               <h3 class="title">
//                   <a class="name" href="info-page.html" data-id="${id}">${titles.en}</a>
//               </h3>
//               <div class="rating">
//                   <p>${score}</p>
//               </div>
//           </div>
//       </div>
//       `;
//   popularSeries.innerHTML += card;
// };

exports.SESSION_STORAGE_KEY = SESSION_STORAGE_KEY;

const animeCardTemplate = show => {
  const {
    image_url,
    mal_id,
    title,
    score
  } = show;
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
                  <p>${score}</p>
                  
              </div>
          </div>
      </div>
      `;
  popularSeries.innerHTML += card;
};

const getAnimeShows = async () => {
  const URL = "https://api.jikan.moe/v3/top/anime/1/tv"; // get top shows

  const response = await fetch(URL);

  try {
    if (response.ok) {
      const data = await response.json();
      const topShows = data.top.slice(0, 20);
      topShows.forEach(animeCardTemplate);
      document.body.addEventListener("click", e => {
        if (e.target.classList.contains("name")) {
          const animeId = e.target.dataset.id;
          console.log("clicked:", animeId); // getAnimeDetails(id);

          sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(animeId)); //  stores anime id in session storage
        }
      });
      console.log("Anime Shows:", topShows);
    } else {
      console.log("shows error");
    }
  } catch (e) {
    console.error(e);
  }
}; // const getAnimeDetails = async id => {
//   const URL = `https://api.jikan.moe/v3/anime/${id}`;
//   const response = await fetch(URL); // GET SHOWS DETAILS
//   try {
//     if (response.ok) {
//       const data = await response.json();
//       console.log("Anime Details:", data);
//       sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(data));
//     } else {
//       console.log("Anime details error");
//     }
//   } catch (e) {
//     console.error(e);
//   }
// };

/* =============================
  GET SEARCH
  ============================== */
// const URL = `https://api.jikan.moe/v3/search/anime?q=${animeName}`;


exports.getAnimeShows = getAnimeShows;
},{}],"info.js":[function(require,module,exports) {
"use strict";

var _grid = require("./grid.js");

// import { SESSION_STORAGE_KEY } from "./grid.js";
// const infoPage = document.querySelector("[data-info-page]");
// // const info = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY));
// const recommendedList = document.querySelector("[data-recommended]");
// const animeId = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY)); // get the id MUST change it to a let if you gonna change it occassionally
// console.log(animeId);
// const getAnimeDetails = async id => {
//   const URL = `https://api.jikan.moe/v3/anime/${id}`;
//   const response = await fetch(URL); // GET SHOWS DETAILS
//   try {
//     if (response.ok) {
//       const data = await response.json();
//       console.log("Anime Details:", data);
//       animeInfoTemplate(data); // use the anime info to populate the anime info template
//       getRecommendation(id); // use the animeId to get recommended
//     } else {
//       console.log("Anime details error");
//     }
//   } catch (e) {
//     console.error(e);
//   }
// };
// getAnimeDetails(animeId);
// // Get anime INFO with session storage and display it
// const animeInfoTemplate = info => {
//   const { image_url, title, genres, background } = info;
//   const description = `
//       <div class="info flow-content">
//       <h1 class="main-heading">${title}</h1>
//       <p class="spacer">
//         ${background}
//       </p>
//       <div class="tags">
//         <a href="#" class="tag">${genres[0].name}</a>
//         <a href="#" class="tag">${genres[1].name}</a>
//         <a href="#" class="tag">${genres[2].name}</a>
//         <a href="#" class="tag">${genres[3].name}</a>
//       </div>
//       <div class="cta">
//         <!-- <a href="#" class="btn-secondary btn-secondary--play">
//                   <img src="images/play button.svg" alt="" />Play</a
//                 > -->
//         <a href="#" class="btn-secondary btn-secondary--play">
//           <svg
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M12 0C9.62663 0 7.30655 0.703787 5.33316 2.02236C3.35977 3.34094 1.8217 5.21508 0.913451 7.4078C0.00519945 9.60051 -0.232441 12.0133 0.230582 14.3411C0.693605 16.6689 1.83649 18.807 3.51472 20.4853C5.19295 22.1635 7.33115 23.3064 9.65892 23.7694C11.9867 24.2324 14.3995 23.9948 16.5922 23.0865C18.7849 22.1783 20.6591 20.6402 21.9776 18.6668C23.2962 16.6934 24 14.3734 24 12C23.9965 8.81849 22.731 5.7683 20.4814 3.51863C18.2317 1.26897 15.1815 0.00354552 12 0V0ZM18.4744 12.6486L18.4543 12.6608L9.11889 18.0502L9.09768 18.0625C8.97891 18.1311 8.84418 18.1672 8.70704 18.1672C8.5699 18.1672 8.43517 18.1311 8.31639 18.0626C8.19761 17.994 8.09896 17.8954 8.03036 17.7767C7.96176 17.6579 7.92563 17.5232 7.92558 17.386V6.55814C7.92563 6.421 7.96176 6.28628 8.03036 6.16753C8.09896 6.04877 8.19761 5.95017 8.31639 5.88161C8.43517 5.81306 8.5699 5.77698 8.70704 5.77699C8.84418 5.777 8.97891 5.8131 9.09768 5.88167L9.11889 5.89395L18.4543 11.2833L18.4744 11.2956C18.5931 11.3642 18.6916 11.4629 18.7601 11.5816C18.8286 11.7003 18.8647 11.835 18.8647 11.9721C18.8647 12.1092 18.8286 12.2438 18.7601 12.3626C18.6916 12.4813 18.5931 12.5799 18.4744 12.6486Z"
//               fill="#5928E5"
//             /></svg>Play
//             </a>
//         <a href="#" class="btn-secondary btn-secondary--list">
//           <img src="images/add button.svg" alt="" />Add to list</a
//         >
//       </div>
//     </div>
//     <div class="image">
//       <img src="${image_url}" width="420px" alt="" />
//     </div>
//   </div>
//       `;
//   infoPage.innerHTML = description;
// };
// const getRecommendation = async id => {
//   const URL = `https://api.jikan.moe/v3/anime/${id}/recommendations`;
//   try {
//     const response = await fetch(URL);
//     if (response.ok) {
//       const data = await response.json();
//       const recommendedAnime = data.recommendations.slice(0, 4);
//       console.log(recommendedAnime);
//       recommendedAnime.forEach(recommendedCardTemplate);
//     }
//   } catch (e) {
//     console.log(e);
//   }
// };
// // Get RECOMMENDED anime with session storage and display it
// const recommendedCardTemplate = show => {
//   const { image_url, title, recommendation_count, mal_id } = show;
//   const card = `
//   <div class="anime-card flow-content">
//       <div class="image">
//           <a href="#">
//               <svg  class="heart" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M16.3531 10.5C13.8063 10.5 11.7063 12.5553 11.7063 15.1468C11.7063 17.6936 13.7616 19.7936 16.3531 19.7936C18.9446 19.7936 20.9999 17.7383 20.9999 15.1468C20.9999 12.5553 18.9446 10.5 16.3531 10.5ZM18.8106 15.817H17.2467C17.1127 15.817 17.0233 15.9064 17.0233 16.0404V17.6043C17.0233 17.9617 16.7106 18.2745 16.3531 18.2745C15.9957 18.2745 15.6829 17.9617 15.6829 17.6043V16.0404C15.6829 15.9064 15.5935 15.817 15.4595 15.817H13.8957C13.5382 15.817 13.2254 15.5043 13.2254 15.1468C13.2254 14.7894 13.5382 14.4766 13.8957 14.4766H15.4595C15.5935 14.4766 15.6829 14.3872 15.6829 14.2532V12.6894C15.6829 12.3319 15.9957 12.0191 16.3531 12.0191C16.7106 12.0191 17.0233 12.3319 17.0233 12.6894V14.2532C17.0233 14.3872 17.1127 14.4766 17.2467 14.4766H18.8106C19.168 14.4766 19.4808 14.7894 19.4808 15.1468C19.4808 15.5043 19.2127 15.817 18.8106 15.817Z" fill="#FFD9D9"/>
//               <path d="M10.4106 14.566C10.6787 11.8851 12.734 9.69575 15.3702 9.24894C16.9787 8.98085 18.4979 9.38298 19.7043 10.1872C19.7489 10.2319 19.8383 10.1872 19.8383 10.1426C20.5532 8.53404 20.9553 7.10426 20.9553 6.0766C20.9553 2.72553 18.4979 0 15.5043 0C13.5383 0 11.7064 1.20638 10.7681 3.0383C10.6787 3.17234 10.4553 3.17234 10.4106 3.0383C9.42766 1.20638 7.64043 0 5.58511 0C2.50213 0 0 2.77021 0 6.21064C0 9.74043 3.84255 16.2191 10.2766 20.9106C10.366 20.9553 10.4106 21 10.5 21C10.5894 21 10.634 21 10.7234 20.9553C11.3043 20.5979 11.8404 20.1957 12.3766 19.7489C12.4213 19.7043 12.4213 19.6149 12.3766 19.5702C10.9915 18.3638 10.2319 16.5319 10.4106 14.566Z" fill="#FFD9D9"/>
//               </svg>
//               <img class="poster" src="${image_url}" alt="">
//           </a>
//       </div>
//       <div class="info">
//           <h3 class="title">
//               <a class="name" href="#" data-id="${mal_id}">${title}</a>
//           </h3>
//           <div class="rating">
//               <p>${recommendation_count}</p>
//           </div>
//       </div>
//   </div>
//   `;
//   recommendedList.innerHTML += card;
// };
// // Need to add eventlistener to similar shows and then set session storage to new animeId and call the getAnimeDetails again to change the page to the card you clicked on.
const infoPage = document.querySelector("[data-info-page]"); // const info = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY));

const recommendedList = document.querySelector("[data-recommended]");
let animeId = JSON.parse(sessionStorage.getItem(_grid.SESSION_STORAGE_KEY)); // get the id MUST change it to a let if you gonna change it occassionally

const getAnimeDetails = async id => {
  const URL = `https://api.jikan.moe/v3/anime/${id}`;
  const response = await fetch(URL); // GET SHOWS DETAILS

  try {
    if (response.ok) {
      const data = await response.json(); // console.log("Anime Details:", data);

      animeInfoTemplate(data); // use the anime info to populate the anime info template

      getRecommendation(id); // use the animeId to get recommended
    } else {
      console.log("Anime details error");
    }
  } catch (e) {
    console.error(e);
  }
}; // Initially get the anime details with id that is passed via session storage


getAnimeDetails(animeId); // Get anime INFO with session storage and display it

const animeInfoTemplate = info => {
  const {
    image_url,
    title,
    genres,
    background
  } = info;
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
        <a href="#" class="tag">${genres[3].name}</a>
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
      <img src="${image_url}" width="420px" alt="" />
    </div>
  </div>
      `;
  infoPage.innerHTML = description;
}; // Get anime recommendations and add its cards to similar section and addEventListener to get id of recommended card that is clicked and call getAnimeDetails() to repeat all the fucntions again to get new info.


const getRecommendation = async id => {
  const URL = `https://api.jikan.moe/v3/anime/${id}/recommendations`;

  try {
    const response = await fetch(URL);

    if (response.ok) {
      const data = await response.json();
      const recommendedAnime = data.recommendations.slice(0, 4); // console.log(recommendedAnime);

      recommendedList.innerHTML = ""; // added this because when you click on a recommended card it will display the previous 4 and the new 4. So i remove the previous for before getting the new 4.

      recommendedAnime.forEach(recommendedCardTemplate);
      recommendedList.addEventListener("click", e => {
        if (e.target.classList.contains("name")) {
          const id = e.target.dataset.id;
          sessionStorage.setItem(_grid.SESSION_STORAGE_KEY, JSON.stringify(id));
          animeId = JSON.parse(sessionStorage.getItem(_grid.SESSION_STORAGE_KEY)); // overwrite the 1st animeId and call the getAnimeDetails() to get new data.

          getAnimeDetails(animeId);
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
}; // Get RECOMMENDED anime with session storage and display it


const recommendedCardTemplate = show => {
  const {
    image_url,
    title,
    recommendation_count,
    mal_id
  } = show;
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

          </div>
      </div>
  </div>
  `;
  recommendedList.innerHTML += card;
}; // Need to add eventlistener to similar shows and then set session storage to new animeId and call the getAnimeDetails again to change the page to the card you clicked on.
},{"./grid.js":"grid.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55553" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","info.js"], null)
//# sourceMappingURL=/info.245833fa.js.map