// HERO SLIDER ========================================================

const heroSection = document.querySelector('.hero__section');
const trackContainer = heroSection.querySelector('.hero__track-container');
const track = trackContainer.querySelector('.hero__track');
const slides = Array.from(track.children);

const navContainer = heroSection.querySelector('.hero__nav-container');
const sliderPause = navContainer.querySelector('.hero__slider-pause-button');
const nextButton = navContainer.querySelector('.hero__arrow--right');
const prevButton = navContainer.querySelector('.hero__arrow--left');
const dotsNav = navContainer.querySelector('.hero__dot-indicator-container');
const dots = Array.from(dotsNav.children);

const textTrack = heroSection.querySelector('.hero__dynamic-text-track');

var autoAdvanceTimer = null;

// Initialize carousel after images have loaded
const initializeCarousel = () => {
    // Get the slide width after images have loaded
    const slideWidth = slides[0].getBoundingClientRect().width;
    trackContainer.style.maxWidth = `${slideWidth}px`;

    // Set up positions
    const setSlidePosition = (slide, index) => {
        slide.style.left = `${slideWidth * index}px`;
    };
    slides.forEach(setSlidePosition);
    
    // Make sure first slide is active
    if (!track.querySelector('.current-slide')) {
        slides[0].classList.add('current-slide');
        dots[0].classList.add('current-slide');
    }
    
    // Start auto-advance timer
    clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = setTimeout(nextSlide, 6000);
};

const moveToSlide = (track, currentSlide, targetSlide) => {
    clearTimeout(autoAdvanceTimer);
    if (!targetSlide) return; // Guard against null targetSlide
    
    track.style.transform = `translateX(-${targetSlide.style.left})`;
    
    const isFirstSlide = targetSlide.style.left === "0px";
    textTrack.style.transform = `translateY(-${isFirstSlide ? '0' : '50'}px)`;
    
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
    autoAdvanceTimer = setTimeout(nextSlide, 6000);
};

const updateDots = (currentDot, targetDot) => {
    if (!targetDot) return; // Guard against null targetDot
    
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
};

const prevSlide = () => {
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    
    let targetSlide = currentSlide.previousElementSibling;
    let targetDot = currentDot.previousElementSibling;
    
    // Loop to last slide if at beginning
    if (!targetSlide) {
        targetSlide = slides[slides.length - 1];
        targetDot = dots[dots.length - 1];
    }
    
    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
};

const nextSlide = () => {
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    
    let targetSlide = currentSlide.nextElementSibling;
    let targetDot = currentDot.nextElementSibling;
    
    // Loop to first slide if at end
    if (!targetSlide) {
        targetSlide = slides[0];
        targetDot = dots[0];
    }
    
    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
};

prevButton.addEventListener('click', (e) => {
    e.preventDefault();
    prevSlide();
});

nextButton.addEventListener('click', (e) => {
    e.preventDefault();
    nextSlide();
});

dotsNav.addEventListener('click', (e) => {
    const targetDot = e.target.closest('.hero__dot-indicator');
    if (!targetDot) return;
    
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];
    
    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
});

// Pause button
sliderPause.addEventListener('click', (e) => {
    const playIcon = sliderPause.querySelector('.hero__slider-control-icon--play');
    const pauseIcon = sliderPause.querySelector('.hero__slider-control-icon--pause');

    if (sliderPause.classList.contains('slider-paused')) {
        sliderPause.classList.remove('slider-paused');
        autoAdvanceTimer = setTimeout(nextSlide, 6000);

        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    } else {
        sliderPause.classList.add('slider-paused');
        clearTimeout(autoAdvanceTimer);

        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
});

// Support for mobile touch devices
let touchStartX = 0;
let touchEndX = 0;

track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
});

const handleSwipe = () => {
    const swipeThreshold = 50; // Minimum distance for a swipe
    const difference = touchStartX - touchEndX;
    
    if (Math.abs(difference) < swipeThreshold) return;
    
    if (difference > 0) {
        nextSlide(); // Swipe left
    } else {
        prevSlide(); // Swipe right
    }
};

// Wait for images to load before initializing
document.addEventListener('DOMContentLoaded', () => {
    // Get all images in the carousel
    const slideImages = Array.from(track.querySelectorAll('img'));
    
    if (slideImages.length === 0) {
        // No images, initialize immediately
        initializeCarousel();
    } else {
        // Create a promise for each image loading
        const imagePromises = slideImages.map(img => {
            return new Promise((resolve) => {
                if (img.complete) {
                    resolve();
                } else {
                    img.onload = () => resolve();
                    img.onerror = () => resolve(); // Continue even if image fails
                }
            });
        });
        
        // When all images are loaded, initialize
        Promise.all(imagePromises)
            .then(initializeCarousel)
            .catch(() => {
                // If there's any error, initialize anyway
                initializeCarousel();
            });
    }
});

// NAVBAR =========================================================

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-link");
    
    // Get current path and handle both "/" and non-"/" cases
    let currentPath = window.location.pathname.replace(/^\/|\/$/g, "");
    // If we're on the home page, currentPath will be empty string
    currentPath = currentPath || "";
    
    navLinks.forEach(link => {
        // Get the href and remove any leading/trailing slashes
        const href = link.getAttribute("href").replace(/^\/|\/$/g, "");
        
        // Compare the cleaned paths
        if (href === currentPath) {
            link.classList.add("active");
        }
    });
});