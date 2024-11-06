if (sessionStorage.getItem("initialized")) {
    document.querySelector("#welcome").remove()
} else {
    sessionStorage.setItem("initialized", "true");
}
