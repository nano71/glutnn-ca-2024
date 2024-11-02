/**
 *
 * @param element {HTMLElement}
 * @return {number}
 */
function getOffsetTop(element) {
    return Math.floor(element.getBoundingClientRect().top + scrollY)
}

function generateUUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
}

const animationMap = {
    /**
     * @type {NodeListOf<HTMLElement>}
     */
    animationBoxList: document.querySelectorAll(".animationBox"),
    threshold: .2,
    sensitiveThreshold: 0,
    /**
     *
     * @type {Object<HTMLElement>}
     */
    animationBoxMap: {},
    offsetLeftMap: {},
    offsetTimeMap: {},
    offsetTopMap: {},
    statusMap: {},
    initialized: false,
    firstRun: false,
    initialize() {
        const groupedByOffsetTop = {}
        this.animationBoxList.forEach(element => {
            const uuid = generateUUID()
            this.animationBoxMap[uuid] = element
            this.offsetLeftMap[uuid] = element.offsetLeft
            const offsetTop = getOffsetTop(element)
            this.offsetTopMap[uuid] = offsetTop
            if (!groupedByOffsetTop[offsetTop]) groupedByOffsetTop[offsetTop] = []
            groupedByOffsetTop[offsetTop].push(uuid)
        })

        for (const topValue in groupedByOffsetTop) {
            if (groupedByOffsetTop[topValue].length === 1) continue
            const uuids = groupedByOffsetTop[topValue]
            uuids.sort((a, b) => this.offsetLeftMap[a] - this.offsetLeftMap[b])
            uuids.forEach((uuid, index) => {
                this.offsetTimeMap[uuid] = index * 100
            })
        }

        window.addEventListener("scroll", this.listener)
        this.initialized = true
    },
    listener() {
        const baselineOffsetTop = Math.floor(innerHeight + scrollY)
        for (let uuid in animationMap.animationBoxMap) {
            const animationBox = animationMap.animationBoxMap[uuid]
            const isSensitive = animationBox.className.includes("sensitive")
            // 负值: 还未到视口里  正值: 出现在视口里了
            const distance = baselineOffsetTop - animationMap.offsetTopMap[uuid]
            const finalThreshold = isSensitive ? animationMap.sensitiveThreshold : animationMap.threshold
            let canShow = distance > finalThreshold * innerHeight
            if (!animationMap.firstRun) {
                canShow = distance > 0
            }
            if (canShow) {
                if (animationMap.statusMap[uuid] === 1) continue
                animationMap.statusMap[uuid] = 1
                setTimeout(() => {
                    animationBox.classList.add('toUpShow')
                    animationBox.classList.remove('toDownHide')
                }, animationMap.offsetTimeMap[uuid] || 0)
            } else {
                if (animationMap.statusMap[uuid] === 0) continue
                animationMap.statusMap[uuid] = 0
                animationBox.classList.add('toDownHide')
                animationBox.classList.remove('toUpShow')
            }
        }
        if (!animationMap.firstRun) animationMap.firstRun = true
    }
}
