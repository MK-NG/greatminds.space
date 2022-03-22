

// 



// TITLE ANIMATION



// 

setInterval(function () {
  const overlay = document.querySelector('.overlay');
  const overlayTwo = document.querySelector('.overlay--two');
  
  const show = document.querySelector('span[data-show]')
    
  const next = show.nextElementSibling || document.querySelector('span:first-of-type')
  const up = document.querySelector('span[data-up]')
  
  if (up) {
    up.removeAttribute('data-up')
  }
  
  // pick bigger value
  let overlayWidth = Math.max(show.clientWidth, next.clientWidth);
  
  let overlayBackground = window.getComputedStyle(next).getPropertyValue('background-image');
  let overlayTwoBackground = window.getComputedStyle(show).getPropertyValue('background-image');
  
  overlay.style.width = overlayWidth + 'px';
  overlay.style.backgroundImage = overlayBackground;
  
  overlayTwo.style.width = overlayWidth + 'px';
  overlayTwo.style.backgroundImage = overlayTwoBackground;
  
  overlay.classList.add('visible');
  overlayTwo.classList.add('visible');
  
  window.setTimeout(() => {
  
    show.removeAttribute('data-show')
    show.setAttribute('data-up', '')

    next.setAttribute('data-show', '')
  
  }, 500);
  
  window.setTimeout(() => {
  
    overlay.classList.remove('visible');
    overlayTwo.classList.remove('visible');
  
  }, 1000);
  
}, 2000)

// 



//  HEADER FADE OUT




// 

var header = $('header');
var range = 200;

$(window).on('scroll', function () {
  
  var scrollTop = $(this).scrollTop(),
      height = header.outerHeight(),
      offset = height / 2,
      calc = 1 - (scrollTop - offset + range) / range;

  header.css({ 'opacity': calc });

  if (calc > '1') {
    header.css({ 'opacity': 1 });
  } else if ( calc < '0' ) {
    header.css({ 'opacity': 0 });
  }
  
});

const menu = document.querySelector(".menu__list");
menu.addEventListener("mouseover", (event) => {
  if (event.target.classList.contains("menu__link")) {
    menu.style.setProperty(
      "--underline-width",
      `${event.target.offsetWidth}px`
    );
    menu.style.setProperty(
      "--underline-offset-x",
      `${event.target.offsetLeft}px`
    );
  }
});
menu.addEventListener("mouseleave", () =>
  menu.style.setProperty("--underline-width", "0")
);


// 


// FORM



// 

// const s = document.querySelector('.Subscribe')
// const b = document.querySelector('button')
// b.addEventListener('click', (e) => {
//   e.preventDefault()

  

//   s.classList.toggle('Subscribe--loading')
//   setTimeout(() => {
//     s.classList.remove('Subscribe--loading')
//     s.classList.toggle('Subscribe--complete')
//   }, 2000)
  
//   setTimeout(() => {
//     s.classList.remove('Subscribe--complete')
//   }, 20000)

  
// })



 const s = document.querySelector('.Subscribe')
 const b = document.querySelector('button')

signup.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(signup);
  fetch(signup.getAttribute('sub'), {
    method: 'POST',
    headers: {
      'Accept': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: new URLSearchParams(formData).toString()
  })
  .then(res => {
    s.classList.toggle('Subscribe--loading')
    setTimeout(() => {
      s.classList.remove('Subscribe--loading')
      s.classList.toggle('Subscribe--complete')
    }, 2000)
    
    setTimeout(() => {
      s.classList.remove('Subscribe--complete')
    }, 20000)
  });
});