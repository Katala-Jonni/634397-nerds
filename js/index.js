'use strict';

window.addEventListener('DOMContentLoaded', showDOMContentLoaded);

function showDOMContentLoaded() {

  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function(callback, thisArg) {
      thisArg = thisArg || window;
      for (let i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }

  const controls = document.querySelectorAll('.slider-controls i');
  const sliders = document.querySelectorAll('.slider-list li');
  const writeUsButton = document.querySelector('.write-us .button');
  const modalClose = document.querySelector('.modal-close');
  const modal = document.querySelector('.modal');
  const modalOverlay = document.querySelector('.overlay');
  const form = modal.querySelector('.modal-form');
  const formSubmit = form.querySelector('[type="submit"]');

  // localStorage
  let localName = void 0;
  let localEmail = void 0;
  let isLocalStorage = true;

  try {
    localName = localStorage.getItem('name');
    localEmail = localStorage.getItem('email');
  } catch (err) {
    isLocalStorage = false;
  }

  getFirstSlide();

  function getFirstSlide() {
    if (!sliders[0]) {
      return;
    } else {
      sliders[0].classList.remove('visually-hidden');
    }
  }

  controls.forEach(function(btn, i) {
    btn.addEventListener('click', function(event) {
      controls.forEach(function(btn) {
        return btn.classList.remove('active');
      });
      sliders.forEach(function(slide) {
        return slide.classList.add('visually-hidden');
      });
      event.target.classList.toggle('active');
      sliders[i].classList.remove('visually-hidden');
    });
  });

  form.addEventListener('submit', function(event) {
    const element = this.querySelectorAll('input, textarea');
    element.forEach(function(elem) {
      if (!elem.value) {
        event.preventDefault();
        modal.classList.toggle('animationModalError');
      } else {
        if (isLocalStorage) {
          switch (elem.name) {
            case 'name':
              localStorage.name = elem.value;
              break;
            case 'email':
              localStorage.email = elem.value;
              break;
          }
        }
      }
    });
  });

  writeUsButton.addEventListener('click', function(event) {

    event.preventDefault();
    modal.classList.remove('visually-hidden');
    modal.classList.add('animationModal');

    if (localName) {
      form.querySelector('[name="name"]').value = localName;
    }
    if (localEmail) {
      form.querySelector('[name="email"]').value = localEmail;
    }
    localName && localEmail ? form.querySelector('[name="message"]').focus() : form.querySelector('[name="name"]').focus();

    modalOverlay.classList.add('modal-overlay');
  });

  modalClose.addEventListener('click', function(event) {
    event.preventDefault();
    modal.classList.add('visually-hidden');
    modal.classList.remove('animationModal');
    modal.classList.remove('animationModalError');
    modalOverlay.classList.remove('modal-overlay');
  });

  modalOverlay.addEventListener('click', function() {
    modal.classList.add('visually-hidden');
    modalOverlay.classList.remove('modal-overlay');
  });

  window.addEventListener('keyup', function(event) {
    if (event.code !== 'Escape') {
      return;
    } else {
      if (!modal.classList.contains('visually-hidden')) {
        event.preventDefault();
        modal.classList.add('visually-hidden');
        modal.classList.remove('animationModal');
        modal.classList.remove('animationModalError');
        modalOverlay.classList.remove('modal-overlay');
      }
    }
  });

  // setinterval
  let step = 0;
  let stepControl = 0;
  let timer = 5000;


  setInterval(function() {
    for (let i = 0; i < sliders.length; i++) {
      sliders[i].classList.add('visually-hidden');
      controls[i].classList.remove('active');
    }
    sliders[step++ % sliders.length].classList.remove('visually-hidden');
    controls[stepControl++ % sliders.length].classList.add('active');
  }, timer);

}
