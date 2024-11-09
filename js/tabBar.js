function initializeTabBar() {
    for (let elementNodeListOfElement of document.querySelectorAll("header > .tabBar > .container > .link")) {
        elementNodeListOfElement.onmouseover = function () {
            let menus = this.querySelector(".menus");
            if (!menus) return
            menus.style.maxHeight = menus.querySelectorAll("a").length * 64 + "px"
        }
        elementNodeListOfElement.onmouseout = function () {
            let menus = this.querySelector(".menus");
            if (!menus) return
            menus.style.maxHeight = "0"
        }
    }
}
