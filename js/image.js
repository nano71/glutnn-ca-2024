function initializeImage() {
    document.querySelectorAll('img').forEach(img => {
        img.onload = function () {
            console.log(img);
            img.classList.add("show")
        }
    })
}

initializeImage()
