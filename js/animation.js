function initializeAnimation() {
    console.log("initializeAnimation")

    /**
     *
     * @param element {HTMLElement}
     * @return {number}
     */
    function getOffsetTop(element) {
        return Math.floor(element.getBoundingClientRect().top + scrollY)
    }

    function generateUUID() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        )
    }

    /**
     * @type {NodeListOf<HTMLElement>}
     */
    const animationBoxList = document.querySelectorAll(".animationBox");
    const threshold = .2
    const sensitiveThreshold = 0
    /**
     *
     * @type {Object<HTMLElement>}
     */
    const animationBoxMap = {}
    const offsetLeftMap = {}
    const offsetTimeMap = {};
    const offsetTopMap = {};
    const groupedByOffsetTop = {};
    const statusMap = {}
    let initialized = false

    animationBoxList.forEach(element => {
        const uuid = generateUUID();
        animationBoxMap[uuid] = element
        offsetLeftMap[uuid] = element.offsetLeft
        const offsetTop = getOffsetTop(element)
        offsetTopMap[uuid] = offsetTop
        if (!groupedByOffsetTop[offsetTop])
            groupedByOffsetTop[offsetTop] = []
        groupedByOffsetTop[offsetTop].push(uuid)
    });

    for (const topValue in groupedByOffsetTop) {
        if (groupedByOffsetTop[topValue].length === 1) continue;

        const uuids = groupedByOffsetTop[topValue];

        uuids.sort((a, b) => offsetLeftMap[a] - offsetLeftMap[b]);

        uuids.forEach((uuid, index) => {
            offsetTimeMap[uuid] = index * 100;
        });
    }

    function listener() {
        const baselineOffsetTop = Math.floor(innerHeight + scrollY)
        for (let uuid in animationBoxMap) {
            const animationBox = animationBoxMap[uuid]
            const isSensitive = animationBox.className.includes("sensitive")
            // 负值: 还未到视口里 ; 正值: 出现在视口里了
            const distance = baselineOffsetTop - offsetTopMap[uuid]
            const finalThreshold = (isSensitive || !initialized || (offsetTopMap[uuid] < innerHeight)) ? sensitiveThreshold : threshold
            let canShow = distance > finalThreshold * innerHeight

            if (canShow) {
                if (statusMap[uuid] === 1) continue
                statusMap[uuid] = 1
                setTimeout(() => {
                    animationBox.classList.add('toUpShow')
                    animationBox.classList.remove('toDownHide')
                }, offsetTimeMap[uuid] || 0)
            } else {
                if (statusMap[uuid] === 0) continue
                statusMap[uuid] = 0
                animationBox.classList.add('toDownHide')
                animationBox.classList.remove('toUpShow')
            }
        }
        initialized = true
    }

    window.addEventListener("scroll", listener)
    listener()
}

initializeAnimation();
