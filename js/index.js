'use strict';
const controls = document.querySelectorAll('.slider-controls i');
const sliders = document.querySelectorAll('.slider-list li');
controls.forEach((btn, i) => {
  btn.addEventListener('click', event => {
    controls.forEach(btn => btn.classList.remove('active'));
    sliders.forEach(slide => slide.style.display = 'none');
    event.target.classList.toggle('active');
    sliders[i].style.display = 'block';
  })
});

const writeUsButton = document.querySelector('.write-us .button');
writeUsButton.addEventListener('click', event => {
  event.preventDefault();
  document.querySelector('.modal').classList.toggle('hidden');
});

const modalClose = document.querySelector('.modal-close');
modalClose.addEventListener('click', event => {
  event.target.parentElement.classList.toggle('hidden');
});
