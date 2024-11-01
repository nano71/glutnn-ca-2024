window.addEventListener("DOMContentLoaded", () => {
    const welcome = document.querySelector("#welcome")
    if (welcome) {
        setTimeout(() => {
            welcome.classList.add("end")
            setTimeout(() => {
                animationMap.listener()
            }, 200)
        }, 500)
    } else
        animationMap.listener()
})
