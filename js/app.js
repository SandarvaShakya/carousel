// The container of images
const carousel = document.querySelector('#carousel');
// The array of the images
const images = document.querySelectorAll('.img-wrapper');
// The controller for the carousel
const dots = document.querySelectorAll('.dot');
// The last image that is the repeated first image in carousel
const lastImage = document.querySelector('#first-image');

// The counter that tracks which image the image is in 
let counter = 1;
// The time interval in which the image changes
let interval = 2000;

// The width of the image in the screen
let imageWidth = images[counter].clientWidth

// Shifting the repeated last image to the left
images[0].style.marginLeft = `-${imageWidth * counter}px`;

// For responsiveness
window.addEventListener('resize', () => {
    imageWidth = images[counter].clientWidth
    images[0].style.marginLeft = `-${imageWidth * counter}px`;
})

let timeOutId
// Click event for each dot
dots.forEach((dot, index) => dot.addEventListener('click', () => {
    clearInterval(intervalId)
    clearTimeout(timeOutId)
    removeActiveClass()
    counter = index + 1;
    dot.classList.add('dot--active')
    moveImage()
    dotIsClicked = true
    timeOutId = setTimeout(startAnimation, interval)
}))

// check after if transition if the image has reached last
images[0].addEventListener('transitionend', () => {
    if(images[counter] === lastImage){
        images[0].classList.remove('transition');
        counter = 1;
        images[0].style.marginLeft = `-${imageWidth * counter}px`;
    }
})

let intervalId;
// The animation to make the carousel move after ceratin interval of time
const startAnimation = () => {
    intervalId = setInterval(() => {
        removeActiveClass()
        // if the counter has reached the last image stop interval
        if(images[counter] === lastImage) return;

        counter++;
        moveImage()
        
        // make the first dot active if it has reached last iamge
        if(counter === images.length - 1){
            dots[0].classList.add('dot--active');
        }else{
            dots[counter - 1].classList.add('dot--active');
        }
        
    }, interval)
}

// function to remove the active class from dot
const removeActiveClass = () => {
    dots.forEach(dot => {
        if(dot.classList.contains('dot--active')){
            dot.classList.remove('dot--active');
        }
    })
}

// function to move the image by its width to the left
const moveImage = () => {
    images[0].classList.add('transition');
    images[0].style.marginLeft = `-${imageWidth * counter}px`;
}

startAnimation()