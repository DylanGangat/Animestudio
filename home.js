const faq = document.querySelector('.questions');
const questions = document.querySelectorAll('.question');

// question accordian

faq.addEventListener('click', e => {
    // questions.forEach(question => {
    //     question.querySelector('.info').classList.add('hidden');
    //     question.querySelector('.arrow').classList.add('hidden');
    // });

    if(e.target.className === 'question-title' || e.target.className === 'arrow') {
        const parent = e.target.parentElement.parentElement;
        const info = parent.querySelector('.info');
        const rotate = parent.querySelector('.arrow');
        info.classList.toggle('hidden');
        rotate.classList.toggle('rotate');
    }
});