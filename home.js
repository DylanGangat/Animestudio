const faq = document.querySelector(".questions");
// const questions = document.querySelectorAll('.question');
const header = document.querySelector(".primary-header");
const hero = document.querySelector(".hero");

// question accordian

faq.addEventListener("click", e => {
  // questions.forEach(question => {

  //     question.querySelector('.info').classList.add('hidden');
  //     question.querySelector('.arrow').classList.add('rotate');
  // });

  if (
    e.target.classList.contains("question-title") ||
    e.target.classList.contains("arrow")
  ) {
    // const parent = e.target.parentElement.parentElement;
    const parent = e.target.closest(".question");
    const info = parent.querySelector(".info");
    const rotate = parent.querySelector(".arrow");
    info.classList.toggle("hidden");
    rotate.classList.toggle("rotate");
  }
});

// fixed nav intersection observer

const navFixed = entries => {
  // entries gives an array so i used destructuring to get a single entry so that the function can work right.
  console.log(entries);
  const [entry] = entries;
  console.log(entry);

  // it will run at least once the moment it is observer is initialized so i put the a check in place.
  if (!entry.isIntersecting) {
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed");
  }
};

const observer = new IntersectionObserver(navFixed, {
  root: null,
  threshold: 0,
});

observer.observe(hero);
