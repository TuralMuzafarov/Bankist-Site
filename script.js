'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const section1 = document.querySelector('#section--1');
const btnScrollTo = document.querySelector('.btn--scroll-to');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Event Delegation

document.querySelector('.nav__links').addEventListener('click', function (e){
    e.preventDefault();

    console.log(e.target);
    if(e.target.classList.contains('nav__link')){
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({behavior: 'smooth'});
    }
});

// Tabbed Component

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// Button Animation
// Event Delegation
tabsContainer.addEventListener('click', function (e){
  e.preventDefault();

  const clickedButton = e.target.closest('.operations__tab');

  if (!clickedButton) return;
  console.log(clickedButton);

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clickedButton.classList.add('operations__tab--active');

  // Content Loading
  tabsContent.forEach(tb => tb.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${clickedButton.dataset.tab}`).classList.add('operations__content--active');
});

//  Adding Hover Animation To The Nav Bar

const nav = document.querySelector('.nav');
const hoverOver = function(e){
  if (e.target.classList.contains('nav__link')){
    const clicked = e.target;

    const siblings =[...clicked.closest('.nav').querySelectorAll('.nav__link')].filter(el => el !== clicked);
    siblings.forEach(sib => sib.style.opacity = this);

    const logo = clicked.closest('.nav').querySelector('img');
    logo.style.opacity = this;
  }
}

nav.addEventListener('mouseover', hoverOver.bind(0.5));
nav.addEventListener('mouseout', hoverOver.bind(1));




