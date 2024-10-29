function initializeAnimation() {
    const animationBoxList = document.querySelectorAll(".animationBox");

    const observerOptions = {
        root: null, // 使用视口作为根元素
        rootMargin: '0px',
        threshold: [0.3, 0.5] // 一旦元素进入视口就触发
    };


    const lastObservedY = new Map(); // 用于存储上一个元素的 Y 位置
    const observerCallback = (entries) => {
        entries.forEach((entry, index) => {
            const currentY = entry.boundingClientRect.top;

            if (entry.isIntersecting) {
                // 检查是否是第二个相同 Y 位置的元素
                if (lastObservedY.has(currentY) && lastObservedY.get(currentY) === true) {
                    // 延迟 300 毫秒
                    setTimeout(() => {
                        entry.target.classList.add('toUpShow');
                        entry.target.classList.remove('toDownHide');
                    }, 200);
                } else {
                    entry.target.classList.add('toUpShow');
                    entry.target.classList.remove('toDownHide');
                }
                lastObservedY.set(currentY, true);
            } else {
                if (currentY <= 0)
                    return
                // 元素离开视口时添加类
                entry.target.classList.add('toDownHide');
                entry.target.classList.remove('toUpShow');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sensitiveObserver = new IntersectionObserver(observerCallback, {
        ...observerOptions,
        threshold: [0, 0.1]
    });

    animationBoxList.forEach(element => {
        if (element.className.includes("sensitive")) {
            sensitiveObserver.observe(element);
        } else
            observer.observe(element);
    });
}

// 调用初始化函数
initializeAnimation();
