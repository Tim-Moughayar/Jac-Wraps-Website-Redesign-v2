const track = document.querySelector('.hero__track');
const textTrack = document.querySelector('.hero__dynamic-text-track');
const trackContainer = document.querySelector('.hero__track-container');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.hero__arrow--right');
const prevButton = document.querySelector('.hero__arrow--left');
const dotsNav = document.querySelector('.hero__dot-indicator-container');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;
trackContainer.style.maxWidth = slideWidth + 'px';

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => { 
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    
    if (targetSlide.style.left === "0px") {
        console.log('above 0', targetSlide.style.left);
        textTrack.style.transform = 'translateY(-' + '0px' + ')';
    } else {
        console.log('below 0', targetSlide.style.left);
        textTrack.style.transform = 'translateY(-' + '50px' + ')';
    }
    
    console.log('targetSlide.style.left', targetSlide.style.left);
    console.log('slideWidth', slideWidth);
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide')
    const preSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;

    moveToSlide(track, currentSlide, preSlide);
    updateDots(currentDot, prevDot);
})

nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
}) 

// when I click nav indicator, move to that slide

dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('.hero__dot-indicator');

    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
});