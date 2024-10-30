function initializeImage() {
    document.querySelectorAll("img").forEach(img => {
        function handleImageLoad() {
            img.classList.add("show");
        }

        // 添加 load 事件监听器
        img.addEventListener("load", handleImageLoad);

        // 如果图片已加载完成，则立即执行
        if (img.complete) {
            handleImageLoad();
        }
    });
}

initializeImage();
