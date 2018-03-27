'use strict';

window.addEventListener('DOMContentLoaded', showDOMContentLoaded);

function showDOMContentLoaded() {
  const controls = document.querySelectorAll('.slider-controls i');
  const sliders = document.querySelectorAll('.slider-list li');

  function getFirstSlide() {
    if (!sliders[0]) {
      return;
    } else {
      sliders[0].classList.remove('visually-hidden');
    }
  }

  getFirstSlide();

  controls.forEach((btn, i) => {
    btn.addEventListener('click', event => {
      controls.forEach(btn => btn.classList.remove('active'));
      sliders.forEach(slide => slide.classList.add('visually-hidden'));
      event.target.classList.toggle('active');
      sliders[i].classList.remove('visually-hidden');
    })
  });

  const writeUsButton = document.querySelector('.write-us .button');
  writeUsButton.addEventListener('click', event => {
    event.preventDefault();
    document.querySelector('.modal').classList.remove('visually-hidden');
  });

  const modalClose = document.querySelector('.modal-close');
  modalClose.addEventListener('click', event => {
    event.target.parentElement.classList.add('visually-hidden');
  });
}
