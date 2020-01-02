// Constants (not affected by Swup page loads)
const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
const b = document.getElementById('body');
const logo = document.getElementById("stroke-logo");
const svgDrawingPaths = document.querySelectorAll(".text-stroke");
const svgVerve = document.getElementById("svgVerve");
const svg360 = document.getElementById("svg360");
const svgCirclePaths = document.querySelectorAll(".big-circle");
const nb = document.getElementById('nav-toggle');
const html = document.documentElement;


// Set up Swup
const swupOptions = {
  animateHistoryBrowsing: false,
  animationSelector: '[class*="page-transition-"]',
  containers: ["#main", '#nav'],
  linkSelector:
    'a[href^="' +
    window.location.origin +
    '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup])'
};
// Initialise Swup
const swup = new Swup(swupOptions);


// Loading Events

document.addEventListener("DOMContentLoaded", pageLoading);

window.onload = function(){
		setupLogoAnimation();
		v360init();
};

swup.on('contentReplaced', v360init);

swup.on('animationOutDone', function(){
	pageLoading();
});
swup.on('animationInDone', function(){
	//add loaded class to trigger transitions
	b.classList.add('loaded');
	// set smooth scroll behaviour
	//html.style.cssText = "scroll-behavior: smooth;";
});


// window.onload functions
// Also called on AJAX page updates
function v360init(){
	
    // Set scroll position back to top or scroll to anchor
	if (window.location.hash) {
		//console.log(window.location.hash);
		el =  document.getElementById(window.location.hash.substring(1));
// 		console.log(el);
		hOffset = (Math.round(el.getBoundingClientRect().top) - 100);
// 		console.log(hOffset);
		window.scrollTo(0, hOffset);
	} 
	if (!window.location.hash) {
// 		console.log('scrolling');
		window.scrollTo(0, 0);
	}

	// Scroll Events
	// Throttle scroll events using setTimeout and requestAnimationFrame
	var timeout;
	window.addEventListener("scroll", () => {
		if(timeout){
			window.cancelAnimationFrame(timeout);
		}
		timeout = window.requestAnimationFrame(function(){
			iconListBackground('homepage-sections');
		});
	});
	
	// Click events
	
	// nav toggle
	nb.addEventListener('click', toggleNav);
	
	// sub-nav toggle
	var subnav = document.querySelectorAll('.has-subitems > a');
	for (var i = 0; i < subnav.length; i++) {
    	subnav[i].addEventListener('click', toggleMobileSubnav, false);
	}
	
	// Carosel
	if (document.querySelectorAll('.slides').length){
		const slides = new Siema({
		  selector: '.slides',
		  duration: 500,
		  easing: 'ease-out',
		  perPage: 1,
		  startIndex: 0,
		  draggable: true,
		  multipleDrag: true,
		  threshold: 20,
		  loop: true,
		  rtl: false,
		  onInit: () => {},
		  onChange: () => {},
		});
		const prev = document.getElementById('previous-slide');
		const next = document.getElementById('next-slide');
		const slideTimer = setInterval(() => slides.next(), 5000);
		prev.addEventListener('click', () => prevSlide(slides, slideTimer));
		next.addEventListener('click', () => nextSlide(slides, slideTimer));
	}
	
	//Particles.js

	if(document.getElementById('particles')){
		particlesJS("particles", {
		  particles: {
		    number: { value: 20, density: { enable: false, value_area: 300 } },
		    color: { value: "#ffffff" },
		    shape: {
		      type: "circle",
		      stroke: { width: 0, color: "#000000" },
		      polygon: { nb_sides: 5 },
		      image: { src: "img/github.svg", width: 100, height: 100 }
		    },
		    opacity: {
		      value: .7,
		      random: true,
		      anim: { enable: true, speed: 1, opacity_min: 0, sync: false }
		    },
		    size: {
		      value: 3,
		      random: true,
		      anim: { enable: false, speed: 4, size_min: 0.3, sync: false }
		    },
		    line_linked: {
		      enable: false,
		      distance: 150,
		      color: "#ffffff",
		      opacity: 0.4,
		      width: 1
		    },
		    move: {
		      enable: true,
		      speed: 1,
		      direction: "none",
		      random: true,
		      straight: false,
		      out_mode: "out",
		      bounce: false,
		      attract: { enable: false, rotateX: 600, rotateY: 600 }
		    }
		  },
		  interactivity: {
		    detect_on: "canvas",
		    events: {
		      onhover: { enable: false, mode: "bubble" },
		      onclick: { enable: false, mode: "push" },
		      resize: true
		    },
		    modes: {
		      grab: { distance: 400, line_linked: { opacity: 1 } },
		      bubble: { distance: 250, size: 0, duration: 2, opacity: 0, speed: 3 },
		      repulse: { distance: 400, duration: 0.4 },
		      push: { particles_nb: 4 },
		      remove: { particles_nb: 2 }
		    }
		  },
		  retina_detect: true
		});
	}
		
}

// Change background colour of div based on scroll position
function iconListBackground(wrapper){
	const w = document.getElementById(wrapper);
	if(w){
		const wHeight = w.offsetHeight;
		var offsetT = w.getBoundingClientRect().top;
			o = (wHeight + offsetT) / wHeight;
			if (o > 0 && o < 1){
			w.style.backgroundColor = 'rgba(66, 39, 144,' + o + ')';
		}
	}
}

// Calculate and set initial styles for SVG logo animation
function setupLogoAnimation(){
	logo.style.cssText = 'display:inline-block;';
	i = 0;
	for (const path of svgDrawingPaths){
		i++;
		var strokeOffset = path.getTotalLength();
		path.style.cssText = 'stroke-dashoffset: ' + strokeOffset + 'px; stroke-dasharray: ' + strokeOffset + 'px; transition-delay:' + i * 0 + 'ms;';
	}
	svgVerve.style.cssText = 'transform:translateX(50px);';
	setTimeout(runLogoAnimation, 100);
}

// Run SVG logo animation
function runLogoAnimation() {
	for (const path of svgDrawingPaths){
	path.style.strokeDashoffset = '0px';
	}
	for (const cPath of svgCirclePaths){
		cPath.style.cssText = 'stroke-dashoffset: 0; transition-delay: 1200ms;';
	}
	svgVerve.style.cssText = 'transform:translateX(0px); transition:transform 1s ease .8s;';
	svg360.style.cssText = 'transform:translateX(0px);opacity:1;transition:all 1s ease .8s;';
	document.getElementById('small-circle').style.opacity = '1';
	setTimeout(firstPageLoaded, 2000);
}

// Reset state classes while new page loading
function pageLoading(){
	//console.log(window.location.hash);
	//show the nav bar
	b.classList.remove('scroll-down');
	// Close the nav panel
	b.classList.remove('nav-open');
	// Set nav button back to closed state
	nb.classList.remove('open');
	// Remove loaded styles for transitions
	b.classList.remove('loaded');
	//unset smooth scroll behaviour before resetting scroll position
	//html.style.cssText = "scroll-behavior: auto;";

	//reset smooth scroll behaviour before resetting scroll position
	//html.style.cssText = "scroll-behavior: smooth;";
}

// Apply classes for fully loaded page
// Only run on initial page load, after logo animation finishes
function firstPageLoaded(){
	b.classList.add('loaded', 'logo-animation-done');
}

// Open / Close nav on mobile devices
function toggleNav(e){
	var n = document.getElementById('nav');
	b.classList.toggle('nav-open');
	nb.classList.toggle('open');
	b.classList.remove('scroll-down');
	e.preventDefault(); e.stopPropagation();
}

// Open / Close subnav on mobile devices
function toggleMobileSubnav(e){
	var clicked = e.target.parentElement;
	var current = document.querySelectorAll(".is-open");
	
	if (clicked.classList.contains('is-open')){
		clicked.classList.remove('is-open');
	} else if (current.length){
			current[0].classList.remove('is-open');
			clicked.classList.add('is-open');
	} else {
		clicked.classList.add('is-open');
	}
	e.preventDefault(); e.stopPropagation();
}

// Carosel controls
function prevSlide(slides, slideTimer){
	slides.prev();
	clearInterval(slideTimer);
}
function nextSlide(slides, slideTimer){
	slides.next();
	clearInterval(slideTimer);
}