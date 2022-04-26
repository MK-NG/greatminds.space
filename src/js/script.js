import smoothscroll from 'smoothscroll-polyfill';

// kick off the polyfill!
smoothscroll.polyfill();

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
  
  overlay.style.width = overlayWidth + 5 + 'px';
  overlay.style.backgroundImage = overlayBackground;
  
  overlayTwo.style.width = overlayWidth + 5 + 'px';
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

observer.observe(document.querySelector('.underline-3'));




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


var debounce = function(func, wait, immediate) {

  'use strict';

  var timeout;
  return function() {
    var context = this;
    var args = arguments;
    var later = function() {
      timeout = null;
      if ( !immediate ) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait || 200);
    if ( callNow ) {
      func.apply(context, args);
    }
  };
};

Array.from(
	// get all the accordion groups
	document.querySelectorAll('dl[c-accordion]')
).forEach(
	(target) => {
		const panels = Array.from(
			// get all the panel headings in an accordion
			target.querySelectorAll(':scope > dt')
		).map(
			(heading, index) => {
				// create the control
				const control = document.createElement('button');

				// wrap the contents of the heading in the control
				while (heading.lastChild) {
					control.appendChild(heading.firstChild);
				}

				heading.appendChild(control);

				// get the panel itself
				const panel = heading.nextElementSibling;
				const panelId = panel.id = panel.id || `c-accordion-panel-${ index }`;

				// set the initial state of the panel
				let isPanelExpanded = false;

				panel.setAttribute('hidden', '');
				control.setAttribute('aria-expanded', 'false');
				control.setAttribute('aria-controls', panelId);

				// when clicking on the control
				control.addEventListener('click', () => {
					// toggle the expanded state
					isPanelExpanded = !isPanelExpanded;
          var windowWidth = $(window).width();

					if (isPanelExpanded) {
						panel.removeAttribute('hidden');
            if(windowWidth<800){
              window.scrollBy({ top: 350, left: 0, behavior: 'smooth' });
             }
						panel.animate({
							height: ['0', `${ panel.offsetHeight }px`],
							overflow: ['hidden', 'visible']
						}, {
							duration: 75,
							easing: 'ease-in'
						});
					} else {           
						panel.animate({
							height: [`${ panel.offsetHeight }px`, '0'],
							overflow: ['hidden', 'visible']
						}, {
							duration: 75,
							easing: 'ease-in'
						}).onfinish = () => {
							panel.setAttribute('hidden', '');
						};
					}

					// dicate the expanded state
					control.setAttribute('aria-expanded', isPanelExpanded);

					// prevent further default click events
					event.preventDefault();
				});

				// when clicking on the control
				control.addEventListener('keydown', ({ key }) => {
					// conditionally get the next panel
					const nextPanel = key === 'ArrowDown' ? panels[index + 1] || panels[0] : key === 'ArrowUp' ? panels[index - 1] || panels[panels.length - 1] : null;

					if (nextPanel) {
						// focus the next panel
						nextPanel.control.focus();

						// prevent further default keydown events
						event.preventDefault();
					}
				});

				return {
					heading,
					control,
					panel
				};
			}
		);
	}
);