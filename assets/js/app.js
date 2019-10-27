window.onscroll = function(){backgroundColorScroll('services', ['services-1','services-2','services-3','services-4']),backgroundColorScroll('beliefs', ['beliefs-1','beliefs-2','beliefs-3','beliefs-4','beliefs-5','beliefs-6']), scrollParralax()};

// Change the background-color of a parent element when child elements are in the middle of the viewport.
// Params: 
//   wrapper: ID of parent element
//   elements: an array of unique child class names
const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
function backgroundColorScroll(wrapper, elements) {
	// calculate half the height of the viewport so we can trigger colour changes when an element reaches this point
	var o = vh / 2;
	// parent element
	var w = document.getElementById(wrapper);
	let els = elements;
	for (const el of els){
		//find the elements current vertical offset from the top of the viewport
		var e = document.getElementById(el);
		if (e !== null){
			var elOffset = e.getBoundingClientRect().top;
			// if the element is between the middle and the bottom of the viewport, change the class that controls the background-color property.
			if ( elOffset < o && elOffset > 0){
				w.className = 'color-' + el;
				e.classList.add('visible');
			}
		} else {
			break;
		}
	}
}
const parallaxEls = document.querySelectorAll("[data-speed]");
const b = document.getElementById('body');
function scrollParralax(){
	//b.classList.add('scrolled');
	if (this.pageYOffset < vh){
	for (const parallaxEl of parallaxEls) {
		parallaxEl.classList.add('scrolled');
	    const direction = parallaxEl.dataset.direction == "up" ? "-" : "";
	    const transformY = this.pageYOffset * parallaxEl.dataset.speed;
	      parallaxEl.style.transform = `translate3d(0,${direction}${transformY}px,0)`;
	  }
	  }
}
//const loadingScreen = document.getElementById("loading-screen");
const logoAnimation = document.getElementById("stroke-logo");
//const loadingIndicator = document.getElementById("loading-circle");
const svgDrawingPaths = document.querySelectorAll(".text-stroke");
const svgVerve = document.getElementById("svgVerve");
const svg360 = document.getElementById("svg360");
const svgCirclePaths = document.querySelectorAll(".big-circle");

function setupLogoAnimation(){
	//b.classList.add('animating-logo');
	logoAnimation.style.cssText = 'display:inline-block;';
	i = 0;
	for (const path of svgDrawingPaths){
		i++;
		var strokeOffset = path.getTotalLength();
		var isUpperCircle = (path.classList.contains('big-circle--top')) ? '-' : '' ;
		path.style.cssText = 'stroke-dashoffset: ' + isUpperCircle + strokeOffset + 'px; stroke-dasharray: ' + strokeOffset + 'px; transition-delay:' + i * 70 + 'ms;';
	}
	svgVerve.style.cssText = 'transform:translateX(50px);';
	setTimeout(runLogoAnimation, 100);
}
function runLogoAnimation() {
	//b.classList.remove('loading');
	for (const path of svgDrawingPaths){
	path.style.strokeDashoffset = '0px';
	}
	for (const cPath of svgCirclePaths){
		cPath.style.cssText = 'stroke-dashoffset: 0; transition-delay: 2000ms;';
	}
	svgVerve.style.cssText = 'transform:translateX(0px); transition:transform 1s ease 1.3s;';
	svg360.style.cssText = 'transform:translateX(0px);opacity:1;transition:all 1s ease 1.3s;';
	document.getElementById('small-circle').style.opacity = '1';
	setTimeout(pageLoaded, 2300);
}

function pageLoading(){
	//logoAnimation.style.cssText = 'display:none;';
	//loadingIndicator.style.cssText = 'display:inline-block;';
	b.classList.add('loading');
	b.classList.remove('loaded');
	//setupLogoAnimation(runLogoAnimation);
}
//function frontPageLoaded(){
	//logoAnimation.style.cssText = '-webkit-animation-name: fadeOut; animation-name: fadeOut;';
	//b.classList.remove('animating-logo');
//	b.classList.add('loaded');
//}
function pageLoaded(){
	//loadingIndicator.style.cssText = '-webkit-animation-name: fadeOut; animation-name: fadeOut;';
	//b.classList.remove('animating-logo');
	b.classList.remove('loading');
	b.classList.add('loaded');
}

document.addEventListener("DOMContentLoaded", pageLoading);
window.onload = function(){
	//if (window.location.pathname=='/'){
		setupLogoAnimation();
	//}
	//else{
		//pageLoaded();
	//}
};

var pjax = new Pjax({
  elements: "a:not(.external)", // default is "a[href], form[action]"
  selectors: ["head title", ".main"],
  cacheBust: false/*
,
  switches: {
	  ".main": Pjax.switches.sideBySide
  },
  switchesOptions: {
	  ".main": {
		classNames: {
	    // class added to the old element being replaced, e.g. a fade out
        remove: "animated animated.reverse animate.fast",
        // class added to the new element that is replacing the old one, e.g. a fade in
        add: "animated",
        // class added on the element when navigating back
        backward: "animate slideInRight",
        // class added on the element when navigating forward (used for new page too)
        forward: "animate slideInLeft"
        }
  },
        callbacks: {
        removeElement: function(el) {
          el.style.marginLeft = "-" + (el.getBoundingClientRect().width/2) + "px"
        }
        }
        }
*/
})

document.addEventListener('pjax:send', pageLoading);
document.addEventListener('pjax:complete', pageLoaded);
