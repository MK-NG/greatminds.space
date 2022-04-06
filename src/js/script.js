

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




//  NAVIAGTION 



// 

// const menu = document.querySelector(".menu__list");
// menu.addEventListener("mouseover", (event) => {
//   if (event.target.classList.contains("menu__link")) {
//     menu.style.setProperty(
//       "--underline-width",
//       `${event.target.offsetWidth}px`
//     );
//     menu.style.setProperty(
//       "--underline-offset-x",
//       `${event.target.offsetLeft}px`
//     );
//   }
// });
// menu.addEventListener("mouseleave", () =>
//   menu.style.setProperty("--underline-width", "0")
// );


// 


// FORM


// 


 const s = document.querySelector('.Subscribe')
 const b = document.querySelector('button')
  signup.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(signup);
  fetch(signup.getAttribute('sub'), {
    method: 'POST',
    headers: {
      'Accept': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/x-www-form-urlencoded'
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
    })
  });
});




// 



// underline animation



// 


const observer = new IntersectionObserver(entries => {
  // Loop over the entries
  entries.forEach(entry => {
    // If the element is visible
    if (entry.isIntersecting) {
      // Add the animation class
      entry.target.classList.add('underline-animation');

    }
  });
});

observer.observe(document.querySelector('.underline'));

observer.observe(document.querySelector('.underline-2'));



// 



//  DARK MODE  


// 


// var checkbox = document.querySelector('input[name=mode]');

// checkbox.addEventListener('change', function() {
//     if(this.checked) {
//         trans()
//         document.documentElement.setAttribute('data-theme', 'dark')
//     } else {
//         trans()
//         document.documentElement.setAttribute('data-theme', 'light')
//     }
// })

// let trans = () => {
//   document.documentElement.classList.add('transition');
//   window.setTimeout(() => {
//       document.documentElement.classList.remove('transition');
//   }, 1000)
// }


$(window).load(function(){
  $('#wrapper').addClass('loaded');
})

$('.more-info').click(function(){
  $("#card").toggleClass('flip');
  $('#arrow').remove();
});
$('#background').click(function(){
  $('#card').removeClass('flip');
})