const track = document.querySelector('.hero__track');
const textTrack = document.querySelector('.hero__dynamic-text-track');
const trackContainer = document.querySelector('.hero__track-container');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.hero__arrow--right');
const prevButton = document.querySelector('.hero__arrow--left');
const dotsNav = document.querySelector('.hero__dot-indicator-container');
const dots = Array.from(dotsNav.children);
let userHasInteracted = false;
let autoAdvanceTimer = null;

// Initialize carousel
const slideWidth = slides[0].getBoundingClientRect().width;
trackContainer.style.maxWidth = `${slideWidth}px`;

// Set up initial positions
const setSlidePosition = (slide, index) => {
    slide.style.left = `${slideWidth * index}px`;
};
slides.forEach(setSlidePosition);

// Move to target slide
const moveToSlide = (track, currentSlide, targetSlide) => {
    if (!targetSlide) return; // Guard against null targetSlide
    
    track.style.transform = `translateX(-${targetSlide.style.left})`;
    
    // Update text track position
    const isFirstSlide = targetSlide.style.left === "0px";
    textTrack.style.transform = `translateY(-${isFirstSlide ? '0' : '50'}px)`;
    
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
};

// Update dot indicators
const updateDots = (currentDot, targetDot) => {
    if (!targetDot) return; // Guard against null targetDot
    
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
};

// Handle previous slide
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

// Handle next slide
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

// Event listeners
prevButton.addEventListener('click', (e) => {
    e.preventDefault();
    userHasInteracted = true;
    clearTimeout(autoAdvanceTimer);
    prevSlide();
});

nextButton.addEventListener('click', (e) => {
    e.preventDefault();
    userHasInteracted = true;
    clearTimeout(autoAdvanceTimer);
    nextSlide();
});

dotsNav.addEventListener('click', (e) => {
    const targetDot = e.target.closest('.hero__dot-indicator');
    if (!targetDot) return;
    
    userHasInteracted = true;
    clearTimeout(autoAdvanceTimer);
    
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];
    
    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
});

// Auto advance functionality
const autoAdvance = () => {
    if (userHasInteracted) return;
    nextSlide();
    autoAdvanceTimer = setTimeout(autoAdvance, 8000);
};

// Start auto advance
autoAdvanceTimer = setTimeout(autoAdvance, 8000);

// Optional: Add touch/swipe support
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
    
    userHasInteracted = true;
    clearTimeout(autoAdvanceTimer);
    
    if (difference > 0) {
        nextSlide(); // Swipe left
    } else {
        prevSlide(); // Swipe right
    }
};