
const navToggle = document.querySelector('.nav-toggle');
const overlay = document.querySelector('.overlay');
const nav = document.querySelector('.nav');
const openAccordian = document.querySelectorAll('.open-accordian');
const navItems = document.querySelectorAll('.nav-item');
const dropdownMenu = document.querySelector('.dropdown-menu');
const search = document.querySelector('.search input');

navToggle.addEventListener('click', () => {
    overlay.classList.toggle('hidden');
    nav.classList.toggle('hidden');
});



overlay.addEventListener('click', e => {
    // console.log('overlay');
    overlay.classList.add('hidden');
    nav.classList.add('hidden');
});


openAccordian.forEach(item => {
    item.addEventListener('click', e => {
        // console.log(e.currentTarget);
        const dropdown = e.currentTarget.querySelector('.dropdown-menu');
        const rotate = e.currentTarget.querySelector('span');
        dropdown.classList.toggle('hidden');
        rotate.classList.toggle('rotate');
    });
});

search.addEventListener('click', e => {
    // if(nav.classList !== 'hidden') {
    //     overlay.classList.add('hidden');
    //     nav.classList.add('hidden');
    //     console.log('hello');

         
    // } 

    e.preventDefault();
        console.log(e.target);
        e.target.classList.toggle('hidden');
        overlay.classList.toggle('hidden'); 
    
    
});
