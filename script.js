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

// const initialCoordinates = section1.getBoundingClientRect();
// // Sticky navigation
// window.addEventListener('scroll', function(e) {
//   console.log(window.scrollY);
//   if(window.scrollY > initialCoordinates.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// Interception Observer API
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries){
  const [entry]  = entries;

  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});
headerObserver.observe(header);

// Revealing Sections On Scroll
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer){
  const [entry] = entries;

  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
});

allSections.forEach(function(section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden')
});

// LAZY LOADING IMAGES

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer){
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function (){
    entry.target.classList.remove('lazy-img');
  })
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0
});
imgTargets.forEach(img => imgObserver.observe(img));

// Slider Component

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const dotContainer = document.querySelector('.dots');

const dotsContainer = document.querySelector('.dots');
slides.forEach((slide, index) => {
  dotsContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${index}"></button>`);
});

dotContainer.addEventListener('click', function(e) {
  if(e.target.classList.contains('dots__dot')){
    console.log("DOTS");
    goToPage(e.target.dataset.slide);
  }
});

const makeActive = function(slide) {
  document.querySelectorAll(".dots__dot").forEach(d => {
    d.classList.remove('dots__dot--active');  
  })
  const dot = document.querySelector(`.dots__dot[data-slide="${slide}"]`);
  dot.classList.add('dots__dot--active');
}

let currentSlide = 0;
const maxSlide = slides.length;

// slider.style.overflow = 'visible';
// slider.style.transform = 'scale(0.3) translateX(-900px)'

slides.forEach((s, i) => {
  s.style.transform = `translateX(${100*i}%)`;
})

const leftBtn = document.querySelector('.slider__btn--left');
const rightBtn = document.querySelector('.slider__btn--right');

const goToPage = function (slide){
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
  makeActive(slide);
}

const previousSlide = function() {
  if(currentSlide === 0){
    currentSlide = maxSlide - 1;
  }else{
    currentSlide--;
  }
  goToPage(currentSlide);
};

const nextSlide = function() {
  if(currentSlide === maxSlide - 1){
    currentSlide = 0;
  }else{
    currentSlide ++;
  }
  goToPage(currentSlide);
}
leftBtn.addEventListener('click',previousSlide);
rightBtn.addEventListener('click', nextSlide);

document.addEventListener('keydown', function(e) {
  console.log(e);
  if(e.key === 'ArrowRight'){
    nextSlide();
  }

  if(e.key === 'ArrowLeft'){
    previousSlide();
  }
});





