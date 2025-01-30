const track = document.querySelector('.hero-track');
const trackContainer = document.querySelector('.hero-track-container');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.hero__arrow--right');
const prevButton = document.querySelector('.hero__arrow--left');
const dotsNav = document.querySelector('.slide_nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;
console.log('slides', slides);
console.log('slideWidth', slideWidth);


const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition);

console.log();
console.log(track);

const moveToSlide = (track, currentSlide, targetSlide) => { 
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    console.log('targetSlide.style.left', targetSlide.style.left);
    console.log('slideWidth', slideWidth);
    trackContainer.style.maxWidth = slideWidth + 'px';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

// when I click left, move slides to the left
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide')
    const preSlide = currentSlide.previousElementSibling;

    moveToSlide(track, currentSlide, preSlide);
})

// when I click right, move slides to the right
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;    

    moveToSlide(track, currentSlide, nextSlide);
}) 

// when I click nav indicator, move to that slide