window.addEventListener("DOMContentLoaded", () => {
    initializeAnimation();
    const welcome = document.querySelector("#welcome")
    if (welcome) {
        welcome.classList.add("loaded")
        setTimeout(() => {
            welcome.classList.add("end")
            setTimeout(() => {
                window.dispatchEvent(new Event("scroll"))
            }, 200)
        }, 500)
    } else {
        window.dispatchEvent(new Event("scroll"))
    }
})
