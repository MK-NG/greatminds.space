

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



// peek-a-boo.7.3.js - Mike Foskett - https://websemantics.uk/articles/peek-a-boo-v7/

// Show - hide a block - adapted for FAQ
// Requires:
//    setAttribute / getAttribute (IE9+)
//    classList (IE10+)  - disabled
//    addEventListener (IE9+)
//    requestAnimationFrame (IE10+) - replace with requestAF() for IE9
//    querySelectorAll
//    preventDefault
//    debounce()

	

// FAQ version:
// v7.4 Added: open an question from an internal anchor
// v7.3 Expanded when URI fragment matches the target ID
// v7.2 HTML button reinstated, js adjusted.
//			Initial open/close state reworked


var Pab = (function (window, document, debounce) {
	
	// Terminology used:
	// toggle - The dynamically added button used to toggle the hidden content
	// target - The object which contains the hidden content
	// toggleParent - The object which will, or does, contain the toggle button

  'use strict';

  var dataAttr = 'data-pab';
  var attrName = dataAttr.replace('data-', '') + '_';
  var btnClass = dataAttr.replace('data-', '') + '-btn';
	var dataExpandAttr = dataAttr + '-expand';
  var internalId = 1;


  function $ (selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector));
  }


  function _isExpanded (obj) { // or not aria-hidden
    return obj && (obj.getAttribute('aria-expanded') === 'true' || obj.getAttribute('aria-hidden') === 'false');
  }


	// This function is globally reusable. Perhaps externalise for reuse?  
	// Get height of an element object
  // Assumes it is hidden by max-height: 0 in the CSS
	var _getHiddenObjectHeight = function (obj) {
    obj.setAttribute('style', 'max-height: none');
		var height = obj.scrollHeight;
    obj.removeAttribute('style');
		return height;
	};

/* Not enough support to be truly useful.
   Under most circumstance aria-expanded is sufficient.
  var _setToggleSvgTitle = function(toggle) {
    var title = toggle.getElementsByTagName('title');
    if (title && title[0]) {
      title[0].innerHTML = _isExpanded(toggle) ? 'Hide' : 'Show';
    }
  };
*/

  var _openCloseToggleTarget = function (toggle, target, isExpanded) {
    toggle.setAttribute('aria-expanded', !isExpanded);
    _setToggleMaxHeight(target);
    window.requestAnimationFrame(function(){
      target.setAttribute('aria-hidden', isExpanded);
    });
    // _setToggleSvgTitle(toggle); - not enough support to be useful
  };



  var _setToggleMaxHeight = function (target) {
    if (_isExpanded(target)) {
      // max-height overidden by CSS !important
      // target.style.maxHeight = 0;
    } else {
      target.style.maxHeight = _getHiddenObjectHeight(target) + 'px';
    }
  };

  var _toggleClicked = function (event) {

    var toggle = event.target;
    var target;
    var isExpanded;

    if (toggle) {

			// To prevent children bubbling up to parent causing more than one click event
			event.stopPropagation();

      target = document.getElementById(toggle.getAttribute('aria-controls'));
      if (target) {
        isExpanded = _isExpanded(toggle);
        _openCloseToggleTarget(toggle, target, isExpanded);
      }
    }
  };


  var _addToggleListeners = function (toggle) {
    // Simpler to mangage here rather than in a global handler (consider hover and blur)

    // Parent of toggle and target - Deprecated to support IE 9
    //toggle.addEventListener('focus', _toggleParentClass, false);
    //toggle.addEventListener('blur', _toggleParentClass, false);
    //toggle.addEventListener('mouseout', _toggleParentClass, false);
    //toggle.addEventListener('mouseover', _toggleParentClass, false);

    toggle.addEventListener('click', _toggleClicked, false);

  };


  var _setUpToggle = function (toggle) {

		// Create a html button, add content from parent, replace original parent content.
		var btn = document.createElement('button');
		
		btn.className = btnClass;
		btn.innerHTML = toggle.innerHTML;
		btn.setAttribute('aria-expanded', false);
		btn.setAttribute('id', attrName + internalId++);
		btn.setAttribute('aria-controls', toggle.getAttribute(dataAttr));

		toggle.innerHTML = '';
		toggle.appendChild(btn);
		
		return btn;
	};


	// Prestating the container class in the HTML allows the CSS to render before JS kicks in.
	// Add container class to parent if not prestated
  var _setUpToggleParent = function (toggle) {
    var parent = toggle.parentElement;
    if (parent && !parent.className.match(attrName + 'container')) {
      //parent.classList.add(attrName + 'container');
      parent.className += ' ' + attrName + 'container';
    }
  };


  var _addToggleSVG = function (toggle) {
    var clone = toggle.cloneNode(true);
    if (!clone.innerHTML.match('svg')) {

			// HTML SVG definition allows more control
      clone.innerHTML += '<svg role=presentational focusable=false class=' + dataAttr.replace('data-', '') + '-svg-plus><use class=\"use-plus\" xlink:href=\"#icon-vert\" /><use xlink:href=\"#icon-hori\"/></svg>';
      //requestAnimationFrame(function () {
        toggle.parentElement.replaceChild(clone, toggle);
      //});
    }
    return clone;
  };


  var _setUpTargetAria = function (toggle, target) {
    target.setAttribute('aria-hidden', !_isExpanded(toggle));
    target.setAttribute('aria-labelledby', toggle.id);
  };


  var _resetAllTargetsMaxHeight = function () {
    var toggles = document.querySelectorAll('[' + dataAttr + ']');
    var i = toggles.length;
    var target;
    while (i--) {
      target = document.getElementById(toggles[i].getAttribute(dataAttr));
      if (target) {
        target.style.maxHeight = _getHiddenObjectHeight(target) + 'px';
      }
    }
  };


	var isMustardCut = function () {
		return (document.querySelectorAll && document.addEventListener);
	};


	var _openIfRequired = function (toggle, target) {
		
		var fragmentId = window.location.hash.replace('#', '');
		
		// Expand by default 'data-pab-expand' small delay applied
		if (toggle.parentElement.hasAttribute(dataExpandAttr)) {
			setTimeout(function () {
				_openCloseToggleTarget(toggle, target, _isExpanded(toggle));
			}, 500);
		}
    

		// Check url fragment and if target ID matches, open it
		if (target.id === fragmentId) {
			setTimeout(function () {
				_openCloseToggleTarget(toggle, target, false);
				toggle.focus();
			}, 500);
		}

	};


	var addSingleToggleTarget = function (toggleParent) {

		var targetId = toggleParent.getAttribute(dataAttr);
		var target = document.getElementById(targetId);
		var toggle;

		if (target && isMustardCut) {
			toggle = _setUpToggle(toggleParent);
			_setUpToggleParent(toggleParent);
			toggle = _addToggleSVG(toggle);
			_setUpTargetAria(toggle, target);
			_addToggleListeners(toggle);
			_openIfRequired(toggle, target);
		}
	};
  
  var hashChanged = function (e) {
    var fragmentId = window.location.hash.replace('#', '');
    var toggle = document.querySelector('#' + fragmentId + ' > .' + btnClass);
    var target = document.getElementById(toggle.getAttribute('aria-controls'));
    if (!toggle || !target) {return false;}

    toggle.focus();
    toggle.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});

    _openCloseToggleTarget(toggle, target, false);
  };


  var addToggles = function () {

		// Iterate over all toggles (elements with the 'data-pab' attribute)
		var togglesMap = $('[' + dataAttr + ']').reduce(function (temp, toggleParent) {
			addSingleToggleTarget(toggleParent);
			return true;
		}, {});

    return true;
  };


	if (isMustardCut) {
		window.addEventListener('load', addToggles, false);

		// Recalculate all target max-heights after (debounced) window is resized.
		window.addEventListener('resize', debounce(_resetAllTargetsMaxHeight, 500), false);
    
    // On fragment change
		window.addEventListener('hashchange', hashChanged, false);
	}


  return {
    // Exposes an addition function to the global scope allowing toggle & target to be added dynamically.
		add: addSingleToggleTarget
  };


}(window, document, debounce));

// To add dynamically created toggles:
// Pab.add(toggle-object); // Add individual toggle & target


// setTimeout(function(){
//   document.querySelector('.pab_container').innerHTML += `
//   <dt data-pab=faq_6><span>Test dynamic insertion</span></dt>
//   <dd id=faq_6>
//     <div>
//       <p>Dynamically added to <code>dl</code>.</p>
//     </div>
//   </dd>`;
//   Pab.add(document.querySelector('[data-pab=faq_6]'));
// }, 2000);

// setTimeout(function(){
//   document.getElementById('injection_point').innerHTML += `
//   <div data-pab=faq_7><span>Test dynamic insertion</span></div>
//   <div id=faq_7>
//     <div>
//       <p>Dynamically added externally to the <code>dl</code>.</p>
//     </div>
//   </div>`;
//   Pab.add(document.querySelector('[data-pab=faq_7]'));
// }, 2000);