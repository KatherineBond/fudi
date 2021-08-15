"use strict";

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('body').classList.add('loaded');

  modal.action('.modal', '.modal_btn', '[data-close]');
  Lazy();
  cards();
  counter();
  slider({
    sliderBlock: '.js-slider',
    wrapper: '.js-slider_wrapper',
    slide: '.slider_item',
    field: '.js-slider_inner'
  });
});

// modal
let modal = {
  'body': document.querySelector('body'),
  'bodyClass': 'modal_open',

  'open': function(modalBlock){
    document.querySelector(modalBlock).classList.add('show');
    modal.body.classList.add(modal.bodyClass);
  },

  'close': function(modalBlock){
    let m = document.querySelectorAll(modalBlock);
    m.forEach(i => {
      if(i.classList.contains('show')){
        i.classList.remove('show');
        modal.body.classList.remove(modal.bodyClass);
      }
    });
  },

  'action': function(modalBlock, modalBtn, modalClose){
    let close = document.querySelectorAll(modalClose),
    btn = document.querySelectorAll(modalBtn),
    modals = document.querySelectorAll(modalBlock);

    btn.forEach(t => {
      t.addEventListener('click', (e) => {
        e.preventDefault();
        modal.close(modalBlock);
        let togg = t.getAttribute('data-modal');
        modal.open(`#${togg}`);
      });
    });

    modals.forEach(m => {
      m.addEventListener('click', (e) => {
        let target = e.target;
        if (!(target.classList.contains('modal_wrapper') || target.classList.contains('modal_btn') || target.closest('.modal_wrapper')) || target.classList.contains('menu_item')){
          modal.close(modalBlock);
        };
      });
    });

    close.forEach(c => {
      c.addEventListener('click', () => {
        modal.close(modalBlock);
      });
    });
  }
}

// lazyload
function Lazy() {
  let img = document.querySelectorAll('.lazy');
  img.forEach((item) => {
    let src = item.getAttribute('data-img');
    if(item.tagName == 'IMG'){
      item.setAttribute('src', src);
    } else {
      item.style.backgroundImage = `url('${src}')`;
    }
  });
}

//slider
function slider({sliderBlock, slide, wrapper, field}){

   let offset = 0;
   let slideIndex = 1;

   const slides = document.querySelectorAll(slide),
       slider = document.querySelector(sliderBlock),
       slidesWrapper = document.querySelector(wrapper),
       width = window.getComputedStyle(slidesWrapper).width,
       slidesField = document.querySelector(field);

   slidesField.style.width = 100 * slides.length + '%';

   slides.forEach(slide => {
     slide.style.width = width;
   });

   const indicators = document.createElement('div'),
         dots = [];
   indicators.classList.add('dots');
   slider.append(indicators);

   for (let i = 0; i < slides.length; i++) {
     const dot = document.createElement('span');
     dot.setAttribute('data-slide-to', i + 1);
     if (i == 0) {
        dot.classList.add('active')
     }
     indicators.append(dot);
     dots.push(dot);
   }
   dots.forEach(dot => {
     dot.addEventListener('click', (e) => {
       const slideTo = e.target.getAttribute('data-slide-to');

       slideIndex = slideTo;
       offset = +width.replace(/\D/g, '') * (slideTo - 1);

       slidesField.style.transform = `translateX(-${offset}px)`;

       dots.forEach(dot => dot.classList.remove('active'));
       dots[slideIndex-1].classList.add('active');
     });
   });
}

//counter
function counter() {
  const counters = document.querySelectorAll('.js-counter .number');
  const counterBlock = document.querySelector('.js-counter');
  window.addEventListener('scroll', function() {
    let coord = counterBlock.getBoundingClientRect().top;
    if(coord < document.documentElement.clientHeight){
      for(let c of counters) {
        const update = () => {
          const target = +c.getAttribute('data-number').replace(/[\s.,]/g, '');
          const count = +c.innerText;
          const speed = 1000;
          const inc = target / speed;
          if(count < target) {
            c.innerText = Math.ceil(count + inc);
            setTimeout(update, 1);
          } else {
            c.innerText = target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }
        }
        update();
      }
    }
  });
}

// products
function cards() {
  class ProductMenu {
    constructor(src, alt, title, amount, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.amount = amount;
      this.classes = classes;
      this.parent = document.querySelector('.products');
    }

    render() {
      const element = document.createElement('div');
      const c = this.amount.replace(/[\s.,]/g, '');
      element.setAttribute('data-amount', c);
      if (this.classes.length === 0) {
        this.classes = "item";
        element.classList.add(this.classes);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }
      
      element.innerHTML = `
      <img src="${this.src}" alt=${this.alt}>
      <div class="name">
        <p class="amount">${this.amount} Recipes</p>
        <p class="title">${this.title}</p>
      </div>
      `;
      this.parent.append(element);
    }
  }
  
  new ProductMenu(
    "img/food/american.jpg",
    "american",
    "American",
    "1.437"
  ).render();

  new ProductMenu(
    "img/food/chinese.jpg",
    "chinese",
    "Chinese",
    "145"
  ).render();

  new ProductMenu(
    "img/food/french.jpg",
    "french",
    "French",
    "27"
  ).render();

  new ProductMenu(
    "img/food/italian.jpg",
    "italian",
    "Italian",
    "327"
  ).render();

  new ProductMenu(
    "img/food/indian.jpg",
    "indian",
    "Indian",
    "856"
  ).render();

  new ProductMenu(
    "img/food/steakhouse.jpg",
    "steakhouse",
    "Steakhouse",
    "174"
  ).render();

  new ProductMenu(
    "img/food/seafood.jpg",
    "seafood",
    "Seafood",
    "731"
  ).render();

  new ProductMenu(
    "img/food/sushi.jpg",
    "sushi",
    "Sushi",
    "237"
  ).render();

  new ProductMenu(
    "img/food/mexican.jpg",
    "mexican",
    "Mexican",
    "529"
  ).render();

  new ProductMenu(
    "img/food/sushi.jpg",
    "sushi",
    "Sushi",
    "237"
  ).render();
}