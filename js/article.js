let date = document.querySelector(".articleContent .infoBar .datetime").innerText.split(": ").at(-1)

const targetDate = new Date('2024-09-30T23:59:59');

if (new Date(date) <= targetDate) {
    const imgElements = document.querySelectorAll('.vsbcontent_img');
    imgElements.forEach((imgElement) => {
        const nextElement = imgElement.nextElementSibling;
        if (nextElement && !nextElement.className && nextElement.tagName.toLowerCase() === 'p') {
            nextElement.style.textAlign = "center"
        }
    });
    const endText = document.querySelector(".vsbcontent_end")
    if (endText.innerText.includes("一审")) {
        endText.style.textAlign = "center"
    }
}

