window.addEventListener("DOMContentLoaded", onDOMContentLoaded)

function onDOMContentLoaded() {
    initializeImage();
    initializeTabBar();
    animationMap.initialize()
    const welcome = document.querySelector("#welcome")
    if (welcome) {
        welcome.classList.add("loaded")
        setTimeout(() => {
            welcome.classList.add("end")
            animationMap.listener()
        }, 500)
    } else
        animationMap.listener()
}
