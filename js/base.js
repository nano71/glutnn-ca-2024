window.addEventListener("DOMContentLoaded", () => {
    initializeAnimation();
    setTimeout(() => {
        document.querySelector("#welcome").classList.add("end")
        setTimeout(() => {
            window.dispatchEvent(new Event("scroll"))
        }, 200)
    }, 500)
})
