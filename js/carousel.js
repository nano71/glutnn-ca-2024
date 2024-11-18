let carouselIndex = 0
let carousel = document.querySelector('.carousel')
let images = document.querySelectorAll('.carousel > a')
let indicator = document.querySelector(".carousel .indicator")
let carouselTimer
for (let i = 1; i < images.length; i++) {
    indicator.insertAdjacentHTML("beforeend", `<div class="dot" onclick="switchImageByIndex(${i})"></div>`);
}
let dots = document.querySelectorAll(".carousel .indicator .dot")
images[0].classList.add('active');

function clear() {
    dots.forEach((dot, i) => {
        dot.classList.remove('active')
        images[i].classList.remove('active')
    })
}

function switchImage(isNext = false) {
    clear()
    carouselIndex = (carouselIndex + (isNext ? 1 : -1)) % images.length
    images[Math.abs(carouselIndex)].classList.add('active')
    document.querySelectorAll('.carousel .indicator .dot')[Math.abs(carouselIndex)].classList.add('active')
}

function switchImageByIndex(index) {
    clear()
    carouselIndex = index
    images[index].classList.add('active')
    document.querySelectorAll('.carousel .indicator .dot')[Math.abs(carouselIndex)].classList.add('active')
}

carousel.onmouseover = () => {
    clearTimeout(carouselTimer)
}

carousel.onmouseout = autoSwitch

function autoSwitch() {
    carouselTimer = setTimeout(() => {
        switchImage(true)
        autoSwitch()
    }, 4000)
}

autoSwitch()
